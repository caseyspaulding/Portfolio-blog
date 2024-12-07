
import Hero from '@/components/Hero';
import Navbar from '@/components/NavBar';


import type { Metadata } from 'next';
import { useTheme } from 'next-themes';

import React from 'react';



export const metadata: Metadata = {
    title: 'CaseySpaulding - Blog and portfolio',
    description:
        'Personal blog and portfolio of Casey Spaulding, Full Stack Developer',
    keywords: 'casey spaulding',
    robots: 'index, follow',
    alternates: {
        canonical: 'https://CaseySpaulding.com/',
    },
    openGraph: {
        title: 'CaseySpaulding - Blog and portfolio',
        description:
            'Personal blog and portfolio of Casey Spaulding, Full Stack Developer',
        url: 'https://CaseySpaulding.com/',
        type: 'website',
        images: [
            {
                url: 'https://CaseySpaulding.com/images/og-image.png',
                width: 1200,
                height: 630,
                alt: 'CaseySpaulding - Simplified Event Management',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@CaseySpaulding',
        title: 'Casey Spaulding - Blog and portfolio',
        description: 'Personal blog and portfolio of Casey Spaulding, Full Stack Developer.',
    },
};


// Removed duplicate metadata declaration

export default async function Index ()
{
    // Fetch data directly in the server component


    return (
        <> 
            <Navbar />
            <main>
                <Hero />
                {/* Other sections of your homepage */ }

            </main>


       









        </>
    );
}
