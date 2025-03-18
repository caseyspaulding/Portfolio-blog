// components/BlogPost/Editor/EditorTabs.tsx
import React, { useRef } from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import JoditEditor from 'jodit-react';

import { JoditConfig } from '../types';
import MarkdownPreview from '../Editor/MarkdownPreview';

interface EditorTabsProps
{
  content: string;
  rawMarkdown: string;
  viewMode: string;
  setViewMode: ( mode: string ) => void;
  config: JoditConfig;
  onContentChange: ( newContent: string ) => void;
}

const EditorTabs: React.FC<EditorTabsProps> = ( {
  content,
  rawMarkdown,
  viewMode,
  setViewMode,
  config,
  onContentChange
} ) =>
{
  const editor = useRef( null );

  return (
    <Tabs
      aria-label="Editor Options"
      selectedKey={ viewMode }
      onSelectionChange={ ( key ) => setViewMode( key as string ) }
      className="mb-4"
    >
      <Tab key="editor" title="Rich Editor">
        <div className="rounded-md border border-input">
          <JoditEditor
            ref={ editor }
            value={ content }
            config={ config }
            onBlur={ ( newContent ) =>
            {
              if ( newContent !== content )
              {
                onContentChange( newContent );
              }
            } }
          />
        </div>
      </Tab>
      <Tab key="markdown" title="Markdown Preview">
        <MarkdownPreview content={ content } />
      </Tab>
      <Tab key="raw-markdown" title="Raw Markdown">
        <div className="rounded-md border border-input p-4">
          <pre className="whitespace-pre-wrap">
            { rawMarkdown || "No markdown content yet. Use the Rich Editor and add markdown with the M↓ button." }
          </pre>
        </div>
      </Tab>
    </Tabs>
  );
};

export default EditorTabs;