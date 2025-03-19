import type { PropsWithChildren } from 'react';
import { Rubik } from 'next/font/google';
import './globals.css';
import ClientProviders from './ClientProviders';
import { Analytics } from '@vercel/analytics/react';
import { Providers } from './providers';
import FooterTW from '@/components/Footers/FooterTW';
import Script from 'next/script';
import NavBar from '@/components/NavBar';
import ThemeProviders from './ThemeProvider';
import 'katex/dist/katex.min.css';
import { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://CaseySpaulding.com';
const DEFAULT_OG_IMAGE = '/images/og-default.jpg'; // Create a default OG image 1200×630px

export const metadata: Metadata = {
    title: 'Casey Spaulding - Blog and Portfolio',
    description: 'Personal blog and portfolio of Casey Spaulding, .NET Full Stack Developer',
    metadataBase: new URL( SITE_URL ),
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: SITE_URL,
        siteName: 'Casey Spaulding',
        title: 'Casey Spaulding - Blog and Portfolio',
        description: 'Personal blog and portfolio of Casey Spaulding, .NET Full Stack Developer',
        images: [
            {
                url: DEFAULT_OG_IMAGE,
                width: 1200,
                height: 630,
                alt: 'Casey Spaulding - Blog and Portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Casey Spaulding - Blog and Portfolio',
        description: 'Personal blog and portfolio of Casey Spaulding, .NET Full Stack Developer',
        images: [ DEFAULT_OG_IMAGE ],
        creator: '@caseyspaulding_', // Replace with your Twitter handle
    },
    robots: {
        index: true,
        follow: true,
    },
};

const poppins = Rubik( {
    weight: [ '400', '500', '700', '800', '900' ],
    subsets: [ 'latin' ],
    display: 'swap',
} );

export default function RootLayout ( { children }: PropsWithChildren )
{
    return (
        <html lang="en" className={ `${ poppins.className }` } suppressHydrationWarning>
            <body className="bg-background text-foreground">
                <Providers>
                    <ThemeProviders>
                        <NavBar />
                        <Analytics />
                        <Script
                            strategy="afterInteractive"
                            src="https://www.googletagmanager.com/gtag/js?id=G-M6F4XVZM25"
                        />
                        <Script id="gtag-init" strategy="afterInteractive">
                            { `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-M6F4XVZM25');
            `}
                        </Script>
                        <ClientProviders>
                            { children }
                        </ClientProviders>
                        <FooterTW />
                    </ThemeProviders>
                </Providers>
            </body>
        </html>
    );
}