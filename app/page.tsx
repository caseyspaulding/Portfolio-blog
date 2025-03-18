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
            <Head>
                <title>Casey Spaulding - Blog and Portfolio - </title>
                <meta
                    name="description"
                    content="Personal blog and portfolio of Casey Spaulding, .NET Full Stack Developer"
                />
                <meta name="keywords" content="Casey Spaulding, .NET Full Stack Developer, Portfolio" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://caseyspaulding.com" />
                {/* Open Graph tags */ }
                <meta property="og:title" content="Casey Spaulding - Blog and Portfolio" />
                <meta property="og:description" content="Full Stack Developer" />
                <meta property="og:url" content="https://caseyspaulding.com" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:image"
                    content="https://caseyspaulding.com/images/og-image.png"
                />
                {/* Twitter meta tags */ }
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@CaseySpaulding" />
                <meta name="twitter:title" content="Casey Spaulding - .NET Full Stack Developer - Blog and Portfolio" />
                <meta name="twitter:description" content=".NET Full Stack Developer" />
            </Head>

            <main>
                <Hero theme={ theme || 'light' } />
                {/* Other sections of your homepage */ }
            </main>
        </>
    );
}
