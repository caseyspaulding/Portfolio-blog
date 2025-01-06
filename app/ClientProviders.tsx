'use client';

import React, { Suspense } from 'react';
// Direct import of the Button component
import { Toaster } from 'react-hot-toast';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import Script from 'next/script';
import MermaidThemer from '@/components/MermaidTheme';


// Lazy load non-essential components
const UserProvider = React.lazy( () => import( '@/contexts/UserContext' ) );

export default function ClientProviders ( { children }: { children: React.ReactNode } )
{
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"
        strategy="afterInteractive"
        onLoad={ () =>
        {
          // @ts-ignore
          window.mermaid?.initialize( {
            startOnLoad: true,
            securityLevel: 'loose',
            theme: 'dark',
            themeVariables: {
              // Example: Increase the global font size
              fontSize: '20px',

              // Ensure text is visible in both light and dark modes

            }
          } )
        } }
      />
      <Toaster />
      <Suspense fallback={ <div>Loading...</div> }>
        <MermaidThemer />
        <UserProvider initialUser={ null }>
          { children }
        </UserProvider>
      </Suspense>
      <ProgressBar
        height="3px"
        color="#22c55e"
        options={ { showSpinner: false } }
        shallowRouting
      />
    </>
  );
}
