'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { Button } from '@nextui-org/button';


type Posts = {
    id: number;
    title: string;
    content: string;
    created_at: string;
};




const AdminDashboard = () =>
{
    const [ posts, setPosts ] = useState<Posts[]>( [] );
    const [ user, setUser ] = useState<User | null>( null );
    const router = useRouter();

    useEffect( () =>
    {
        const checkUser = async () =>
        {
            const supabase = createClient();
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if ( user?.email !== 'casey.spaulding@gmail.com' )
            {
                router.push( '/login' ); // redirect to login if not admin
                return;
            }

            setUser( user );

            // Fetch all blog posts
            const { data: posts } = await supabase.from( 'blog_posts' ).select( '*' );
            setPosts( posts || [] );
        };

        checkUser();
    }, [ router ] );

    if ( !user )
    {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Blog Admin Dashboard</h1>
                <Button
                    as='a'
                    href='/admin/dashboard'>Dashboard</Button>
            </div>
        </div>
    );
};

export default AdminDashboard;
