// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { blogPosts, authors } from '@/db/schemas/schema';
import { eq, and, sql } from 'drizzle-orm';
import { CATEGORIES, DIFFICULTY_LEVELS } from '@/db/schemas/schema';

export async function GET ( request: Request )
{
  const { searchParams } = new URL( request.url );
  const category = searchParams.get( 'category' );
  const difficulty = searchParams.get( 'difficulty' );

  try
  {
    // Start with base query
    let baseQuery = db
      .select( {
        post: {
          id: blogPosts.id,
          slug: blogPosts.slug,
          title: blogPosts.title,
          excerpt: blogPosts.excerpt,
          featuredImage: blogPosts.featuredImage,
          difficultyLevel: blogPosts.difficultyLevel,
          categories: blogPosts.categories,
          createdAt: blogPosts.createdAt,
          isPublished: blogPosts.isPublished,
        },
        author: {
          name: authors.name,
          slug: authors.slug,
          avatarUrl: authors.avatarUrl,
        },
      } )
      .from( blogPosts )
      .leftJoin( authors, eq( blogPosts.authorId, authors.id ) );

    // Build conditions array
    const conditions = [ eq( blogPosts.isPublished, true ) ];

    // Add category filter if specified
    if ( category && category !== 'all' && CATEGORIES.includes( category as any ) )
    {
      conditions.push(
        sql`${ blogPosts.categories }::jsonb ? ${ category }`
      );
    }

    // Add difficulty filter if specified
    if ( difficulty && difficulty !== 'all' && DIFFICULTY_LEVELS.includes( difficulty as any ) )
    {
      conditions.push(
        eq( blogPosts.difficultyLevel, difficulty as typeof DIFFICULTY_LEVELS[ number ] )
      );
    }

    // Apply all conditions
    const results = await baseQuery.where( and( ...conditions ) );

    const posts = results.map( result => ( {
      ...result.post,
      author: result.author,
    } ) );

    return NextResponse.json( posts );
  } catch ( error )
  {
    console.error( 'Error fetching posts:', error );
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}