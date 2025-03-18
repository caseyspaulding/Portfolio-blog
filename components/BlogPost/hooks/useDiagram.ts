// components/BlogPost/hooks/useDiagrams.ts
import { useState, useEffect } from 'react';
import mermaid from 'mermaid';
import toast from 'react-hot-toast';
import { DiagramData, UseDiagramsResult } from '../types';

export function useDiagrams (
  content: string,
  setContent: React.Dispatch<React.SetStateAction<string>>
): UseDiagramsResult
{
  const [ diagrams, setDiagrams ] = useState<DiagramData[]>( [] );
  const [ showDiagramModal, setShowDiagramModal ] = useState( false );

  // Initialize mermaid
  useEffect( () =>
  {
    mermaid.initialize( {
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      themeVariables: {
        fontSize: '30px',
        fontFamily: 'Arial',
        lineColor: 'gray',
      }
    } );
  }, [] );

  const extractDiagramsFromContent = ( htmlContent: string ): DiagramData[] =>
  {
    const parser = new DOMParser();
    const doc = parser.parseFromString( htmlContent, 'text/html' );
    const diagramElements = doc.querySelectorAll( '.mermaid-diagram' );

    return Array.from( diagramElements ).map( element =>
    {
      const id = element.getAttribute( 'data-diagram-id' ) || crypto.randomUUID();
      const titleElement = element.querySelector( '.diagram-title' );
      const mermaidElement = element.querySelector( '.mermaid' );

      return {
        id,
        type: 'mermaid' as const,
        title: titleElement?.textContent?.trim() || 'Untitled Diagram',
        content: mermaidElement?.textContent?.trim() || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    } );
  };

  const handleDiagramSubmit = ( diagramData: { title: string; content: string } ) =>
  {
    const now = new Date().toISOString();
    const newDiagram: DiagramData = {
      id: crypto.randomUUID(),
      type: 'mermaid',
      content: diagramData.content.trim(),
      title: diagramData.title,
      createdAt: now,
      updatedAt: now
    };

    // Validate diagram syntax before adding
    try
    {
      mermaid.parse( diagramData.content );
      setDiagrams( prev => [ ...prev, newDiagram ] );

      // Insert enhanced placeholder with preview
      const placeholderHtml = `
      <div class="mermaid-diagram" data-diagram-id="${ newDiagram.id }">
        <div class="diagram-header">
          <div class="diagram-title text-lg font-semibold mb-2">${ newDiagram.title }</div>
          <div class="diagram-metadata text-sm text-gray-500">
            Created: ${ new Date( newDiagram.createdAt ).toLocaleDateString() }
          </div>
        </div>
        <pre class="mermaid">
          ${ newDiagram.content }
        </pre>
      </div>
      `;
      setContent( prev => `${ prev }${ placeholderHtml }` );

      // Re-initialize mermaid to render the new diagram
      setTimeout( () =>
      {
        mermaid.init( undefined, document.querySelectorAll( '.mermaid' ) );
      }, 0 );

    } catch ( error )
    {
      toast.error( 'Invalid diagram syntax. Please check your Mermaid code.' );
      console.error( 'Mermaid syntax error:', error );
      return;
    }
  };

  return {
    diagrams,
    showDiagramModal,
    setShowDiagramModal,
    handleDiagramSubmit,
    extractDiagramsFromContent
  };
}