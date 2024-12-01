import React, { useState } from 'react';
import { Button } from '@nextui-org/react';

interface FileUploadButtonProps
{
  setFile: ( file: File | null ) => void;
  previewFile: string | null;
  setPreviewFile: ( fileUrl: string | null ) => void;
  label: string;
  orgName?: string;
  placeholderImage?: string;
  accept?: string;
  buttonText?: string;
  multiple?: boolean;
  maxFileSize?: number; // In bytes
  onUploadComplete?: ( file: File ) => void;
}

export function FileUploadButton ( {
  setFile,
  previewFile,
  setPreviewFile,
  label,
  orgName,
  placeholderImage = '/images/placeholder.png',
  accept = 'image/*',
  buttonText = 'Upload File',
  multiple = false,
  maxFileSize,
  onUploadComplete,
}: FileUploadButtonProps )
{
  const [ error, setError ] = useState<string | null>( null );

  const handleFileChange = ( e: React.ChangeEvent<HTMLInputElement> ) =>
  {
    const files = e.target.files;
    const file = files?.[ 0 ] || null;

    if ( file )
    {
      // File size validation
      if ( maxFileSize && file.size > maxFileSize )
      {
        setError( `File size should be less than ${ maxFileSize / 1024 / 1024 } MB` );
        setFile( null );
        setPreviewFile( null );
        return;
      }

      // Reset error
      setError( null );
      setFile( file );

      // Generate a unique filename if orgName is provided
      const uniqueFilename = orgName
        ? `${ orgName }_${ Date.now() }_${ file.name }`
        : file.name;
      console.log( 'Unique file name:', uniqueFilename );

      const reader = new FileReader();
      reader.onloadend = () =>
      {
        setPreviewFile( reader.result as string );
        if ( onUploadComplete )
        {
          onUploadComplete( file );
        }
      };
      reader.readAsDataURL( file );
    } else
    {
      setFile( null );
      setPreviewFile( null );
    }
  };

  return (
    <div className="relative w-full bg-gray-100 rounded-md overflow-hidden shadow-md">
      {/* Placeholder or Preview Image */ }
      <img
        src={ previewFile || placeholderImage }
        alt="Preview or Placeholder"
        className="w-full h-full object-cover"
      />

      {/* Overlay for Upload Button */ }
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-opacity">
        {/* Label */ }
        <p className="text-white text-lg font-semibold mb-4">{ label }</p>
        {/* Error Message */ }
        { error && <p className="text-red-500 mb-2">{ error }</p> }
        {/* Upload Button */ }
        <Button
          as="label"
          className="bg-blue-700 text-white px-5 py-3 text-xl rounded-md cursor-pointer"
          radius="sm"
        >
          { buttonText }
          <input
            type="file"
            accept={ accept }
            multiple={ multiple }
            onChange={ handleFileChange }
            style={ { display: 'none' } }
          />
        </Button>
      </div>
    </div>
  );
}
