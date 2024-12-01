import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';
import { getBlogPostBySlug, getAllBlogSlugs } from '@/app/actions/blogActions';
import FooterFull from '@/components/Footers/FooterFull';
import NavBar1 from '@/components/NavBarTW/NavBar1';
import type { Metadata } from 'next';

export async function generateStaticParams ()
{
    const slugs = await getAllBlogSlugs();
    return slugs.map( ( slug: string ) => ( { slug } ) );
}

export async function generateMetadata ( { params }: { params: Promise<{ slug: string }> } ): Promise<Metadata>
{
    const resolvedParams = await params; // Await the promise
    const post = await getBlogPostBySlug( resolvedParams.slug );
    if ( !post )
    {
        return {
            title: 'Post not found',
            description: 'The post you are looking for does not exist.',
        };
    }

    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt || post.content.slice( 0, 160 ),
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt || post.content.slice( 0, 160 ),
            url: `https://eventjacket.com/blog/${ resolvedParams.slug }`, // Update to your website URL
            images: post.featuredImage ? [ { url: post.featuredImage, alt: post.title } ] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt || post.content.slice( 0, 160 ),
            images: post.featuredImage ? [ { url: post.featuredImage, alt: post.title } ] : [],
        },
    };
}

function calculateReadTime ( content: string ): string
{
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = content.split( ' ' ).length;
    const minutes = Math.ceil( wordCount / wordsPerMinute );
    return `${ minutes } min read`;
}

export default async function BlogPost ( { params }: { params: Promise<{ slug: string }> } )
{
    const resolvedParams = await params; // Await the promise
    const post = await getBlogPostBySlug( resolvedParams.slug );

    if ( !post )
    {
        return <div className="text-center text-xl text-red-600">Post not found</div>;
    }

    // Sanitize the HTML content
    const sanitizedContent = DOMPurify.sanitize( post.content );
    const readTime = calculateReadTime( post.content );
    let tags;
    try
    {
        tags = post.tags ? JSON.parse( post.tags ) : [];
    } catch ( error )
    {
        // If JSON.parse fails, it’s likely just a plain string
        tags = [ post.tags ];
    }


    return (
        <>
            <NavBar1 />
            <div className="font-space-grotesk">
                <article className="mx-auto max-w-7xl px-2 py-12 sm:px-4 lg:px-4">
                    <div className="relative mb-8 flex flex-col md:flex-row items-center md:items-stretch">
                        <div className="md:w-2/3 flex flex-col justify-center p-4 bg-white rounded-tl-xl rounded-bl-xl">
                            <div className="flex flex-wrap gap-2 mb-4">
                                { tags ? tags.map( ( tag: string, index: number ) => (
                                    <span key={ index } className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                                        { tag.trim() }
                                    </span>
                                ) ) : null }
                            </div>
                            <h1 className="text-4xl font-extrabold text-gray-800 mb-4 leading-tight">{ post.title }</h1>
                            <p className="text-base text-gray-500 mb-4 leading-relaxed">
                                { new Date( post.createdAt ).toLocaleDateString() } • { readTime }
                            </p>
                            <div className="flex items-center text-base text-gray-500 leading-relaxed">
                                { post.author?.avatarUrl && (
                                    <img
                                        src='/images/caseyProfilePic.jpg'
                                        alt={ post.author.name }
                                        className="w-8 h-8 rounded-full mr-2"
                                    />
                                ) }
                                <span>
                                    By{ ' ' }
                                    { post.author ? (
                                        <a href={ `/authors/${ post.author.slug }` } className="text-blue-600 hover:underline">
                                            { post.author.name }
                                        </a>
                                    ) : (
                                        'Unknown Author'
                                    ) }
                                </span>
                            </div>
                        </div>

                        { post.featuredImage && (
                            <div className="w-full md:w-3/4 h-96 overflow-hidden">
                                <img
                                    src={ post.featuredImage }
                                    alt={ post.title }
                                    className="w-full h-full object-cover rounded-xl md:rounded-tl-xl"
                                />
                            </div>
                        ) }
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 bg-white rounded-2xl p-4">
                        <div className="xl:col-span-3">
                            <div className="prose prose-lg max-w-none leading-relaxed text-lg">
                                { parse( sanitizedContent ) }
                            </div>
                        </div>

                        <aside className="hidden xl:block xl:col-span-1 space-y-6 xl:space-y-10">
                            <div className="sticky top-20 space-y-6">
                                <div className="p-6  rounded-2xl shadow-md text-center">
                                    <h3 className="text-lg font-bold text-blue-900 mb-2">Start Today!</h3>
                                    <p className="text-base text-gray-700 mb-4 leading-relaxed">
                                        No Credit Card Required.
                                    </p>
                                    <a
                                        href="/signup"
                                        className="inline-block px-4 py-2 text-white bg-blue-600 rounded-3xl hover:bg-blue-500"
                                    >
                                        Get Your Account
                                    </a>
                                </div>
                            </div>
                        </aside>
                    </div>
                </article>

                <FooterFull />
            </div>
        </>
    );
}
