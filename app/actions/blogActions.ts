// app/actions/blogActions.ts
'use server';

import { db } from '@/db';
import { authors, blogPosts } from '@/db/schemas/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

interface Author
{
    id: number;
    name: string;
    slug: string;
    bio?: string | null;
    avatarUrl?: string | null;
}

interface BlogPost
{
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt?: string | null;
    authorId: number;
    tags?: string | null;
    featuredImage?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    isPublished: boolean | null;
    createdAt: Date;
    updatedAt: Date;
}
export async function getPostsByAuthorId ( authorId: number ): Promise<BlogPost[]>
{
    try
    {
        const posts = await db
            .select( {
                id: blogPosts.id,
                title: blogPosts.title,
                slug: blogPosts.slug,
                content: blogPosts.content,
                excerpt: blogPosts.excerpt,
                authorId: blogPosts.authorId,
                tags: blogPosts.tags,
                featuredImage: blogPosts.featuredImage,
                metaTitle: blogPosts.metaTitle,
                metaDescription: blogPosts.metaDescription,
                isPublished: blogPosts.isPublished,
                createdAt: blogPosts.createdAt,
                updatedAt: blogPosts.updatedAt,
            } )
            .from( blogPosts )
            .where( eq( blogPosts.authorId, authorId ) );

        // Map database fields to interface fields if necessary
        const formattedPosts = posts.map( ( post ) => ( {
            ...post,
            metaTitle: post.metaTitle,
            metaDescription: post.metaDescription,
            featuredImage: post.featuredImage,
            // Ensure any transformations if needed
        } ) );

        return formattedPosts;

    } catch ( error )
    {
        console.error( 'Error fetching posts by author ID:', error );
        return [];
    }
}

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

export async function getBlogPostBySlug ( slug: string )
{
    try
    {
        // Decode the slug and replace %20 with hyphens
        const decodedSlug = decodeURIComponent( slug ).replace( /%20/g, '-' );
        console.log( 'Fetching blog post with processed slug:', decodedSlug );

        const [ result ] = await db
            .select( {
                post: {
                    id: blogPosts.id,
                    title: blogPosts.title,
                    content: blogPosts.content,
                    excerpt: blogPosts.excerpt,
                    createdAt: blogPosts.createdAt,
                    updatedAt: blogPosts.updatedAt,
                    tags: blogPosts.tags,
                    metaTitle: blogPosts.metaTitle,
                    metaDescription: blogPosts.metaDescription,
                    featuredImage: blogPosts.featuredImage,
                    isPublished: blogPosts.isPublished,
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
            console.log( 'Post not found' );
            return null;
        }

        const post = {
            ...result.post,
            author: result.author,
        };

        console.log( 'Fetched post:', post );
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
                    createdAt: blogPosts.createdAt,
                    updatedAt: blogPosts.updatedAt,
                    featuredImage: blogPosts.featuredImage,
                    isPublished: blogPosts.isPublished,
                },
                author: {
                    id: authors.id,
                    name: authors.name,
                    slug: authors.slug,
                },
            } )
            .from( blogPosts )
            .leftJoin( authors, eq( blogPosts.authorId, authors.id ) );

        const posts = results.map( ( result ) => ( {
            ...result.post,
            author: result.author,
        } ) );

        return { success: true, data: posts };
    } catch ( error )
    {
        console.error( 'Error fetching blog posts:', error );
        return { success: false, data: [] };
    }
}

export async function createBlogPost ( formData: FormData )
{
    const title = formData.get( 'title' ) as string;
    const content = formData.get( 'content' ) as string;
    const excerpt = ( formData.get( 'excerpt' ) as string ) || '';
    const authorId = 1; // Assuming 1 is your hardcoded author ID
    const tags = ( formData.get( 'tags' ) as string )?.split( ',' ).map( tag => tag.trim() ).join( ',' ) || '';
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
        // Check if the post with the same slug already exists
        const existingPosts = await db.select().from( blogPosts ).where( eq( blogPosts.slug, slug ) );
        if ( existingPosts.length > 0 )
        {
            return { success: false, message: 'A post with this slug already exists.' };
        }

        // Insert the new blog post into the database
        await db.insert( blogPosts ).values( {
            title,
            content,
            excerpt,
            authorId, // Use authorId directly without needing a lookup
            tags,
            slug,
            featuredImage,
            metaTitle,
            metaDescription,
            isPublished,
            createdAt: new Date(),
            updatedAt: new Date(),
        } );

        // Revalidate the blog path to update the page
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
    const tags = ( formData.get( 'tags' ) as string )?.split( ',' ).map( tag => tag.trim() ).join( ',' ) || '';
    let slug = formData.get( 'slug' ) as string;
    const featuredImage = formData.get( 'featuredImage' ) as string;
    const metaTitle = formData.get( 'metaTitle' ) as string;
    const metaDescription = formData.get( 'metaDescription' ) as string;
    const isPublished = formData.get( 'isPublished' ) === 'true';

    if ( !slug )
    {
        slug = generateSlug( title );
    }

    console.log( tags );

    try
    {
        // Update the blog post directly with hardcoded authorId
        await db
            .update( blogPosts )
            .set( {
                title,
                content,
                excerpt,
                authorId: 1, // Hardcoded author ID
                tags,
                slug,
                featuredImage,
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