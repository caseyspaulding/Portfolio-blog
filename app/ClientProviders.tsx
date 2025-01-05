'use client';

import React, { Suspense } from 'react';
// Direct import of the Button component
import { Toaster } from 'react-hot-toast';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import Script from 'next/script';


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
            theme: 'neutral',  // Using neutral theme as base
            themeVariables: {
              // Ensure text is visible in both light and dark modes
              primaryTextColor: '#000000',
              secondaryTextColor: '#000000',
              tertiaryTextColor: '#000000',
              primaryColor: '#E3E8FF',
              secondaryColor: '#F4F4F4',
              nodeBorder: '#2563eb',
              clusterBkg: '#F8F9FA',
              titleColor: '#000000',
              edgeLabelBackground: '#FFFFFF',
            }
          } )
        } }
      />
      <Toaster />
      <Suspense fallback={ <div>Loading...</div> }>
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
