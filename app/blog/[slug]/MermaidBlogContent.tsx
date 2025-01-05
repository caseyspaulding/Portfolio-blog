'use client';

import { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';

export default function MermaidBlogContent ( { rawHtml }: { rawHtml: string } )
{
  const [ html, setHtml ] = useState( '' );

  useEffect( () =>
  {
    // 1. Re-sanitize with the more-permissive config
    const config = {
      ADD_TAGS: [
        'svg', 'path', 'g', 'text', 'tspan', 'marker', 'polygon', 'rect'
      ],
      ADD_ATTR: [
        'viewBox', 'fill', 'stroke', 'transform', // <— sometimes needed
        'd', 'dx', 'dy', 'x', 'y',
        'font-family', 'font-size', 'text-anchor', 'style',
        'markerHeight', 'markerWidth', 'refX', 'refY',
      ],
    };
    const safeHtml = DOMPurify.sanitize( rawHtml, config );
    setHtml( safeHtml );
  }, [ rawHtml ] );

  useEffect( () =>
  {
    // 2. Re-initialize Mermaid in the browser once `html` is rendered
    mermaid.initialize( {
      startOnLoad: true,
      theme: 'default', // or 'dark'
      securityLevel: 'loose',
    } );
    // This will parse all <pre class="mermaid"> blocks and convert them to <svg>
    mermaid.run();
  }, [ html ] );

  return <div className="prose dark:prose-invert">{ parse( html ) }</div>;
}
