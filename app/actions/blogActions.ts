// app/actions/blogActions.ts
'use server';

import { BlogPost } from '@/components/BlogCard';
import { db } from '@/db';
import { authors, BlogDiagram, blogPosts, Category, DifficultyLevel } from '@/db/schemas/schema';
import { eq, sql, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export type BlogPostWithAuthor = BlogPost & {
    author: {
        id: number;
        name: string;
        slug: string;
        bio: string | null;
        avatarUrl: string | null;
    } | null;
    diagrams: BlogDiagram[];
};

interface Author
{
    id: number;
    name: string;
    slug: string;
    bio?: string | null;
    avatarUrl?: string | null;
}




type FilterParams = {
    category?: Category | 'all';
    difficultyLevel?: DifficultyLevel | 'all';
};



export async function getAuthorBySlug ( slug: string ): Promise<Author | null>
{
    try
    {
        const [ author ] = await db
            .select( {
                id: authors.id,
                name: authors.name,
                slug: authors.slug,
                bio: authors.bio,
                avatarUrl: authors.avatarUrl,
            } )
            .from( authors )
            .where( eq( authors.slug, slug ) );

        return author || null;
    } catch ( error )
    {
        console.error( 'Error fetching author by slug:', error );
        return null;
    }
}

export async function getBlogPostBySlug ( slug: string ): Promise<BlogPostWithAuthor | null>
{
    try
    {
        const decodedSlug = decodeURIComponent( slug ).replace( /%20/g, '-' );

        const [ result ] = await db
            .select( {
                post: {
                    id: blogPosts.id,
                    slug: blogPosts.slug,
                    title: blogPosts.title,
                    content: blogPosts.content,
                    excerpt: blogPosts.excerpt,
                    authorId: blogPosts.authorId,
                    createdAt: blogPosts.createdAt,
                    updatedAt: blogPosts.updatedAt,
                    publishedAt: blogPosts.publishedAt,
                    tags: blogPosts.tags,

                    readingTime: blogPosts.readingTime,
                    difficultyLevel: blogPosts.difficultyLevel,
                    metaTitle: blogPosts.metaTitle,
                    metaDescription: blogPosts.metaDescription,
                    featuredImage: blogPosts.featuredImage,
                    isPublished: blogPosts.isPublished,
                    diagrams: blogPosts.diagrams,
                },
                author: {
                    id: authors.id,
                    name: authors.name,
                    slug: authors.slug,
                    bio: authors.bio,
                    avatarUrl: authors.avatarUrl,
                },
            } )
            .from( blogPosts )
            .leftJoin( authors, eq( blogPosts.authorId, authors.id ) )
            .where( eq( blogPosts.slug, decodedSlug ) );

        if ( !result )
        {
            return null;
        }

        const parsedDiagrams = Array.isArray( result.post.diagrams )
            ? result.post.diagrams
            : [];

        const post: BlogPostWithAuthor = {
            ...result.post,
            diagrams: parsedDiagrams,
            author: result.author, // Allow `null` to propagate
        };

        return post;
    } catch ( error )
    {
        console.error( 'Error fetching blog post:', error );
        return null;
    }
}

export async function getAllBlogPosts ()
{
    try
    {
        const results = await db
            .select( {
                post: {
                    id: blogPosts.id,
                    slug: blogPosts.slug,
                    title: blogPosts.title,
                    excerpt: blogPosts.excerpt,
                    content: blogPosts.content,
                    diagrams: blogPosts.diagrams,
                    readingTime: blogPosts.readingTime,
                    difficultyLevel: blogPosts.difficultyLevel,
                    createdAt: blogPosts.createdAt,
                    updatedAt: blogPosts.updatedAt,
                    publishedAt: blogPosts.publishedAt,
                    tags: blogPosts.tags,
                    featuredImage: blogPosts.featuredImage,
                    metaTitle: blogPosts.metaTitle,
                    metaDescription: blogPosts.metaDescription,
                    isPublished: blogPosts.isPublished,
                },
            } )
            .from( blogPosts )
            .where( eq( blogPosts.isPublished, true ) ) // Only get published posts
            .orderBy( desc( blogPosts.publishedAt ) ); // Correctly use desc for sorting

        // Transform the results to match the BlogPost type
        const posts = results.map( ( result ) => ( {
            ...result.post,
            // Ensure diagrams is always an array
            diagrams: Array.isArray( result.post.diagrams )
                ? result.post.diagrams
                : [],
        } ) );

        return {
            success: true,
            data: posts,
        };
    } catch ( error )
    {
        console.error( 'Error fetching blog posts:', error );
        return {
            success: false,
            data: [],
        };
    }
}

export async function createBlogPost ( formData: FormData )
{
    const title = formData.get( 'title' ) as string;
    const content = formData.get( 'content' ) as string;
    const excerpt = ( formData.get( 'excerpt' ) as string ) || '';
    const authorId = 1;
    const tags = ( formData.get( 'tags' ) as string )?.split( ',' ).map( tag => tag.trim() ).join( ',' ) || '';
    let slug = formData.get( 'slug' ) as string;
    const featuredImage = formData.get( 'featuredImage' ) as string;
    const metaTitle = formData.get( 'metaTitle' ) as string;
    const metaDescription = formData.get( 'metaDescription' ) as string;
    const isPublished = formData.get( 'isPublished' ) === 'true';
    const diagrams = JSON.parse( formData.get( 'diagrams' ) as string || '[]' );
    const readingTime = parseInt( formData.get( 'readingTime' ) as string, 10 ) || null;
    const difficultyLevel = formData.get( 'difficultyLevel' ) as DifficultyLevel || null;
    const categories = JSON.parse( formData.get( 'categories' ) as string || '[]' );
    const technologies = JSON.parse( formData.get( 'technologies' ) as string || '[]' );
    const publishedAt = isPublished ? new Date() : null;    // Set publishedAt if post is published

    if ( !slug )
    {
        slug = generateSlug( title );
    }

    try
    {
        // Check for slug conflict
        const existingPosts = await db.select().from( blogPosts ).where( eq( blogPosts.slug, slug ) );
        if ( existingPosts.length > 0 )
        {
            return { success: false, message: 'A post with this slug already exists.' };
        }


        // Insert new blog post
        await db.insert( blogPosts ).values( {
            title,
            content,
            excerpt,
            authorId,
            tags,
            diagrams,
            slug,
            featuredImage,
            metaTitle,
            metaDescription,
            isPublished,
            readingTime,
            difficultyLevel,
            publishedAt,
            categories,
            technologies,
            createdAt: new Date(),
            updatedAt: new Date(),
        } );

        revalidatePath( '/blog' );
        return { success: true, message: 'Post created successfully!' };
    } catch ( error )
    {
        console.error( 'Error inserting blog post:', error );
        return { success: false, message: 'Failed to create blog post. Please try again.' };
    }
}

export async function getAllBlogSlugs ()
{
    const slugs = await db
        .select( { slug: blogPosts.slug } )
        .from( blogPosts )
        .then( ( rows ) => rows.map( ( row ) => row.slug ) );
    return slugs;
}


// Helper function to generate a slug from a title
function generateSlug ( title: string ): string
{
    return title
        .toLowerCase()
        .trim()
        .replace( /[^\w\s-]/g, '' ) // Remove invalid characters
        .replace( /\s+/g, '-' ) // Replace spaces with hyphens
        .replace( /--+/g, '-' ) // Replace multiple hyphens with a single hyphen
        .substring( 0, 255 ); // Limit slug length to 255 characters
}

export async function updateBlogPost ( id: number, formData: FormData )
{
    const title = formData.get( 'title' ) as string;
    const content = formData.get( 'content' ) as string;
    const excerpt = ( formData.get( 'excerpt' ) as string ) || '';
    const tags = formData.get( 'tags' ) as string || '';  // Don't split here, it's already in the correct format
    let slug = formData.get( 'slug' ) as string;
    const featuredImage = formData.get( 'featuredImage' ) as string;
    const metaTitle = formData.get( 'metaTitle' ) as string;
    const metaDescription = formData.get( 'metaDescription' ) as string;
    const isPublished = formData.get( 'isPublished' ) === 'true';

    if ( !slug )
    {
        slug = generateSlug( title );
    }

    try
    {
        await db
            .update( blogPosts )
            .set( {
                title,
                content,
                excerpt,
                authorId: 1,
                tags,  // Use tags directly
                slug,
                featuredImage,  // This will now preserve the existing image URL if no new image was uploaded
                metaTitle,
                metaDescription,
                isPublished,
                updatedAt: new Date(),
            } )
            .where( eq( blogPosts.id, id ) );

        return { success: true, message: 'Blog post updated successfully' };
    } catch ( error )
    {
        console.log( 'Error updating blog post:', error );
        return { success: false, message: 'Failed to update the blog post. Please try again.' };
    }
}


export async function deletePost ( postId: number )
{
    try
    {
        await db.delete( blogPosts ).where( eq( blogPosts.id, postId ) );
        return { success: true };
    } catch ( error )
    {
        console.error( 'Error deleting post:', error );
        return { success: false, error };
    }
}


interface FilterOptions
{
    category: string | 'all';
    difficultyLevel: string | 'all';
}

export async function getFilteredBlogPosts ( filters: FilterOptions )
{
    const { category, difficultyLevel } = filters;

    try
    {
        // Build the query dynamically
        const query = db
            .select()
            .from( blogPosts )
            .where( ( conditions ) =>
            {
                const filters = [];

                // Filter by category if not 'all'
                if ( category !== 'all' )
                {
                    filters.push(
                        sql`JSONB_CONTAINS(${ blogPosts.categories }, ${ JSON.stringify( [ category ] ) })`
                    );
                }

                // Filter by difficulty if not 'all'
                if ( difficultyLevel !== 'all' )
                {
                    filters.push( sql`${ blogPosts.difficultyLevel } = ${ difficultyLevel }` );
                }

                // Combine filters with AND
                return filters.length > 0 ? sql`${ sql.join( filters, ' AND ' ) }` : undefined;
            } )
            .orderBy( sql`${ blogPosts.createdAt } DESC` ); // Order by latest posts

        const results = await query.execute();

        return {
            success: true,
            data: results,
        };
    } catch ( error )
    {
        console.error( 'Server - Error fetching filtered posts:', error );
        return {
            success: false,
            error: ( error as Error ).message,
        };
    }
}