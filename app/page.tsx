import SvgBackgroundReversed from '@/components/Backgrounds/SquareSvgBackgroundReverse';
import SlantedDividerSolid from '@/components/Divider/SlantedDividerSolidProps';
import NavBar1 from '@/components/NavBarTW/NavBar1';
import FeaturesGridWithIcons from '@/components/Features/FeaturesGridwithIcons';
import FooterFull from '@/components/Footers/FooterFull';
import NavBarTW from '@/components/NavBarTW/NavBarTW';
import type { Metadata } from 'next';
import { getEvents } from './actions/getEvents'; // Server action or server-side fetching function
import HowItWorks from '@/components/Features/HowItWorks';
import FAQ_TW from '@/components/FAQ/FAQ_TW';

import { Button } from '@nextui-org/button';
import React from 'react';
import FreeServices from '@/components/free-service';
import FreeServiceAccordion from '@/components/free-services-accordion';


export const metadata: Metadata = {
    title: 'EventJacket - Simplified Event Management and Ticket Sales',
    description:
        'Boost ticket sales, simplify planning, and manage everything in one place with EventJacket. Whether your event is big or small, we’ve got you covered. Start for free today.',
    keywords: 'event management, ticket sales, event planning, nonprofit events, EventJacket, event software',
    robots: 'index, follow',
    alternates: {
        canonical: 'https://eventjacket.com/',
    },
    openGraph: {
        title: 'EventJacket - Simplified Event Management',
        description:
            'Take control of your event management with EventJacket. Manage vendors, volunteers, attendees, and more from one platform. Perfect for nonprofits and events of any size.',
        url: 'https://eventjacket.com/',
        type: 'website',
        images: [
            {
                url: 'https://eventjacket.com/images/og-image.png',
                width: 1200,
                height: 630,
                alt: 'EventJacket - Simplified Event Management',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@EventJacket',
        title: 'EventJacket - Simplified Event Management and Ticket Sales',
        description: 'Easily manage your event’s logistics with EventJacket, from ticket sales to volunteer coordination. Start today for free!',
    },
};


// Removed duplicate metadata declaration

export default async function Index ()
{
    // Fetch data directly in the server component
    const eventList = await getEvents(); // Ensure this fetches the latest data

    return (
        <>

          
            <NavBar1 />
            <NavBarTW />

           

          
        

          
           


           
        </>
    );
}
