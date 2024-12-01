import AboutHeroBig from '@/components/About/AboutHeroBig';
import FooterFull from '@/components/Footers/FooterFull';
import NavBar1 from '@/components/NavBarTW/NavBar1';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'About Us - EventJacket',
    description: 'Learn more about EventJacket and our mission to simplify event management.'
};


export default function About() {
    return (
        <>
            <NavBar1 />
            <AboutHeroBig />
            <FooterFull />
        </>
    );
}
