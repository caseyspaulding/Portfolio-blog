'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { Button, Modal } from 'flowbite-react';

type BlogPost = {
    id: number;
    slug: string;
    title: string;
    content: string;
    excerpt: string | null;
    author: string; // Ensure `author` is set correctly in your mapping
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    tags: string[];
};

const AdminDashboard = () =>
{
    const [ posts, setPosts ] = useState<BlogPost[]>( [] );
    const [ user, setUser ] = useState<User | null>( null );
    const [ showModal, setShowModal ] = useState( false );
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
                router.push( '/login' ); // redirect to login if not admin
                return;
            }

            setUser( user );

            // Fetch blog posts and map them to the expected format
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
                author: String(post.author_id) || 'Unknown', // Map `author_id` to string or default to a placeholder if needed
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
                setShowModal( false );
                setPostToDelete( null );
            }
        }
    };

    if ( !user )
    {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center text-lg text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="mb-8 text-3xl font-bold text-gray-900">Admin Dashboard</h1>

                <div className="mb-6 flex justify-end">
                    <Link href="/admin/createpost">
                        <Button className="bg-blue-600 text-white hover:bg-blue-700">
                            Create New Post
                        </Button>
                    </Link>
                </div>

                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <ul className="divide-y divide-gray-200">
                        { posts.map( ( post ) => (
                            <li key={ post.id } className="px-6 py-4 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-medium text-gray-900">
                                            { post.title }
                                        </h2>
                                        <p className="text-sm text-gray-500">{ post.excerpt }</p>
                                    </div>
                                    <div className="flex space-x-4">
                                        <Link href={ `/admin/editpost/${ post.id }` }>
                                            <Button
                                                color="gray"
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            color="gray"
                                            className="text-red-600 hover:text-red-900"
                                            onClick={ () =>
                                            {
                                                setPostToDelete( post );
                                                setShowModal( true );
                                            } }
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </li>
                        ) ) }
                    </ul>
                </div>

                <Modal show={ showModal } onClose={ () => setShowModal( false ) }>
                    <Modal.Header>Confirm Deletion</Modal.Header>
                    <Modal.Body>
                        <p>
                            Are you sure you want to delete this post? This action cannot be undone.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="gray" onClick={ () => setShowModal( false ) }>
                            Cancel
                        </Button>
                        <Button color="red" onClick={ handleDelete }>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default AdminDashboard;
