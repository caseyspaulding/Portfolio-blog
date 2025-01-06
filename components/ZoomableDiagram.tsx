import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface ZoomableDiagramProps {
  content: string;
  title?: string;
}

const ZoomableDiagram: React.FC<ZoomableDiagramProps> = ({ content, title }) =>
{
  const [ isZoomed, setIsZoomed ] = useState( false );
  const diagramRef = useRef<HTMLDivElement>( null );
  const containerId = useRef( `mermaid-${ Math.random().toString( 36 ).substr( 2, 9 ) }` );

  useEffect( () =>
  {
    const renderDiagram = async () =>
    {
      if ( !diagramRef.current ) return;

      try
      {
        diagramRef.current.innerHTML = '';
        const container = document.createElement( 'div' );
        container.id = containerId.current;
        container.className = 'mermaid';
        container.textContent = content;
        diagramRef.current.appendChild( container );

        await mermaid.run( {
          nodes: [ container ],
          suppressErrors: true
        } );

        // Adjust SVG after render
        const svg = container.querySelector( 'svg' );
        if ( svg )
        {
          svg.style.maxWidth = '100%';
          svg.style.height = 'auto';
        }
      } catch ( error )
      {
        console.error( 'Mermaid rendering error:', error );
      }
    };

    renderDiagram();
  }, [ content ] );

  return (
    <div className="relative diagram-container">
      <div
        ref={ diagramRef }
        className={ `cursor-pointer transition-transform duration-300 ${ isZoomed ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900 p-4 overflow-auto' : ''
          }` }
        onClick={ () => setIsZoomed( !isZoomed ) }
      />
      { title && (
        <div className="text-center mt-2 text-sm text-gray-600 dark:text-gray-300">
          { title }
        </div>
      ) }
      { isZoomed && (
        <button
          onClick={ () => setIsZoomed( false ) }
          className="fixed top-4 right-4 z-50 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      ) }
    </div>
  );
};

export default ZoomableDiagram;