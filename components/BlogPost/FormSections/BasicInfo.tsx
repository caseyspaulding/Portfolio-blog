// components/BlogPost/Editor/EditorTabs.tsx
import React, { useRef } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // shadcn Tabs
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
      defaultValue={ viewMode }
      onValueChange={ setViewMode }
      className="mb-4"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="editor">Rich Editor</TabsTrigger>
        <TabsTrigger value="markdown">Markdown Preview</TabsTrigger>
        <TabsTrigger value="raw-markdown">Raw Markdown</TabsTrigger>
      </TabsList>

      <TabsContent value="editor">
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
      </TabsContent>

      <TabsContent value="markdown">
        <MarkdownPreview content={ content } />
      </TabsContent>

      <TabsContent value="raw-markdown">
        <div className="rounded-md border border-input p-4">
          <pre className="whitespace-pre-wrap">
            { rawMarkdown || "No markdown content yet. Use the Rich Editor and add markdown with the M↓ button." }
          </pre>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default EditorTabs;