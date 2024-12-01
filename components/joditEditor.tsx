import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

interface BlogPostEditorProps
{
  placeholder?: string;
}

const BlogPostEditor: React.FC<BlogPostEditorProps> = ( { placeholder = 'Start typing your blog post...' } ) =>
{
  // Create a reference for the editor
  const editor = useRef( null );

  // State to hold the editor content
  const [ content, setContent ] = useState( '' );

  // Configuration for the editor
  const config = useMemo(
    () => ( {
      readonly: false, // You can change this to true to make it readonly
      placeholder: placeholder || 'Start typing your blog post...',
    } ),
    [ placeholder ]
  );

  return (
    <div>
      <h2>Blog Post Editor</h2>
      <JoditEditor
        ref={ editor }
        value={ content }
        config={ config }
        onBlur={ ( newContent ) => setContent( newContent ) } // Update content when editor loses focus
        onChange={ ( newContent ) => { } }
      />
    </div>
  );
};

export default BlogPostEditor;
