'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AlertDialogContent } from '@radix-ui/react-alert-dialog';

type BlogPost = {
    id: number;
    slug: string;
    title: string;
    content: string;
    excerpt: string | null;
    author: string;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    tags: string[];
};

const AdminDashboard = () =>
{
    const [ posts, setPosts ] = useState<BlogPost[]>( [] );
    const [ user, setUser ] = useState<User | null>( null );
    const [ showDeleteDialog, setShowDeleteDialog ] = useState( false );
    const [ postToDelete, setPostToDelete ] = useState<BlogPost | null>( null );
    const router = useRouter();

    useEffect( () =>
    {
        const checkUser = async () =>
        {
            const supabase = createClient();
            const {
                data: { user }
            } = await supabase.auth.getUser();

            if ( user?.email !== 'casey.spaulding@gmail.com' )
            {
                router.push( '/login' );
                return;
            }

            setUser( user );

            const { data: posts, error } = await supabase.from( 'blog_posts' ).select( '*' );
            if ( error )
            {
                console.error( 'Error fetching posts:', error );
                return;
            }

            const formattedPosts: BlogPost[] = ( posts || [] ).map( ( post ) => ( {
                id: post.id,
                slug: post.slug,
                title: post.title,
                content: post.content,
                excerpt: post.excerpt || '',
                author: String( post.author_id ) || 'Unknown',
                createdAt: post.created_at,
                updatedAt: post.updated_at,
                publishedAt: post.published_at || undefined,
                tags: Array.isArray( post.tags ) ? post.tags : []
            } ) );

            setPosts( formattedPosts );
        };

        checkUser();
    }, [ router ] );

    const handleDelete = async () =>
    {
        if ( postToDelete )
        {
            const supabase = createClient();
            const { error } = await supabase.from( 'blog_posts' ).delete().eq( 'id', postToDelete.id );

            if ( error )
            {
                console.error( 'Error deleting post:', error );
            } else
            {
                setPosts( posts.filter( ( post ) => post.id !== postToDelete.id ) );
                setShowDeleteDialog( false );
                setPostToDelete( null );
            }
        }
    };

    if ( !user )
    {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-lg text-muted-foreground">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h1 className="mb-8 text-3xl font-bold text-foreground">Blog Dashboard</h1>

                <div className="mb-6 flex justify-end">
                    <Link href="/admin/createpost">
                        <Button>
                            Create New Post
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <ul className="divide-y divide-border">
                            { posts.map( ( post ) => (
                                <li key={ post.id } className="p-4 transition-colors hover:bg-muted/50">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-lg font-medium text-foreground">
                                                { post.title }
                                            </h2>
                                            <p className="text-sm text-muted-foreground">{ post.excerpt }</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Link href={ `/admin/editpost/${ post.id }` }>
                                                <Button variant="outline" size="sm">
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={ () =>
                                                {
                                                    setPostToDelete( post );
                                                    setShowDeleteDialog( true );
                                                } }
                                                className="text-destructive hover:bg-destructive/90 hover:text-destructive-foreground"
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </li>
                            ) ) }
                        </ul>
                    </CardContent>
                </Card>

                <AlertDialog open={ showDeleteDialog } onOpenChange={ setShowDeleteDialog }>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the post
                                from the database.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={ handleDelete }
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default AdminDashboard;