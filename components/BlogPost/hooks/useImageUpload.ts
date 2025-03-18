// components/BlogPost/hooks/useImageUpload.ts
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';
import { UseImageUploadResult } from '../types';

export function useImageUpload (
  postImage: File | null,
  setPostImage: React.Dispatch<React.SetStateAction<File | null>>,
  content: string,
  setContent: React.Dispatch<React.SetStateAction<string>>
): UseImageUploadResult
{
  const supabase = createClient();

  const handleImageUpload = async ( file: File | null ): Promise<string | null> =>
  {
    if ( !file )
    {
      console.error( 'No file selected' );
      return null;
    }

    const fileName = `${ Date.now() }-${ file.name }`;

    const { data, error } = await supabase
      .storage
      .from( 'blogimages' )
      .upload( `public/${ fileName }`, file, {
        cacheControl: '3600',
        upsert: false,
      } );

    if ( error )
    {
      console.error( 'Error uploading file:', error.message );
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from( 'blogimages' )
      .getPublicUrl( `public/${ fileName }` );

    return publicUrl || '';
  };

  const handleBlogPostImageUpload = async () =>
  {
    if ( !postImage )
    {
      toast.error( 'Please select an image to upload.' );
      return;
    }

    const imageUrl = await handleImageUpload( postImage );
    if ( !imageUrl )
    {
      toast.error( 'Failed to upload the image.' );
      return;
    }

    // Insert the image URL into the content
    setContent( ( prevContent ) => `${ prevContent }<img src="${ imageUrl }" alt="Uploaded Image" />` );
    setPostImage( null ); // Clear the selected image
    toast.success( 'Image uploaded and inserted into the content.' );
  };

  return {
    handleImageUpload,
    handleBlogPostImageUpload
  };
}