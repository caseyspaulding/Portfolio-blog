'use client';

import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import { Button } from '@nextui-org/button';

interface QrCodeScannerProps
{
  qrCodeSuccessCallback: ( decodedText: string ) => void;
  onError?: ( error: unknown ) => void;
}

export default function QrCodeScanner ( { qrCodeSuccessCallback, onError }: QrCodeScannerProps )
{
  const videoRef = useRef<HTMLVideoElement>( null );
  const qrScannerRef = useRef<QrScanner | null>( null );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ scanResult, setScanResult ] = useState<string | null>( null );
  const [ cameraList, setCameraList ] = useState<QrScanner.Camera[]>();
  const [ selectedCamera, setSelectedCamera ] = useState<string>( 'environment' );
  const [ isFlashOn, setIsFlashOn ] = useState<boolean>( false );
  const [ isScanning, setIsScanning ] = useState<boolean>( false );
  const fileInputRef = useRef<HTMLInputElement>( null );

  useEffect( () =>
  {
    if ( !videoRef.current ) return;

    const qrScanner = new QrScanner(
      videoRef.current,
      ( result ) =>
      {
        setScanResult( result.data );
        qrCodeSuccessCallback( result.data );
        qrScanner.pause();
        setTimeout( () =>
        {
          qrScanner.start();
        }, 1000 );
        console.log( 'QR Code detected:', result );
      },
      {
        onDecodeError: ( error ) =>
        {
          if ( error !== 'No QR code found' )
          {
            console.error( 'QR Code scanning error:', error );
            if ( onError ) onError( error );
          }
        },
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    qrScannerRef.current = qrScanner;

    QrScanner.listCameras( true ).then( ( cameras ) =>
    {
      setCameraList( cameras );
      if ( cameras.length > 0 )
      {
        setSelectedCamera( cameras[ 0 ].id );
        qrScanner.setCamera( cameras[ 0 ].id );
      }
    } );

    const handleBeforeUnload = () =>
    {
      if ( qrScannerRef.current )
      {
        qrScannerRef.current.destroy();
        qrScannerRef.current = null;
      }
    };
    window.addEventListener( 'beforeunload', handleBeforeUnload );

    return () =>
    {
      window.removeEventListener( 'beforeunload', handleBeforeUnload );
    };
  }, [ qrCodeSuccessCallback, onError ] );

  const handleToggleScan = async () =>
  {
    if ( isScanning )
    {
      qrScannerRef.current?.stop();
      setIsScanning( false );
    } else
    {
      qrScannerRef.current?.start();
      setIsScanning( true );
    }
  };

  const handleCameraChange = async ( event: React.ChangeEvent<HTMLSelectElement> ) =>
  {
    const cameraId = event.target.value;
    setSelectedCamera( cameraId );

    if ( qrScannerRef.current )
    {
      await qrScannerRef.current.stop();
      await qrScannerRef.current.setCamera( cameraId );
      await qrScannerRef.current.start();
      setIsScanning( true );
    }
  };

  const toggleFlash = async () =>
  {
    if ( qrScannerRef.current )
    {
      if ( isFlashOn )
      {
        await qrScannerRef.current.turnFlashOff();
        setIsFlashOn( false );
      } else
      {
        await qrScannerRef.current.turnFlashOn();
        setIsFlashOn( true );
      }
    }
  };

  const handleFileScan = async ( event: React.ChangeEvent<HTMLInputElement> ) =>
  {
    const file = event.target.files?.[ 0 ];
    if ( file )
    {
      try
      {
        const result = await QrScanner.scanImage( file );
        setScanResult( result );
        qrCodeSuccessCallback( result );
        console.log( 'QR Code detected:', result );
      } catch ( e )
      {
        console.error( 'Failed to scan the image:', e );
        if ( onError ) onError( e );
      }
    }
  };

  const handleButtonClick = () =>
  {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center p-1">
      <div
        className="mt-4 w-full max-w-md rounded-2xl relative z-0 overflow-hidden"
        style={ { paddingBottom: '100%' } }
      >
        { !isScanning && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-500 text-white z-0">
            {/* Lowered z-index */ }
            <div className="text-center mb-4">
              <img src="/images/QRCODE.jpg" alt="Scanning Placeholder" className="" />
              <p>Ready to Scan</p>
            </div>
          </div>
        ) }
        <video
          ref={ videoRef }
          className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl z-0"
        ></video>
        {/* Lowered z-index */ }
        <div className="qr-scanner-overlay">
          <div className="qr-scan-region"></div>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4 mt-6 w-full">
        {/* Stacking the buttons for both small and large screens */ }
        <div className="w-full flex flex-col items-center space-y-4">
          <select
            onChange={ handleCameraChange }
            value={ selectedCamera }
            className="p-2 border rounded-md w-full"
          >
            { cameraList &&
              cameraList.map( ( camera ) => (
                <option key={ camera.id } value={ camera.id }>
                  { camera.label }
                </option>
              ) ) }
          </select>
          <Button
            onClick={ handleToggleScan }
            className={ `px-4 py-2 w-full rounded-3xl ${ isScanning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              } text-white text-xl` }
          >
            { isScanning ? 'Stop Scanning' : 'Start Scanning' }
          </Button>
          <Button
            onClick={ toggleFlash }
            className="px-4 py-2 w-full bg-blue-500 text-white rounded-3xl text-lg hover:bg-blue-600"
          >
            Flash: { isFlashOn ? 'On' : 'Off' }
          </Button>
        </div>

        {/* Another stack of buttons for Upload */ }
        <div className="w-full flex flex-col items-center space-y-4">
          {/*<Button
            onClick={ handleButtonClick }
            className="px-4 py-2 w-full bg-blue-500 text-white rounded-3xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Upload QR Code Image
          </Button>*/}
          <input
            type="file"
            ref={ fileInputRef }
            onChange={ handleFileScan }
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
