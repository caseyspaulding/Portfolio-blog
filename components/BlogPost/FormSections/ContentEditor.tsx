// components/BlogPost/FormSections/ContentEditor.tsx
import React, { useMemo } from 'react';
import { Label } from '@/components/ui/label';
import EditorTabs from '../Editor/EditorTabs';
import DiagramModal from '../../DiagramModal';
import { JoditConfig } from '../types';

interface ContentEditorProps
{
  content: string;
  setContent: ( content: string ) => void;
  rawMarkdown: string;
  setRawMarkdown: ( markdown: string | ((prevMarkdown: string) => string) ) => void;
  viewMode: string;
  setViewMode: ( mode: string ) => void;
  showDiagramModal: boolean;
  setShowDiagramModal: ( show: boolean ) => void;
  handleDiagramSubmit: ( diagram: { title: string; content: string } ) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ( {
  content,
  setContent,
  rawMarkdown,
  setRawMarkdown,
  viewMode,
  setViewMode,
  showDiagramModal,
  setShowDiagramModal,
  handleDiagramSubmit
} ) =>
{
  // Editor configuration
  const editorCss = `
    .markdown-preview {
      padding: 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background-color: #ffffff;
    }
    
    .markdown-preview h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    
    .markdown-preview h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      margin-top: 1.5rem;
    }
    
    .markdown-preview h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      margin-top: 1.25rem;
    }
    
    .markdown-preview p {
      margin-bottom: 1rem;
      line-height: 1.6;
    }
    
    .markdown-preview ul, .markdown-preview ol {
      margin-bottom: 1rem;
      padding-left: 1.5rem;
    }
    
    .markdown-preview li {
      margin-bottom: 0.5rem;
    }
    
    .markdown-preview code {
      background-color: #f3f4f6;
      padding: 0.2rem 0.4rem;
      border-radius: 0.25rem;
      font-family: monospace;
    }
    
    .markdown-preview pre {
      background-color: #1e1e1e;
      color: #d4d4d4;
      padding: 1rem;
      border-radius: 0.375rem;
      overflow-x: auto;
      margin-bottom: 1rem;
    }
    
    .markdown-preview pre code {
      background-color: transparent;
      padding: 0;
      color: inherit;
    }
    
    .raw-markdown {
      font-family: monospace;
      background-color: #f3f4f6;
      padding: 1rem;
      border-radius: 0.375rem;
      white-space: pre-wrap;
    }

    .jodit-workplace {
      background-color: #ffffff !important;
    }
    .jodit-wysiwyg {
      background-color: #ffffff !important;
      color: #000000 !important;
    }
    .jodit-toolbar__box {
      background-color: #ffffff !important;
      border-bottom: 1px solid #d1d5db !important;
    }
    .jodit-toolbar-button {
      color: #000000 !important;
    }
    .jodit-toolbar-button:hover {
      background-color: #f3f4f6 !important;
    }
    .jodit-toolbar-button__icon {
      fill: #000000 !important;
    }
    .jodit-status-bar {
      background-color: #ffffff !important;
      border-top: 1px solid #d1d5db !important;
      color: #000000 !important;
    }
    .jodit-wysiwyg pre {
      background: #1e1e1e !important;
      border-radius: 4px !important;
      padding: 15px !important;
      margin: 15px 0 !important;
      overflow-x: auto !important;
    }
    .jodit-wysiwyg code {
      font-family: 'Monaco', 'Consolas', 'Courier New', monospace !important;
      font-size: 14px !important;
      line-height: 1.4 !important;
      color: #d4d4d4 !important;
    }
    .jodit-container {
      border-color: #d1d5db !important;
    }
    .jodit-container:not(.jodit_inline) {
      border: 1px solid #d1d5db !important;
      border-radius: 0.375rem !important;
    }
    .jodit-placeholder {
      color: #6b7280 !important;
    }
    .jodit-wysiwyg table {
      border-collapse: collapse !important;
      width: 100% !important;
    }
    .jodit-wysiwyg table td,
    .jodit-wysiwyg table th {
      border: 1px solid #d1d5db !important;
      padding: 8px !important;
    }
    .jodit-toolbar-button.jodit-toolbar-button_size_middle {
      background-color: transparent !important;
    }
    .jodit-toolbar-button.jodit-toolbar-button_size_middle:hover {
      background-color: #f3f4f6 !important;
    }
    .jodit .jodit-workplace + .jodit-status-bar:not(:empty) {
      border-top: 1px solid #d1d5db !important;
      background-color: #ffffff !important;
    }
    .jodit-dialog__header {
      background-color: #ffffff !important;
      color: #000000 !important;
    }
    .jodit-dialog__content {
      background-color: #ffffff !important;
    }
    .jodit-form__group {
      background-color: #ffffff !important;
    }
    .jodit-input {
      background-color: #ffffff !important;
      color: #000000 !important;
      border: 1px solid #d1d5db !important;
    }
    .jodit-button {
      background-color: #ffffff !important;
      color: #000000 !important;
      border: 1px solid #d1d5db !important;
    }
    .jodit-button:hover {
      background-color: #f3f4f6 !important;
    }
  `;

  const config = useMemo(
    () => ( {
      readonly: false,
      placeholder: 'Start typing your blog post...',
      height: 500,
      enableDragAndDropFileToEditor: true,
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
          exec: ( editor ) =>
          {
            const language = prompt( 'Enter programming language (e.g., javascript, python, typescript):' );
            if ( language )
            {
              const code = `<pre><code class="language-${ language }">\n// Your code here\n</code></pre>`;
              editor.selection.insertHTML( code );
            }
            return false;
          }
        },
        {
          name: 'insertMarkdown',
          icon: 'M↓',
          tooltip: 'Insert Raw Markdown',
          exec: ( editor ) =>
          {
            const markdownText = prompt( 'Enter markdown content:' );
            if ( markdownText )
            {
              const htmlContent = `<div class="raw-markdown" data-markdown="${ encodeURIComponent( markdownText ) }">
                ${ markdownText }
              </div>`;
              editor.selection.insertHTML( htmlContent );
                setRawMarkdown((prevMarkdown: string) => prevMarkdown + '\n' + markdownText);
            }
            return false;
          }
        }
      ],
      events: {
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
      askBeforePasteHTML: false,
      defaultMode: 1,
      removeButtons: [ 'about' ],
      showXPathInStatusbar: false,
      spellcheck: true,
      editorCssClass: 'prose max-w-none',
      style: {
        background: '#ffffff',
        color: '#000000',
      },
      colors: {
        background: [ '#ffffff' ],
        border: [ '#d1d5db' ],
        buttons: [ '#000000' ],
        icons: [ '#000000' ],
        panel: [ '#ffffff' ],
        text: [ '#000000' ],
        textPanels: [ '#000000' ]
      },
      css: editorCss
    } ),
    [ setShowDiagramModal, setRawMarkdown ]
  );

  return (
    <div className="space-y-2">
      <Label htmlFor="content">Content</Label>

      { showDiagramModal && (
        <DiagramModal
          onClose={ () => setShowDiagramModal( false ) }
          onSubmit={ handleDiagramSubmit }
        />
      ) }

      <EditorTabs
        content={ content }
        rawMarkdown={ rawMarkdown }
        viewMode={ viewMode }
        setViewMode={ setViewMode }
        config={ config }
        onContentChange={ setContent }
      />
    </div>
  );
};

export default ContentEditor;