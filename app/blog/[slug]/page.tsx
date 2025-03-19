
import { getBlogPostBySlug, getAllBlogSlugs } from '@/app/actions/blogActions';
import type { Metadata } from 'next';
import PageBackground from '@/components/PageBackGround';
import 'highlight.js/styles/github.css';
import BlogContent from './BlogContent';
import { marked } from 'marked';
import markedKatex from "marked-katex-extension"
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

// Configure marked with KaTeX and mermaid support
marked.use( markedKatex( {
    throwOnError: false,
    output: 'html'
} ) );

// Create a custom renderer
const renderer = new marked.Renderer();

// Override the code renderer with the correct signature
renderer.code = function ( { text, lang, escaped }: { text: string; lang?: string; escaped?: boolean } )
{
    if ( lang === 'mermaid' )
    {
        return `<div class="mermaid">${ text }</div>`;
    }

    // For other languages, use highlight.js
    if ( lang && hljs.getLanguage( lang ) )
    {
        try
        {
            const highlightedCode = hljs.highlight( text, { language: lang } ).value;
            return `<pre><code class="hljs language-${ lang }">${ highlightedCode }</code></pre>`;
        } catch ( err )
        {
            console.error( err );
        }
    }

    // Fallback to auto-highlighting
    return `<pre><code class="hljs">${ hljs.highlightAuto( text ).value }</code></pre>`;
};

// Configure marked with the custom renderer
marked.setOptions( {
    renderer: renderer,
    gfm: true,
    breaks: true
} );


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

    // For meta description, use raw text without markdown formatting
    const plainTextContent = post.content.replace( /[#*`_\[\]]/g, '' ).slice( 0, 160 );

    return {
        title: post.title,
        description: post.excerpt || plainTextContent,
        openGraph: {
            title: post.title,
            description: post.excerpt || plainTextContent,
            url: `https://CaseySpaulding.com/blog/${ resolvedParams.slug }`,
            images: post.featuredImage ? [ { url: post.featuredImage, alt: post.title } ] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt || plainTextContent,
            images: post.featuredImage ? [ { url: post.featuredImage, alt: post.title } ] : [],
        },
    };
}

function calculateReadTime ( content: string ): string
{
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = content.split( /\s+/ ).length; // More accurate word count
    const minutes = Math.ceil( wordCount / wordsPerMinute );
    return `${ minutes } min read`;
}

// Add this script to initialize mermaid diagrams if you have them
const MermaidInitializer = () =>
{
    return (
        <script
            dangerouslySetInnerHTML={ {
                __html: `
          document.addEventListener('DOMContentLoaded', () => {
            if (typeof mermaid !== 'undefined') {
              mermaid.initialize({ 
                startOnLoad: true,
                theme: 'default',
                securityLevel: 'loose'
              });
            }
          });
        `,
            } }
        />

    );

};

export default async function BlogPost ( { params }: { params: Promise<{ slug: string }> } )
{
    const resolvedParams = await params;
    const post = await getBlogPostBySlug( resolvedParams.slug );

    if ( !post )
    {
        return <div className="text-center text-xl text-red-600">Post not found</div>;
    }

    // Convert markdown to HTML using marked
    const htmlContent = await marked( post.content );

    const readTime = calculateReadTime( post.content );
    let tags;
    try
    {
        // Parse JSON if possible, then split the tags on commas
        tags = post.tags
            ? JSON.parse( post.tags ).flatMap( ( tag: string ) => tag.split( ',' ).map( ( t ) => t.trim() ) )
            : [];
    } catch ( error )
    {
        // If JSON.parse fails, split the plain string on commas
        tags = post.tags ? post.tags.split( ',' ).map( ( t ) => t.trim() ) : [];
    }

    return (
        <>
            <PageBackground>
                <div className="font-space-grotesk text-gray-800 dark:text-gray-100">
                    <article className="mx-auto max-w-6xl px-2 py-12 sm:px-4 lg:px-4">
                        <div className="relative mb-8 flex flex-col md:flex-row items-center md:items-stretch">
                            <div className="md:w-2/3 flex flex-col justify-center p-4 bg-white dark:bg-black rounded-tl-xl rounded-bl-xl">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    { tags.length > 0
                                        ? tags.map( ( tag: string, index: number ) => (
                                            <span
                                                key={ index }
                                                className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                                            >
                                                { tag }
                                            </span>
                                        ) )
                                        : null }
                                </div>
                                <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4 leading-tight">
                                    { post.title }
                                </h1>
                                <p className="text-base text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                                    { new Date( post.createdAt ).toLocaleDateString( 'en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    } ) }{ ' ' }
                                    • { readTime }
                                </p>
                                <div className="flex items-center text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                                    { post.author?.avatarUrl && (
                                        <img
                                            src="/images/caseyProfilePic.jpg"
                                            alt={ post.author.name }
                                            className="w-8 h-8 rounded-full mr-2"
                                        />
                                    ) }
                                    <span>
                                        By{ ' ' }
                                        { post.author ? (
                                            <a
                                                href={ `/authors/${ post.author.slug }` }
                                                className="text-blue-600 dark:text-blue-400 hover:underline"
                                            >
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

                        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 bg-white dark:bg-black rounded-2xl p-4">
                            <div className="xl:col-span-3">
                                <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed text-lg markdown-content">
                                    <div dangerouslySetInnerHTML={ { __html: htmlContent } } />
                                    <BlogContent htmlContent={ htmlContent } />
                                </div>
                            </div>

                            {/*<aside className="hidden xl:block xl:col-span-1 space-y-6 xl:space-y-10">
                <div className="sticky top-20 space-y-6">
                  <div className="p-6 rounded-2xl shadow-md text-center bg-gray-100 dark:bg-gray-700">
                    <h3 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-2">
                      Start Today!
                    </h3>
                  </div>
                </div>
              </aside>*/}
                        </div>
                    </article>
                </div>
            </PageBackground>
            <MermaidInitializer />
        </>
    );
}