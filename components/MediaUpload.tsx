import React, { useState } from 'react';
import { createClient } from "@/utils/supabase/client";
import { Button } from '@nextui-org/react';
import { saveFormHeaderMedia } from '@/app/actions/formActions';


interface MediaUploadProps
{
  formId: string; // Pass formId or relevant identifier to save URL in the database
}

export const MediaUpload: React.FC<MediaUploadProps> = ( { formId } ) =>
{
  const supabase = createClient();
  const [ uploading, setUploading ] = useState( false );
  const [ previewFile, setPreviewFile ] = useState<string | null>( null );

  const handleFileChange = async ( e: React.ChangeEvent<HTMLInputElement> ) =>
  {
    const file = e.target.files?.[ 0 ];
    if ( !file ) return;

    // Show image preview
    const reader = new FileReader();
    reader.onloadend = () => setPreviewFile( reader.result as string );
    reader.readAsDataURL( file );

    // Upload to Supabase
    setUploading( true );
    const { data, error } = await supabase.storage
      .from( 'media' )
      .upload( `public/${ file.name }`, file );

    if ( error )
    {
      console.error( 'Error uploading file:', error.message );
      setUploading( false );
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from( 'media' )
      .getPublicUrl( `public/${ file.name }` );

    const publicUrl = publicUrlData?.publicUrl;

    if ( publicUrl )
    {
      // Save the uploaded URL to the database using the server action
      try
      {
        await saveFormHeaderMedia( formId, publicUrl ); // Call server action to save URL
        console.log( 'Image URL saved to database' );
      } catch ( error )
      {
        console.error( 'Error saving image URL to database:', error );
      }
    }

    setUploading( false );
  };

  return (
    <div>
      { previewFile && <img src={ previewFile } alt="Preview" style={ { maxWidth: '100%' } } /> }
      <Button as="label" disabled={ uploading }>
        { uploading ? 'Uploading...' : 'Upload Header Image' }
        <input type="file" onChange={ handleFileChange } style={ { display: 'none' } } />
      </Button>
    </div>
  );
};

export default MediaUpload;
