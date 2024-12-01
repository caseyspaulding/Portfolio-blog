'use client';

import { useEffect, useRef, useState } from 'react';

declare global
{
  interface Window
  {
    initMap: () => void;
  }
}

export default function EventMap ()
{
  const mapRef = useRef<HTMLDivElement | null>( null );
  const inputRef = useRef<HTMLInputElement | null>( null );
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>( null );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ isLoaded, setIsLoaded ] = useState( false );

  useEffect( () =>
  {
    // Define initMap globally on window object
    window.initMap = () =>
    {
      if ( mapRef.current && inputRef.current )
      {
        const map = new google.maps.Map( mapRef.current as HTMLElement, {
          center: { lat: 40.749933, lng: -73.98633 },
          zoom: 13,
          mapTypeControl: false,
        } );

        autocompleteRef.current = new google.maps.places.Autocomplete( inputRef.current as HTMLInputElement );
        autocompleteRef.current.bindTo( 'bounds', map );

        const marker = new google.maps.Marker( {
          map,
        } );

        autocompleteRef.current.addListener( 'place_changed', () =>
        {
          const place = autocompleteRef.current!.getPlace();

          if ( !place.geometry || !place.geometry.location )
          {
            console.error( 'No details available for input: ' + place.name );
            return;
          }

          if ( place.geometry.viewport )
          {
            map.fitBounds( place.geometry.viewport );
          } else
          {
            map.setCenter( place.geometry.location );
            map.setZoom( 17 );
          }

          marker.setPosition( place.geometry.location );
          marker.setVisible( true );
        } );

        setIsLoaded( true );
      }
    };

    // Check if the script is already loaded
    if ( !document.querySelector( 'script[src*="maps.googleapis.com"]' ) )
    {
      const script = document.createElement( 'script' );
      script.src = `https://maps.googleapis.com/maps/api/js?key=${ process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }&callback=initMap&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild( script );

      script.onerror = () =>
      {
        console.error( 'Google Maps failed to load.' );
      };
    } else
    {
      // If script is already loaded, call initMap directly
      window.initMap();
    }

    return () =>
    {
      // Clean up script
      const script = document.querySelector( 'script[src*="maps.googleapis.com"]' );
      if ( script )
      {
        document.head.removeChild( script );
      }
    };
  }, [] );

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-0 left-0 z-10 p-4 bg-white shadow-lg rounded-lg">
        <p className="text-lg font-bold mb-2">Search for a place here:</p>
        <input ref={ inputRef } type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter a location" />
      </div>
      <div ref={ mapRef } className="w-full h-full"></div>
    </div>
  );
}
