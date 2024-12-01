'use client';

import React, { Suspense } from 'react';
// Direct import of the Button component
import { Toaster } from 'react-hot-toast';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';


// Lazy load non-essential components
const UserProvider = React.lazy( () => import( '@/contexts/UserContext' ) );

export default function ClientProviders ( { children }: { children: React.ReactNode } )
{
  return (
    <>

      <Toaster />
      <Suspense fallback={ <div>Loading...</div> }>
        <UserProvider initialUser={ null }>
          { children }
        </UserProvider>
      </Suspense>
      <ProgressBar
        height="3px"
        color="#1d63e8"
        options={ { showSpinner: false } }
        shallowRouting
      />
    </>
  );
}
