import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, FileCode } from 'lucide-react';

import { ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode, Key } from 'react';
import { parseMetadataFromTags } from '@/constants/blogConstants';

export interface BlogPost
{
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  createdAt: Date;
  tags: string | null;
  diagrams: any[]; // Type this properly based on your schema
  author: {
    name: string;
    slug: string;
    avatarUrl: string | null;
    bio: string | null;
  } | null;
}

interface BlogCardProps
{
  post: BlogPost;
}

export function BlogCard ( { post }: BlogCardProps )
{
  const metadata = post.tags ? parseMetadataFromTags( post.tags ) : null;
  const readingTime = Math.ceil( post.content.length / 1000 ); // Rough estimate
  const hasDiagrams = post.diagrams && post.diagrams.length > 0;

  const getDifficultyColor = ( level?: string ) =>
  {
    switch ( level?.toLowerCase() )
    {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'advanced': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default: return '';
    }
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden group hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <Link href={ `/blog/${ post.slug }` } className="block overflow-hidden">
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={ post.featuredImage || '/placeholder.svg?height=224&width=448' }
            alt={ post.title }
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={ false }
          />
          { metadata?.categories && metadata.categories.length > 0 && (
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              { metadata.categories.map( ( category: string ) => (
                <Badge
                  key={ category }
                  variant="secondary"
                  className="bg-black/70 text-white backdrop-blur-sm border-none"
                >
                  { category }
                </Badge>
              ) ) }
            </div>
          ) }
        </div>
      </Link>

      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-3">

            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              { readingTime } min read
            </div>
            { hasDiagrams && (
              <div className="flex items-center text-green-600 dark:text-green-400">
                <FileCode className="w-4 h-4 mr-1" />
                { post.diagrams.length } diagram{ post.diagrams.length !== 1 ? 's' : '' }
              </div>
            ) }
          </div>
          <time dateTime={ post.createdAt.toISOString() } className="text-sm">
            { new Date( post.createdAt ).toLocaleDateString( 'en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            } ) }
          </time>
        </div>

        <Link
          href={ `/blog/${ post.slug }` }
          className="block group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300"
        >
          <h2 className="text-xl font-bold leading-tight line-clamp-2">
            { post.title }
          </h2>
        </Link>
      </CardHeader>

      <CardContent className="flex-grow space-y-4">
        { post.excerpt && (
          <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
            { post.excerpt }
          </p>
        ) }

        { metadata?.technologies && metadata.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            { metadata.technologies.map( ( tech: string ): ReactElement => (
              <Badge
                key={ tech }
                variant="outline"
                className="text-gray-700 dark:text-gray-300"
              >
                { tech }
              </Badge>
            ) ) }
          </div>
        ) }

        { post.author && (
          <div className="flex items-center space-x-3 pt-4">
            { post.author.avatarUrl && (
              <Image
                src={ post.author.avatarUrl }
                alt={ post.author.name }
                width={ 32 }
                height={ 32 }
                className="rounded-full"
              />
            ) }
            <div>
              <Link
                href={ `/authors/${ post.author.slug }` }
                className="text-sm font-medium hover:text-green-600 dark:hover:text-green-400"
              >
                { post.author.name }
              </Link>


            </div>
          </div>
        ) }
      </CardContent>

      <CardFooter className="pt-4">
        <Button
          asChild
          variant="ghost"
          className="w-full group-hover:bg-green-50 dark:group-hover:bg-green-950/30"
        >
          <Link
            href={ `/blog/${ post.slug }` }
            className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400"
          >
            <span>Read Full Article</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={ 2 }
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}