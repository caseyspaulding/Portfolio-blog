'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import toast from 'react-hot-toast';

interface DiagramModalProps
{
  onClose: () => void;
  onSubmit: ( diagram: { title: string; content: string } ) => void;
  initialDiagram?: { title: string; content: string };
}

// Predefined diagram templates
const DIAGRAM_TEMPLATES = {
  flowchart: `graph TD
    A[Start] --> B[Process]
    B --> C{Decision}
    C -->|Yes| D[Result 1]
    C -->|No| E[Result 2]`,
  sequence: `sequenceDiagram
    participant User
    participant System
    User->>System: Action
    System->>User: Response`,
  classDiagram: `classDiagram
    class Example {
      +String data
      +update() void
    }`,
  gantt: `gantt
    title Project Schedule
    section Phase 1
    Task 1: 2024-01-01, 30d
    Task 2: 2024-02-01, 20d`
};

const DiagramModal: React.FC<DiagramModalProps> = ( { onClose, onSubmit, initialDiagram } ) =>
{
  const [ diagram, setDiagram ] = useState( {
    title: initialDiagram?.title || '',
    content: initialDiagram?.content || DIAGRAM_TEMPLATES.flowchart
  } );
  const [ selectedTemplate, setSelectedTemplate ] = useState<keyof typeof DIAGRAM_TEMPLATES>( 'flowchart' );
  const [ previewError, setPreviewError ] = useState<string | null>( null );
  const previewRef = useRef<HTMLDivElement>( null );
  const previewContainerId = useRef( `preview-${ Math.random().toString( 36 ).substr( 2, 9 ) }` );

  // Update the mermaid initialization useEffect
  useEffect( () =>
  {
    mermaid.initialize( {
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'monospace',
      fontSize: 16,
      flowchart: {
        curve: 'basis',
        padding: 15
      }
    } );
  }, [] );

  // Separate useEffect for preview updates
  useEffect( () =>
  {
    const updatePreview = async () =>
    {
      if ( !previewRef.current ) return;

      try
      {
        // Clear previous content and error
        previewRef.current.innerHTML = '';
        setPreviewError( null );

        // Create a new container for this render
        const containerId = `mermaid-${ Date.now() }`;
        const container = document.createElement( 'div' );
        container.id = containerId;
        container.className = 'mermaid';
        container.textContent = diagram.content;
        previewRef.current.appendChild( container );

        // Run mermaid rendering
        await mermaid.run( {
          nodes: [ container ],
          suppressErrors: true
        } );

        // Adjust SVG sizing after render
        const svg = container.querySelector( 'svg' );
        if ( svg )
        {
          svg.style.maxWidth = '100%';
          svg.style.height = 'auto';
          svg.style.display = 'block';
          svg.style.margin = '0 auto';
        }
      } catch ( error )
      {
        console.error( 'Mermaid rendering error:', error );
        setPreviewError( error instanceof Error ? error.message : 'Invalid diagram syntax' );
        previewRef.current.innerHTML = `
        <div class="text-red-500 p-4 bg-red-50 rounded-md">
          Failed to render diagram. Please check your syntax.
        </div>
      `;
      }
    };

    // Debounce the preview update
    const timeoutId = setTimeout( updatePreview, 300 );
    return () =>
    {
      clearTimeout( timeoutId );
      if ( previewRef.current )
      {
        previewRef.current.innerHTML = '';
      }
    };
  }, [ diagram.content ] );

  const handleTemplateChange = ( template: keyof typeof DIAGRAM_TEMPLATES ) =>
  {
    setSelectedTemplate( template );
    setDiagram( prev => ( {
      ...prev,
      content: DIAGRAM_TEMPLATES[ template ]
    } ) );
  };

  const handleSubmit = async () =>
  {
    if ( !diagram.title.trim() )
    {
      toast.error( 'Please enter a title for your diagram' );
      return;
    }

    try
    {
      await mermaid.parse( diagram.content );
      onSubmit( diagram );
      onClose();
      toast.success( 'Diagram inserted successfully!' );
    } catch ( error )
    {
      const errorMessage = error instanceof Error ? error.message : 'Syntax error';
      toast.error( `Invalid diagram syntax: ${ errorMessage }` );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */ }
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Insert Mermaid Diagram</h3>
          <div className="mt-2 flex gap-2">
            { Object.keys( DIAGRAM_TEMPLATES ).map( ( template ) => (
              <button
                key={ template }
                onClick={ () => handleTemplateChange( template as keyof typeof DIAGRAM_TEMPLATES ) }
                className={ `px-3 py-1 text-sm rounded-md ${ selectedTemplate === template
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
                  }` }
              >
                { template.charAt( 0 ).toUpperCase() + template.slice( 1 ) }
              </button>
            ) ) }
          </div>
        </div>

        {/* Modal Body */ }
        <div className="flex-1 overflow-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left side - Input */ }
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diagram Title
              </label>
              <input
                type="text"
                value={ diagram.title }
                onChange={ ( e ) => setDiagram( prev => ( { ...prev, title: e.target.value } ) ) }
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter diagram title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diagram Code
                <a
                  href="https://mermaid.js.org/syntax/flowchart.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-xs text-blue-600 hover:underline"
                >
                  Mermaid Syntax Guide
                </a>
              </label>
              <textarea
                value={ diagram.content }
                onChange={ ( e ) => setDiagram( prev => ( { ...prev, content: e.target.value } ) ) }
                className="w-full h-[400px] px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                placeholder="Enter your Mermaid diagram code here..."
              />
            </div>
          </div>

          {/* Right side - Preview */ }
          <div className="preview-container">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preview
              { previewError && (
                <span className="ml-2 text-xs text-red-500">
                  (Syntax Error)
                </span>
              ) }
            </label>
            <div className="border rounded-md p-4 h-[500px] overflow-auto bg-white">
              { previewError ? (
                <div className="text-red-500 text-sm p-2 bg-red-50 rounded border border-red-100">
                  <p className="font-semibold">Error Details:</p>
                  <p className="mt-1">{ previewError }</p>
                </div>
              ) : (
                <div
                  ref={ previewRef }
                  className="flex items-center justify-center h-full"
                />
              ) }
            </div>
          </div>
        </div>

        {/* Modal Footer */ }
        <div className="p-4 border-t bg-gray-50 flex justify-end space-x-2">
          <button
            onClick={ onClose }
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={ handleSubmit }
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={ !!previewError }
          >
            Insert Diagram
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagramModal;