
import NavBar1 from '@/components/NavBarTW/NavBar1';

import NavBarTW from '@/components/NavBarTW/NavBarTW';
import type { Metadata } from 'next';

import React from 'react';



export const metadata: Metadata = {
    title: 'CaseySpaulding - Simplified Event Management and Ticket Sales',
    description:
        'Boost ticket sales, simplify planning, and manage everything in one place with CaseySpaulding. Whether your event is big or small, we’ve got you covered. Start for free today.',
    keywords: 'event management, ticket sales, event planning, nonprofit events, CaseySpaulding, event software',
    robots: 'index, follow',
    alternates: {
        canonical: 'https://CaseySpaulding.com/',
    },
    openGraph: {
        title: 'CaseySpaulding - Simplified Event Management',
        description:
            'Take control of your event management with CaseySpaulding. Manage vendors, volunteers, attendees, and more from one platform. Perfect for nonprofits and events of any size.',
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
        title: 'CaseySpaulding - Simplified Event Management and Ticket Sales',
        description: 'Easily manage your event’s logistics with CaseySpaulding, from ticket sales to volunteer coordination. Start today for free!',
    },
};


// Removed duplicate metadata declaration

export default async function Index ()
{
    // Fetch data directly in the server component


    return (
        <>


            <NavBar1 />












        </>
    );
}
