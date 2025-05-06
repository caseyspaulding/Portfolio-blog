import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

interface FileUploadButtonFeedbackProps
{
  setImageUrl: ( url: string | null ) => void;
  label: string;
  orgName: string;
}

export function FileUploadButtonFeedback ( {
  setImageUrl,
  label,
  orgName,
}: FileUploadButtonFeedbackProps )
{
  const [ uploading, setUploading ] = useState( false );
  const [ previewImage, setPreviewImage ] = useState<string | null>( null );
  const [ uploadMessage, setUploadMessage ] = useState<string | null>( null );

  const handleFileChange = async ( e: React.ChangeEvent<HTMLInputElement> ) =>
  {
    const file = e.target.files?.[ 0 ] || null;

    if ( file )
    {
      const uniqueFilename = `${ orgName }_${ Date.now() }_${ file.name }`;
      setUploading( true );
      setUploadMessage( null );

      const reader = new FileReader();
      reader.onloadend = () =>
      {
        setPreviewImage( reader.result as string );
      };
      reader.readAsDataURL( file );

      const supabase = createClient();
      const { data, error } = await supabase.storage
        .from( 'feedback' )
        .upload( uniqueFilename, file );

      setUploading( false );

      if ( error )
      {
        console.error( 'Error uploading file:', error.message );
        setImageUrl( null );
        setUploadMessage( 'Error uploading file. Please try again.' );
        setPreviewImage( null );
      } else
      {
        const { data: publicUrlData } = supabase.storage
          .from( 'feedback' )
          .getPublicUrl( uniqueFilename );

        const imageUrl = publicUrlData?.publicUrl || null;
        setImageUrl( imageUrl );
        setPreviewImage( imageUrl );
        setUploadMessage( 'File uploaded successfully.' );
      }
    } else
    {
      setPreviewImage( null );
      setImageUrl( null );
      setUploadMessage( null );
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <Button
          className="bg-blue-700 text-white px-5 py-3 text-lg rounded-md cursor-pointer"
          disabled={ uploading }
        >
          { uploading ? 'Uploading...' : label }
        </Button>
        <input
          type="file"
          accept="image/*"
          onChange={ handleFileChange }
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
      </div>
      { uploadMessage && <p className="mt-2 text-sm text-gray-600">{ uploadMessage }</p> }
      { previewImage && (
        <div className="mt-4">
          <img src={ previewImage } alt="Uploaded preview" className="w-48 h-48 object-cover rounded-md" />
        </div>
      ) }
    </div>
  );
}