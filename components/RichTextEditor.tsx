'use client';

import React, { useCallback, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient( supabaseUrl, supabaseAnonKey );

interface RichTextEditorProps
{
  value: string;
  onChange: ( content: string ) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ( { value, onChange } ) =>
{
  const quillRef = useRef<ReactQuill>( null );

  const imageHandler = useCallback( () =>
  {
    const input = document.createElement( 'input' );
    input.setAttribute( 'type', 'file' );
    input.setAttribute( 'accept', 'image/*' );
    input.click();

    input.onchange = async () =>
    {
      const file = input.files?.[ 0 ];
      if ( !file ) return;

      try
      {
        // Upload file to Supabase Storage
        const { data, error } = await supabase.storage
          .from( 'images' )
          .upload( `blog-images/${ Date.now() }-${ file.name }`, file );

        if ( error ) throw error;

        // Get public URL of the uploaded image
        const { publicUrl } = supabase.storage
          .from( 'images' )
          .getPublicUrl( data.path )
          .data;

        // Insert image into editor
        const quill = quillRef.current?.getEditor();
        const range = quill?.getSelection( true );
        if ( quill && range )
        {
          quill.insertEmbed( range.index, 'image', publicUrl ?? '' );
        }
      } catch ( error )
      {
        console.error( 'Error uploading image: ', error );
        alert( 'There was an error uploading your image. Please try again.' );
      }
    };
  }, [] );

  const modules = {
    toolbar: {
      container: [
        [ { header: [ 1, 2, false ] } ],
        [ 'bold', 'italic', 'underline', 'strike', 'blockquote' ],
        [ { list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' } ],
        [ 'link', 'image' ],
        [ 'clean' ]
      ],
      handlers: {
        image: imageHandler
      }
    }
  };

  return (
    <ReactQuill
      ref={ quillRef }
      theme="snow"
      value={ value }
      onChange={ onChange }
      modules={ modules }
    />
  );
};

export default RichTextEditor;
