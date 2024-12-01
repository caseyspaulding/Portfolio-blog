'use client';

import { useState } from 'react';
import * as QRCode from 'qrcode'; // Import the 'qrcode' package
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { TextArea } from './TextArea';
import { Button } from '@nextui-org/button';

export default function BulkQRCodeGenerator ()
{
  const [ state, setState ] = useState<{ [ key: string ]: any }>( {} );
  const [ bulkData, setBulkData ] = useState<string>( '' );
  const [ isGenerating, setIsGenerating ] = useState<boolean>( false );

  // Handle bulk input changes
  const handleBulkChange = ( target: unknown ) =>
  {
    if ( target && typeof target === 'object' && 'value' in target )
    {
      setBulkData( ( target as HTMLTextAreaElement ).value );
    }
  };

  // Bulk QR code generation and download
  const handleBulkGenerate = async () =>
  {
    setIsGenerating( true );
    const zip = new JSZip();
    const dataArray = bulkData.split( '\n' ).filter( ( item ) => item.trim() );

    for ( const data of dataArray )
    {
      try
      {
        // Create a temporary canvas
        const canvas = document.createElement( 'canvas' );
        canvas.width = 200; // Set the width of the canvas
        canvas.height = 200; // Set the height of the canvas

        // Generate the QR code onto the canvas
        await QRCode.toCanvas( canvas, data, {
          width: 200,
          color: {
            dark: state.fgColor || '#000000',
            light: state.bgColor || '#ffffff',
          },
        } );

        // Convert the canvas to a data URL
        const base64Data = canvas.toDataURL( 'image/png' ).split( ',' )[ 1 ];
        zip.file( `${ data }.png`, base64Data, { base64: true } );
      } catch ( error )
      {
        console.error( `Failed to generate QR code for ${ data }:`, error );
      }
    }

    zip.generateAsync( { type: 'blob' } ).then( ( blob ) =>
    {
      saveAs( blob, 'bulk-qrcodes.zip' );
      setIsGenerating( false );
    } );
  };

  return (
    <>
      <div className='mx-auto max-w-7xl px-6 pb-2 sm:pt-14 lg:px-8 lg:pt-1'>
        <div className='app mt-10 flex justify-center items-center '>
          <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Free QR Code Generator
          </h1>
        </div>

        {/* Bulk QR Code Generator Section */ }
        <div className="w-full mt-6 p-4">
          <h2 className="text-2xl font-extrabold text-center bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Bulk QR Code Generator
          </h2>
          <TextArea
            name="bulkData"
            label="Bulk Data Input"
            handleChange={ handleBulkChange }
            placeholder="Enter multiple lines of text, each line will generate a separate QR code"
            rows={ 5 }
          />
          <Button
            type="button"
            onClick={ handleBulkGenerate }
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-3xl"
            disabled={ isGenerating }
          >
            { isGenerating ? 'Generating...' : 'Generate Bulk QR Codes' }
          </Button>
        </div>

        {/* Other UI Elements (e.g., Inputs for customizing QR code) */ }
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
          {/* Your existing components like InputField, SelectField, etc. */ }
        </div>
      </div>
    </>
  );
}
