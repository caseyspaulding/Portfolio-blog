import type { PropsWithChildren } from 'react';
import { Poppins } from 'next/font/google';
import './globals.css';
import ClientProviders from './ClientProviders';
import { Analytics } from '@vercel/analytics/react';
import { Providers } from './providers';
import FooterTW from '@/components/Footers/FooterTW';
import Script from 'next/script';
import NavBar from '@/components/NavBar';

export const metadata = {
    title: 'Casey Spaulding - Blog and Portfolio',
    description: 'Personal blog and portfolio of Casey Spaulding, Full Stack Developer',
};

const poppins = Poppins( {
    weight: [ '400' ],
    subsets: [ 'latin' ],
    display: 'swap',
} );

export default function RootLayout ( { children }: PropsWithChildren )
{
    return (
        <html lang="en" className={ `${ poppins.className }` } suppressHydrationWarning>

            <body className="bg-background text-foreground">
                <Providers> {/* Wrap entire app with ThemeProvider */ }
                    <NavBar /> {/* NavBar now wrapped in ThemeProvider */ }
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
                </Providers>
            </body>
        </html>
    );
}
