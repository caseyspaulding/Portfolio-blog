import { NextResponse } from 'next/server';
import { db } from '@/db';

import { eq } from 'drizzle-orm';
import { authors, blogPosts } from '@/db/schemas/schema';

export async function POST ( request: Request )
{
    const {
        title,
        content,
        excerpt,
        authorId,
        tags,
        slug,
        metaTitle,
        metaDescription,
        isPublished,
        featuredImage,
    } = await request.json();

    // Validate required fields
    if ( !title || !content || !authorId )
    {
        return NextResponse.json( { error: 'Missing required fields' }, { status: 400 } );
    }

    // Convert tags to an array if it's a string
    const tagsArray = Array.isArray( tags ) ? tags : tags.split( ',' ).map( ( tag: string ) => tag.trim() );

    // Insert the new post
    const [ post ] = await db
        .insert( blogPosts )
        .values( {
            title,
            content,
            excerpt,
            authorId, // Adjust if your schema uses 'author_id'
            tags: tagsArray,
            slug,
            metaTitle,
            metaDescription,
            isPublished,
            featuredImage,
        } )
        .returning();

    return NextResponse.json( post );
}

export async function GET ()
{
    const posts = await db
        .select( {
            id: blogPosts.id,
            title: blogPosts.title,
            content: blogPosts.content,
            excerpt: blogPosts.excerpt,
            tags: blogPosts.tags,
            slug: blogPosts.slug,
            metaTitle: blogPosts.metaTitle,
            metaDescription: blogPosts.metaDescription,
            isPublished: blogPosts.isPublished,
            featuredImage: blogPosts.featuredImage,
            createdAt: blogPosts.createdAt,
            updatedAt: blogPosts.updatedAt,
            author: {
                id: authors.id,
                name: authors.name,
                slug: authors.slug,
                avatarUrl: authors.avatarUrl,
            },
        } )
        .from( blogPosts )
        .leftJoin( authors, eq( blogPosts.authorId, authors.id ) )
        .orderBy( blogPosts.createdAt );

    return NextResponse.json( posts );
}
