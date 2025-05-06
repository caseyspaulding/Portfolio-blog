import React, { useRef, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // shadcn Tabs
import { Button } from "@/components/ui/button"; // shadcn Button
import JoditEditor from 'jodit-react';
import MarkdownPreview from './MarkdownPreview';
import { JoditConfig } from '../types';

interface EditorTabsProps
{
  content: string;
  rawMarkdown: string;
  viewMode: string;
  setViewMode: ( mode: string ) => void;
  config: JoditConfig;
  onContentChange: ( newContent: string ) => void;
  onImageUpload?: ( file: File ) => Promise<string>;
}

const EditorTabs: React.FC<EditorTabsProps> = ( {
  content,
  rawMarkdown,
  viewMode,
  setViewMode,
  config,
  onContentChange,
  onImageUpload
} ) =>
{
  const editor = useRef( null );
  const fileInputRef = useRef<HTMLInputElement>( null );
  const [ isUploading, setIsUploading ] = useState( false );

  // Handle image upload
  const handleImageUpload = async ( event: React.ChangeEvent<HTMLInputElement> ) =>
  {
    if ( !event.target.files || !event.target.files[ 0 ] || !onImageUpload ) return;

    try
    {
      setIsUploading( true );
      const file = event.target.files[ 0 ];
      const imageUrl = await onImageUpload( file );

      // Insert image markdown into the editor
      const imageMarkdown = `![${ file.name }](${ imageUrl })`;
      const newContent = content + '\n' + imageMarkdown;
      onContentChange( newContent );
    } catch ( error )
    {
      console.error( 'Failed to upload image:', error );
    } finally
    {
      setIsUploading( false );
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

  // Update JoditConfig to include image upload button
  const extendedConfig = {
    ...config,
    buttons: [
      ...( ( config.buttons as string[] ) || [] ),
      'image'
    ]
  };

  return (
    <div>
      {/* Image upload button outside tabs */ }
      <div className="mb-2 flex justify-end">
        <input
          type="file"
          ref={ fileInputRef }
          onChange={ handleImageUpload }
          accept="image/*"
          className="hidden"
        />
        <Button
          onClick={ triggerFileUpload }
          disabled={ isUploading }
          size="sm"
        >
          { isUploading ? 'Uploading...' : 'Add Image' }
        </Button>
      </div>

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
              config={ extendedConfig }
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
    </div>
  );
};

export default EditorTabs;