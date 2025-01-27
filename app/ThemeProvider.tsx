'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export default function ThemeProviders ( { children }: { children: ReactNode } )
{
  return (
    <ThemeProvider
      attribute="class"       // ensures Next Themes adds `class="dark"` or `class="light"` on <html>
      defaultTheme="light"   // or "dark" or "light"
      enableSystem={ false }     // enable OS-based dark/light preference
    >
      { children }
    </ThemeProvider>
  );
}
