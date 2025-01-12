// PostEditor.tsx
import { useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Label } from '@/components/ui/label';


// Dynamically import JoditEditor with SSR disabled
const JoditEditor = dynamic( () => import( 'jodit-react' ), {
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
  const editor = useRef( null );

  const config = useMemo(
    () => ( {
      readonly: false,
      placeholder: 'Start typing your blog post...',
      buttons: [
        'source', '|',
        'bold', 'italic', 'underline', '|',
        'ul', 'ol', '|',
        'font', 'fontsize', 'brush', 'paragraph', '|',
        'image', 'table', 'link', '|',
        'left', 'center', 'right', 'justify', '|',
        'undo', 'redo', '|',
        'hr', 'eraser', 'fullsize', '|',
        {
          name: 'insertDiagram',
          icon: '📊',
          tooltip: 'Insert Mermaid Diagram',
          exec: ( _editor: any ) =>
          {
            setShowDiagramModal( true );
            return false;
          }
        },
        {
          name: 'insertCode',
          icon: '⌨️',
          tooltip: 'Insert Code Block',
          exec: ( editor: { selection: { insertHTML: ( arg0: string ) => void; }; } ) =>
          {
            const language = prompt( 'Enter programming language:' );
            if ( language )
            {
              const code = `<pre><code class="language-${ language }">\n// Your code here\n</code></pre>`;
              editor.selection.insertHTML( code );
            }
            return false;
          }
        }
      ],
      events: {
        'insertDiagram.click': () =>
        {
          setShowDiagramModal( true );
          return false;
        },
        'change': () =>
        {
          if ( typeof window !== 'undefined' )
          {
            setTimeout( () =>
            {
              ( window as any ).Prism.highlightAll();
            }, 0 );
          }
        }
      },
      css: `
                .jodit-wysiwyg pre {
                    background: #1e1e1e;
                    border-radius: 4px;
                    padding: 15px;
                    margin: 15px 0;
                    overflow-x: auto;
                }
                .jodit-wysiwyg code {
                    font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
                    font-size: 14px;
                    line-height: 1.4;
                    color: #d4d4d4;
                }
            `
    } ),
    []
  );

  return (
    <div className="space-y-2">
      <Label htmlFor="content">Content</Label>
      <div className="rounded-md border border-input">
        <JoditEditor
          ref={ editor }
          value={ content }
          config={ {
            ...config,
            theme: 'dark',
            style: {
              background: 'var(--background)',
              color: 'var(--foreground)'
            },
            colors: {
              background: [ 'var(--background)' ],
              border: [ 'var(--border)' ],
              buttons: [ 'var(--primary)' ],
              icons: [ 'var(--foreground)' ],
              panel: [ 'var(--card)' ],
              text: [ 'var(--foreground)' ],
              textPanels: [ 'var(--foreground)' ]
            }
          } }
          onBlur={ ( newContent ) => setContent( newContent ) }
        />
      </div>
    </div>
  );
}
