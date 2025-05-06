'use client';

import React, { Suspense } from 'react';
// Direct import of the Button component
import { Toaster } from 'react-hot-toast';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import Script from 'next/script';
import MermaidThemer from '@/components/MermaidTheme';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// Lazy load non-essential components
const UserProvider = React.lazy( () => import( '@/contexts/UserContext' ) );
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
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
            theme: 'light',
            themeVariables: {
              // Example: Increase the global font size
              fontSize: '20px',

              // Ensure text is visible in both light and dark modes

            }
          } )
        } }
      />
      <Toaster />
      <PrimeReactProvider>
      <Suspense fallback={ <div>Loading...</div> }>
        <MermaidThemer />
        <UserProvider initialUser={ null }>
          { children }
        </UserProvider>
      </Suspense>
      <ProgressBar
        height="3px"
        color="#155ce9"
        options={ { showSpinner: false } }
        shallowRouting
        />
      </PrimeReactProvider>
    </>
  );
}
