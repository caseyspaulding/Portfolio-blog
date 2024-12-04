// app/layout.tsx
import type { PropsWithChildren } from 'react';
import { Poppins } from 'next/font/google';
import './globals.css';
import ClientProviders from './ClientProviders';
import { ThemeProvider } from "@/providers/theme-provider";
import Script from 'next/script';
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"
import { Providers } from './providers'


export const metadata = {
    title: 'Casey Spaulding - Blog and Portfolio',
    description: 'Personal blog and portfolio of Casey Spaulding, Full Stack Developer',
}

// Google Font Configuration
const spaceGrotesk = Poppins( {
    weight: [ '400' ],
    subsets: [ 'latin' ],
    display: 'swap',
} );

export default function RootLayout ( { children }: PropsWithChildren )
{
    return (
        <html lang="en" className={ spaceGrotesk.className }>

            <body>
                <Analytics />
                {/* Google Tag Manager Script */ }
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
                    <Providers>
                        { children }
                    </Providers>
                </ClientProviders>

                <Toaster />
            </body>
        </html>
    );
}
