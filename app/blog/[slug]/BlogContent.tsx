'use client';

import React, { useEffect } from 'react';
import hljs from 'highlight.js';

export default function BlogContent ( { htmlContent }: { htmlContent: string } )
{
  useEffect( () =>
  {
    document.querySelectorAll( 'pre code' ).forEach( ( block ) =>
    {
      hljs.highlightElement( block as HTMLElement );
    } );
  }, [ htmlContent ] );

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed text-lg markdown-content">
      <div dangerouslySetInnerHTML={ { __html: htmlContent } } />
    </div>
  );
}