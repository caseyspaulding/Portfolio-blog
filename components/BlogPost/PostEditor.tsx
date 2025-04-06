import { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import EasyMDE from 'easymde';
import { marked } from 'marked';
import 'easymde/dist/easymde.min.css';
import mermaid from 'mermaid';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { toast } from 'sonner'; // Import toast for notifications

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
  const fileInputRef = useRef<HTMLInputElement>( null );
  const [ isUploading, setIsUploading ] = useState( false );

  // Handle image upload
  const handleImageUpload = async ( file: File ): Promise<string> =>
  {
    try
    {
      setIsUploading( true );

      // Create FormData
      const formData = new FormData();
      formData.append( 'image', file );

      // Send to your API endpoint
      const response = await fetch( '/api/upload-image', {
        method: 'POST',
        body: formData,
      } );

      if ( !response.ok )
      {
        const error = await response.json();
        throw new Error( error.message || 'Image upload failed' );
      }

      const data = await response.json();
      toast.success( 'Image uploaded successfully' );
      return data.imageUrl;
    } catch ( error )
    {
      console.error( 'Failed to upload image:', error );
      toast.error( 'Failed to upload image' );
      throw error;
    } finally
    {
      setIsUploading( false );
    }
  };

  // Triggered when file input changes
  const onFileInputChange = async ( event: React.ChangeEvent<HTMLInputElement> ) =>
  {
    if ( !event.target.files || !event.target.files[ 0 ] ) return;

    try
    {
      const file = event.target.files[ 0 ];
      const imageUrl = await handleImageUpload( file );

      // Insert image markdown at cursor position
      if ( editorRef.current )
      {
        const cm = editorRef.current.codemirror;
        const doc = cm.getDoc();
        const cursor = doc.getCursor();
        const imageMarkdown = `![${ file.name.replace( /\.[^/.]+$/, "" ) }](${ imageUrl })`;
        doc.replaceRange( imageMarkdown, cursor );
      }
    } catch ( error )
    {
      console.error( 'Failed to upload image:', error );
    } finally
    {
      // Reset file input
      if ( fileInputRef.current )
      {
        fileInputRef.current.value = '';
      }
    }
  };

  // Trigger file input click
  const triggerFileUpload = () =>
  {
    if ( fileInputRef.current )
    {
      fileInputRef.current.click();
    }
  };

  // Custom image upload for the toolbar button
  const customImageUpload = () =>
  {
    triggerFileUpload();
  };

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
      "link",
      {
        name: "custom-image",
        action: customImageUpload,
        className: "fa fa-image",
        title: "Insert Image (Upload)",
      },
      "|",
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
    // Enable drag and drop of images
    uploadImage: true,
    imageUploadFunction: async ( file, onSuccess, onError ) =>
    {
      try
      {
        const imageUrl = await handleImageUpload( file );
        onSuccess( imageUrl );
      } catch ( error )
      {
        onError( error instanceof Error ? error.message : String(error) );
      }
    },
  } ), [ setShowDiagramModal ] );

  // Handle editor instance creation
  const getEditorInstance = ( editor: EasyMDE ) =>
  {
    editorRef.current = editor;
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="content">Content</Label>
        <input
          type="file"
          ref={ fileInputRef }
          onChange={ onFileInputChange }
          accept="image/*"
          className="hidden"
        />
        <Button
          size="sm"
          onClick={ triggerFileUpload }
          disabled={ isUploading }
          type="button"
        >
          { isUploading ? 'Uploading...' : 'Upload Image' }
        </Button>
      </div>
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
        Use markdown for formatting. You can add images by dragging them into the editor, clicking the image button, or using the Upload Image button.
      </p>
    </div>
  );
}