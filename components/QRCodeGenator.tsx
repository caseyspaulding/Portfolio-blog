'use client';

import React, { useState, useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';

const QRCodeGenerator = () =>
{
  const [ inputValue, setInputValue ] = useState( '' );
  const qrRef = useRef<HTMLDivElement>( null );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const downloadQRCode = async () =>
  {
    const svgElement = qrRef.current?.querySelector( 'svg' );
    if ( svgElement )
    {
      const svgString = new XMLSerializer().serializeToString( svgElement );

      try
      {
        const response = await fetch( '/api/convertSvgToPng', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( { svg: svgString } ),
        } );

        if ( response.ok )
        {
          const blob = await response.blob();
          const url = window.URL.createObjectURL( blob );
          const a = document.createElement( 'a' );
          a.href = url;
          a.download = 'qrcode.png';
          document.body.appendChild( a );
          a.click();
          document.body.removeChild( a );
        } else
        {
          console.error( 'Error converting SVG to PNG' );
        }
      } catch ( error )
      {
        console.error( 'Error downloading QR Code', error );
      }
    }
  };

  return (
    <div style={ { textAlign: 'center', marginTop: '50px' } }>
      <h1>FREE - QR Code Generator</h1>
      <input
        className="outline"
        type="text"
        placeholder="Enter text or URL"
        value={ inputValue }
        onChange={ ( e ) => setInputValue( e.target.value ) }
        style={ { padding: '10px', width: '300px' } }
      />
      <div className="text-center" style={ { textAlign: 'center', marginTop: '20px' } } ref={ qrRef }>
        { inputValue && (
          <QRCode value={ inputValue } size={ 256 }  />
        ) }

        <QRCode value={ inputValue } />
      </div>

    </div>
  );
};

export default QRCodeGenerator;
