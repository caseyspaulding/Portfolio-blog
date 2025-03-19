import { useEffect, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Label } from '@/components/ui/label';
import EasyMDE from 'easymde';
import { marked } from 'marked';
import 'easymde/dist/easymde.min.css';
import mermaid from 'mermaid';
import hljs from 'highlight.js';
//import 'highlight.js/lib/languages/csharp';
//import 'highlight.js/styles/vs2015.css';
//import 'highlight.js/lib/languages/typescript';
import 'highlight.js/styles/github.css';
//import 'highlight.js/styles/atom-one-dark.css'; 

// Dynamically import SimpleMDE with SSR disabled
const SimpleMDE = dynamic( () => import( 'react-simplemde-editor' ), {
  ssr: false,
} );

interface PostEditorProps
{
  content: string;
  setContent: ( content: string ) => void;
  setShowDiagramModal: ( show: boolean ) => void;
}

export function PostEditor ( { content, setContent, setShowDiagramModal }: PostEditorProps )
{
  const editorRef = useRef<EasyMDE | null>( null );
  // Add this to your editor initialization
  useEffect( () =>
  {
    // Initialize highlight.js
    hljs.configure( {
      languages: [ 'javascript', 'typescript', 'csharp', 'css', 'html' ]
    } );

    // Force re-highlight when content changes
    if ( content )
    {
      setTimeout( () =>
      {
        document.querySelectorAll( 'pre code' ).forEach( ( block ) =>
        {
          hljs.highlightElement( block as HTMLElement );
        } );
      }, 100 );
    }
  }, [ content ] );
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

    return () =>
    {
      // Cleanup when component unmounts
      if ( editorRef.current )
      {
        editorRef.current = null;
      }
    };
  }, [] );

  // Configuration for SimpleMDE - use useMemo to prevent recreating on each render
  const editorOptions = useMemo<EasyMDE.Options>( () => ( {
    autofocus: false,
    spellChecker: false,
    toolbar: [
      "bold", "italic", "heading", "|",
      "quote", "unordered-list", "ordered-list", "|",
      "link", "image", "|",
      "code", "table", "|",
      {
        name: "custom-diagram",
        action: () =>
        {
          setShowDiagramModal( true );
        },
        className: "fa fa-project-diagram",
        title: "Insert Mermaid Diagram",
      },
      "|",
      "preview", "side-by-side", "fullscreen", "|",
      "guide"
    ],
    renderingConfig: {
      codeSyntaxHighlighting: true,
    },
    previewRender: function ( plainText )
    {
      const html = marked.parse( plainText, { async: false } ) as string;

      // Use RAF instead of setTimeout for better performance
      requestAnimationFrame( () =>
      {
        // Initialize mermaid diagrams in the preview if needed
        if ( typeof mermaid !== 'undefined' )
        {
          document.querySelectorAll( '.editor-preview .mermaid' ).forEach( ( el ) =>
          {
            try
            {
              mermaid.init( undefined, el as HTMLElement );
            } catch ( e )
            {
              console.error( 'Mermaid init error:', e );
            }
          } );
        }
        // Re-highlight code blocks with Prism if needed
        if ( typeof window !== 'undefined' && ( window as any ).Prism )
        {
          try
          {
            ( window as any ).Prism.highlightAllUnder( document.querySelector( '.editor-preview' ) );
          } catch ( e )
          {
            console.error( 'Prism highlight error:', e );
          }
        }
      } );

      return html;
    },
  } ), [ setShowDiagramModal ] );

  // Handle editor instance creation
  const getEditorInstance = ( editor: EasyMDE ) =>
  {
    editorRef.current = editor;
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="content">Content</Label>
      <div className="border border-input rounded-md overflow-hidden">
        <SimpleMDE
          value={ content }
          onChange={ ( value ) =>
          {
            // Prevent unnecessary re-renders
            if ( value !== content )
            {
              setContent( value );
            }
          } }
          options={ editorOptions }
          getMdeInstance={ getEditorInstance } // This is the correct prop name
        />
      </div>
      <p className="text-sm text-gray-500">
        Use markdown for formatting. For code blocks, use triple backticks followed by the language name: <code>```javascript</code>
      </p>
    </div>
  );
}