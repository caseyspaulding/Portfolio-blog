// components/NovelEditor.tsx
import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';

interface NovelEditorProps
{
  content: string;
  setContent: ( content: string ) => void;
}

const NovelEditor: React.FC<NovelEditorProps> = ( { content, setContent } ) =>
{
  const editor = useEditor( {
    extensions: [ StarterKit, Image.configure( {
      inline: true,
      allowBase64: true,
    } ) ],
    content: content,
    onUpdate: ( { editor } ) =>
    {
      const html = editor.getHTML();
      setContent( html );
    },
  } );

  return (
    <div className="border p-2 rounded">
      <EditorContent editor={ editor } />
    </div>
  );
};

export default NovelEditor;
