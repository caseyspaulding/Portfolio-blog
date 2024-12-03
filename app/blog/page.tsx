import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/db';
import { desc, eq } from 'drizzle-orm';
import { authors, blogPosts } from '@/db/schemas/schema';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navbar from '@/components/NavBar';
import NavBar from '@/components/NavBar';

export const metadata = {
    title: 'Blog - CaseySpaulding',
    description: 'Read the latest articles from our blog for tips to grow and organize stellar events with CaseySpaulding.',
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

    return (<>
         <NavBar />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
            <h1 className="text-4xl font-bold text-center mb-12">Latest Blog Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                { posts.map( ( post ) => (
                    <Card key={ post.id } className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <Link href={ `/blog/${ post.slug }` } className="block">
                            <div className="relative h-48 w-full">
                                <Image
                                    src={ post.featuredImage || '/placeholder.svg?height=192&width=384' }
                                    alt={ post.title }
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        </Link>
                        <CardHeader>
                            <CardTitle className="text-xl">
                                <Link href={ `/blog/${ post.slug }` } className="hover:text-blue-600 transition-colors duration-300">
                                    { post.title }
                                </Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500 mb-2">
                                <time dateTime={ post.createdAt.toISOString() }>
                                    { new Date( post.createdAt ).toLocaleDateString() }
                                </time>
                                { ' ' }by{ ' ' }
                                { post.author ? (
                                    <Link href={ `/authors/${ post.author.slug }` } className="text-blue-600 hover:underline">
                                        { post.author.name }
                                    </Link>
                                ) : (
                                    'Unknown Author'
                                ) }
                            </p>
                            <p className="text-gray-600 line-clamp-3">{ post.excerpt }</p>
                        </CardContent>
                        <CardFooter className="mt-auto">
                            <Button asChild variant="link" className="p-0">
                                <Link href={ `/blog/${ post.slug }` }>
                                    Read more
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ) ) }
            </div>
        </main>
    </>
    );
}

