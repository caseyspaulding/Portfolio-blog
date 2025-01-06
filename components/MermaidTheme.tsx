'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import mermaid from 'mermaid';

// Define two sets of theme variables: one for light, one for dark
const mermaidLight = {
  // Light arrows/text
  lineColor: '#000000',
  primaryTextColor: '#000000',
  primaryColor: '#E3E8FF',
  // ...any other overrides
};

const mermaidDark = {
  // White arrows/text
  lineColor: '#ffffff',
  primaryTextColor: '#ffffff',
  primaryColor: '#333333',
  // ...any other overrides
};

export default function MermaidThemer ()
{
  const { theme } = useTheme();
  // If you’re using shadcn without next-themes, see notes below on how to detect “dark” class.

  useEffect( () =>
  {
    // Decide which set of variables to use
    const isDarkMode = theme === 'dark';
    mermaid.initialize( {
      startOnLoad: true,
      securityLevel: 'loose',
      theme: isDarkMode ? 'dark' : 'default',
      themeVariables: isDarkMode ? mermaidDark : mermaidLight,
    } );

    // If you already have <pre class="mermaid"> blocks in the DOM, 
    // you may need to re-run:
    mermaid.run();
  }, [ theme ] );

  return null;
}
