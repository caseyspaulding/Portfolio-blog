import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

interface FileUploadButtonFeedbackProps
{
  setImageUrl: ( url: string | null ) => void;
  label: string;
  orgName: string; // New prop for the organization name or ID
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
      // Generate a unique filename using orgName and a timestamp
      const uniqueFilename = `${ orgName }_${ Date.now() }_${ file.name }`;
      setUploading( true );
      setUploadMessage( null ); // Clear previous messages

      // Show preview while uploading
      const reader = new FileReader();
      reader.onloadend = () =>
      {
        setPreviewImage( reader.result as string );
      };
      reader.readAsDataURL( file );

      // Create Supabase client and upload file
      const supabase = createClient();
      const { data, error } = await supabase.storage
        .from( 'feedback' )
        .upload( uniqueFilename, file );

      setUploading( false );

      if ( error )
      {
        console.error( 'Error uploading file:', error.message );
        setImageUrl( null ); // Set to null on error
        setUploadMessage( 'Error uploading file. Please try again.' );
        setPreviewImage( null ); // Remove preview on error
      } else
      {
        // Get the public URL of the uploaded file
        const { data: publicUrlData } = supabase.storage
          .from( 'feedback' )
          .getPublicUrl( uniqueFilename );

        const imageUrl = publicUrlData?.publicUrl || null;
        setImageUrl( imageUrl );
        setPreviewImage( imageUrl ); // Set preview image URL after upload
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
      <Button
        as="label"
        className="bg-blue-700 text-white px-5 py-3 text-lg rounded-md cursor-pointer"
        radius="sm"
        disabled={ uploading }
      >
        { uploading ? 'Uploading...' : label }
        <input
          type="file"
          accept="image/*"
          onChange={ handleFileChange }
          style={ { display: 'none' } }
        />
      </Button>
      { uploadMessage && <p className="mt-2 text-sm text-gray-600">{ uploadMessage }</p> }
      { previewImage && (
        <div className="mt-4">
          <img src={ previewImage } alt="Uploaded preview" className="w-48 h-48 object-cover rounded-md" />
        </div>
      ) }
    </div>
  );
}
