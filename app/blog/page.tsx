import React from 'react';
import Link from 'next/link';
import { db } from '@/db';

import { desc, eq } from 'drizzle-orm';
import NavBar1 from '@/components/NavBarTW/NavBar1';
import FooterFull from '@/components/Footers/FooterFull';
import HeaderCentered from '@/components/HeaderCentered';
import type { Metadata } from 'next';
import { authors, blogPosts } from '@/db/schemas/schema';

export const metadata: Metadata = {
    title: 'Blog - EventJacket',
    description:
        'Read the latest articles from our blog for tips to grow and organize stellar events with EventJacket.',
};

export default async function BlogList ()
{
    const posts = await db
        .select( {
            id: blogPosts.id,
            title: blogPosts.title,
            slug: blogPosts.slug,
            excerpt: blogPosts.excerpt,
            featuredImage: blogPosts.featuredImage,
            createdAt: blogPosts.createdAt,
            author: {
                name: authors.name,
                slug: authors.slug,
            },
        } )
        .from( blogPosts )
        .leftJoin( authors, eq( blogPosts.authorId, authors.id ) )
        .orderBy( desc( blogPosts.createdAt ) )
        .limit( 9 );

    return (
        <>
            <NavBar1 />
            
            {/* Add more introductory text here to improve text/HTML ratio */ }
            <section className=" py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Welcome to the EventJacket Blog
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Our blog is your go-to resource for the latest tips, tricks, and best practices for organizing successful events.
                        Whether you're a nonprofit looking to streamline your event management or a festival organizer seeking new ways to engage your audience,
                        our articles cover a wide range of topics to help you succeed. Explore our posts below and start organizing stellar events today!
                    </p>
                </div>
            </section>

            <main className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        { posts.map( ( post ) => (
                            <article
                                key={ post.id }
                                className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
                            >
                                <Link href={ `/blog/${ post.slug }` } className="block">
                                    <div className="relative h-48">
                                        <img
                                            alt={ post.title }
                                            src={ post.featuredImage || '/images/blog/image-1.jpg' }
                                            className="w-full h-full object-cover rounded-t-lg"
                                        />
                                    </div>
                                </Link>
                                <div className="p-6 flex-grow">
                                    <div className="flex items-center gap-x-4 text-xs text-gray-500 mb-2">
                                        <time dateTime={ post.createdAt.toISOString() } className="text-0.875rem">
                                            { new Date( post.createdAt ).toLocaleDateString() }
                                        </time>
                                        <span className="text-0.875rem">
                                            By{ ' ' }
                                            { post.author ? (
                                                <Link
                                                    href={ `/authors/${ post.author.slug }` }
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    { post.author.name }
                                                </Link>
                                            ) : (
                                                'Unknown Author'
                                            ) }
                                        </span>
                                    </div>
                                    <h3 className="text-1.25rem font-semibold mb-2 text-gray-900 hover:text-blue-600">
                                        <Link href={ `/blog/${ post.slug }` }>{ post.title }</Link>
                                    </h3>
                                    <p className="text-1rem text-gray-600 mb-4 line-clamp-3">{ post.excerpt }</p>
                                </div>
                                <div className="px-6 py-4 mt-auto">
                                    <Link
                                        href={ `/blog/${ post.slug }` }
                                        className="text-blue-600 hover:text-blue-800 font-medium text-1rem"
                                    >
                                        <strong>Read more about:</strong> { post.title } →
                                    </Link>
                                </div>
                            </article>
                        ) ) }
                    </div>
                </div>
            </main>
            <FooterFull />
        </>
    );
}