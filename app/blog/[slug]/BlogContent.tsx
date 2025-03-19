// In your BlogContent.tsx client component
'use client';
import { useEffect } from 'react';
import { marked } from 'marked';
import { markedKatex } from 'marked-katex-extension';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export default function BlogContent ( { htmlContent }: { htmlContent: string } )
{
  useEffect( () =>
  {
    // Initialize mermaid
    mermaid.initialize( {
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose'
    } );

    // Process any mermaid diagrams in the content
    if ( contentRef.current )
    {
      try
      {
        mermaid.contentLoaded();
      } catch ( error )
      {
        console.error( 'Mermaid initialization error:', error );
      }
    }


    // Handle code highlighting
    document.querySelectorAll( 'pre code' ).forEach( ( block ) =>
    {
      hljs.highlightElement( block as HTMLElement );
    } );
  }, [ htmlContent ] );

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed text-lg markdown-content">
      <div ref={ contentRef } dangerouslySetInnerHTML={ { __html: htmlContent } } />
    </div>
  );
}