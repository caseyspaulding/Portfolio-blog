'use client';

import { BlogCard, BlogPost } from '@/components/BlogCard';
import { useEffect, useState } from 'react';
import { getAllBlogPosts } from '../actions/blogActions';

function BlogSkeleton ()
{
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                { [ ...Array( 6 ) ].map( ( _, i ) => (
                    <div key={ i } className="animate-pulse space-y-4">
                        <div className="h-56 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
                            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
                            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
                        </div>
                    </div>
                ) ) }
            </div>
        </div>
    );
}

export default function BlogList ()
{
    const [ posts, setPosts ] = useState<BlogPost[]>( [] );
    const [ isLoading, setIsLoading ] = useState( true );
    const [ error, setError ] = useState<string | null>( null );

    useEffect( () =>
    {
        const fetchPosts = async () =>
        {
            try
            {
                const result = await getAllBlogPosts();

                if ( result.success )
                {
                    // Transform the data and sort in ascending order, then reverse for descending
                    const transformedPosts = result.data
                        .map( ( post ) => ( {
                            ...post,
                            author: null, // or provide a default author object if needed
                        } ) )
                        .sort( ( a, b ) => new Date( a.publishedAt ?? 0 ).getTime() - new Date( b.publishedAt ?? 0 ).getTime() ) // Sort ascending
                        .reverse(); // Reverse to descending

                    setPosts( transformedPosts );
                } else
                {
                    setError( 'Failed to fetch blog posts' );
                }
            } catch ( err )
            {
                setError( 'An error occurred while fetching posts' );
                console.error( 'Error fetching posts:', err );
            } finally
            {
                setIsLoading( false );
            }
        };

        fetchPosts();
    }, [] );

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-14 lg:py-12">
            <header className=" mx-auto text-center mb-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-lg p-6">
                <h1 className="text-4xl font-bold mb-6 text-white">
                    Insights in Tech & System Design
                </h1>
                <p className="text-lg  text-blue-100 mb-8">
                    Explore lessons learned from hands-on experience. <br/>Discover insights into software architecture, design patterns, and engineering best practices.
                </p>
                <div className="flex flex-wrap justify-center gap-3 text-md text-white">
                    <span className="flex items-center">📊 Diagrams</span>
                    <span className="flex items-center">🏗️ System Design</span>
                    <span className="flex items-center">📐 Architectural Patterns</span>
                    <span className="flex items-center">💡 Practical Best Practices</span>
                </div>
            </header>

            {/* Blog Grid */ }
            <div className="min-h-[500px]">
                { isLoading ? (
                    <BlogSkeleton />
                ) : error ? (
                    <div className="text-center py-12">
                        <h3 className="text-xl font-semibold mb-2 text-red-600 dark:text-red-400">Error Loading Posts</h3>
                        <p className="text-gray-600 dark:text-gray-400">{ error }</p>
                    </div>
                ) : posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        { posts.map( ( post ) => (
                            <BlogCard key={ post.id } post={ post } />
                        ) ) }
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Check back later for new content.
                        </p>
                    </div>
                ) }
            </div>
        </main>
    );
}