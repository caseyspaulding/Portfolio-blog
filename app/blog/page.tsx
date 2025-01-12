'use client';

import PageBackground from '@/components/PageBackGround';
import { BlogCard, BlogPost } from '@/components/BlogCard';
import { useEffect, useState, useTransition } from 'react';
import { getFilteredBlogPosts } from '@/app/actions/blogActions';
import type {Category, DifficultyLevel } from '@/db/schemas/schema';
import
    {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
    } from "@/components/ui/select";

import { CATEGORIES, DIFFICULTY_LEVELS } from '@/db/schemas/schema';

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
    const [ selectedCategory, setSelectedCategory ] = useState<Category | 'all'>( 'all' );
    const [ selectedDifficulty, setSelectedDifficulty ] = useState<DifficultyLevel | 'all'>( 'all' );
    const [ posts, setPosts ] = useState<BlogPost[]>( [] );
    const [ isPending, startTransition ] = useTransition();

    // Function to fetch filtered posts
    const fetchFilteredPosts = async (
        category: Category | 'all',
        difficulty: DifficultyLevel | 'all'
    ) =>
    {
        try
        {
           
            const response = await getFilteredBlogPosts( {
                category,
                difficultyLevel: difficulty
            } );
           

            if ( response.success )
            {
                setPosts( (response.data as any[]).map(post => ({
                    ...post,
                    author: post.author || null
                })) as BlogPost[]);
            } else
            {
                console.error( 'Client - Failed to fetch filtered posts:', response.error );
            }
        } catch ( error )
        {
            console.error( 'Client - Error fetching filtered posts:', error );
        }
    };

    // Initial fetch
    useEffect( () =>
    {
        fetchFilteredPosts( 'all', 'all' );
    }, [] );

    // Handle category change
    const handleCategoryChange = ( value: string ) =>
    {
        const category = value as Category | 'all';
        setSelectedCategory( category );
        startTransition( () =>
        {
            fetchFilteredPosts( category, selectedDifficulty );
        } );
    };

    // Handle difficulty change
    const handleDifficultyChange = ( value: string ) =>
    {
        const difficulty = value as DifficultyLevel | 'all';
        setSelectedDifficulty( difficulty );
        startTransition( () =>
        {
            fetchFilteredPosts( selectedCategory, difficulty );
        } );
    };

    return (
       
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-14 lg:py-12">
                <header className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                        Technical Articles & System Design
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                        Deep dive into software architecture, system design patterns, and engineering best practices.
                        Featuring interactive diagrams and practical examples.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-900 dark:text-gray-200">
                        <span className="flex items-center">📊 Interactive Diagrams</span>
                        <span className="flex items-center">🏗️ System Design</span>
                        <span className="flex items-center">📐 Architecture Patterns</span>
                        <span className="flex items-center">💡 Best Practices</span>
                    </div>
                </header>

                {/* Filters */ }
                <div className="mb-12 space-y-6">
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Select
                            value={ selectedCategory }
                            onValueChange={ handleCategoryChange }
                        >
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                { CATEGORIES.map( ( category ) => (
                                    <SelectItem key={ category } value={ category }>
                                        { category }
                                    </SelectItem>
                                ) ) }
                            </SelectContent>
                        </Select>

                        <Select
                            value={ selectedDifficulty }
                            onValueChange={ handleDifficultyChange }
                        >
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Levels</SelectItem>
                                { DIFFICULTY_LEVELS.map( ( level ) => (
                                    <SelectItem key={ level } value={ level }>
                                        { level }
                                    </SelectItem>
                                ) ) }
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Blog Grid */ }
                <div className="min-h-[500px]">
                    { isPending ? (
                        <BlogSkeleton />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            { posts.map( ( post ) => (
                                <BlogCard
                                    key={ post.id }
                                    post={ { ...post, author: post.author || null } }
                                />
                            ) ) }
                        </div>
                    ) }

                    { !isPending && posts.length === 0 && (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Try adjusting your filters or check back later for new content.
                            </p>
                        </div>
                    ) }
                </div>
            </main>
    
    );
}