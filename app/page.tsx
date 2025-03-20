'use client';

import Hero from '@/components/Hero';
import Navbar from '@/components/NavBar';
import Head from 'next/head';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

export default function Index ()
{
    const { theme } = useTheme();
    const [ mounted, setMounted ] = useState( false );

    useEffect( () =>
    {
        setMounted( true );
    }, [] );

    if ( !mounted )
    {
        // Prevent rendering until hydration completes
        return null;
    }

    return (
        <>
           
            <main>
                <Hero theme={ theme || 'light' } />
                {/* Other sections of your homepage */ }
            </main>
        </>
    );
}
