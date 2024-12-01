"use client";

import { useState, useEffect } from 'react';

function useGeolocation ( address: string )
{
  const [ coordinates, setCoordinates ] = useState<{ lat: number; lng: number } | null>( null );
  const [ loading, setLoading ] = useState( true );
  const [ error, setError ] = useState<string | null>( null );

  // Default coordinates (e.g., San Francisco)
  const defaultCoordinates = { lat: 28.538336, lng: -81.379234 };

  useEffect( () =>
  {
    // If no address is provided, use default coordinates
    if ( !address )
    {
      setCoordinates( defaultCoordinates );
      setLoading( false );
      return;
    }

    // Function to load Google Maps API script
    const loadGoogleMapsScript = () =>
    {
      return new Promise<void>( ( resolve, reject ) =>
      {
        if ( window.google && window.google.maps )
        {
          resolve(); // If already loaded, resolve immediately
          return;
        }

        // Check if the script is already added
        if ( document.querySelector( `script[src="https://maps.googleapis.com/maps/api/js?key=${ process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }"]` ) )
        {
          resolve(); // If script tag already exists, resolve immediately
          return;
        }

        const script = document.createElement( 'script' );
        script.src = `https://maps.googleapis.com/maps/api/js?key=${ process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }`;
        script.async = true;
        script.defer = true;

        script.onload = () =>
        {
          resolve();
        };

        script.onerror = () =>
        {
          reject( new Error( 'Failed to load Google Maps API.' ) );
        };

        document.head.appendChild( script );
      } );
    };

    // Load the Google Maps API and perform geocoding
    const loadGeocoder = () =>
    {
      if ( !window.google || !window.google.maps || !window.google.maps.Geocoder )
      {
        console.error( 'Google Maps API is not fully loaded.' );
        setCoordinates( defaultCoordinates );
        setLoading( false );
        setError( 'Google Maps API is not fully loaded.' );
        return;
      }

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode( { address }, ( results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus ) =>
      {
        if ( status === 'OK' && results[ 0 ] )
        {
          const location = results[ 0 ].geometry.location;
          setCoordinates( { lat: location.lat(), lng: location.lng() } );
          setLoading( false );
          setError( null );
        } else
        {
          console.error( 'Geocode error:', status );
          setCoordinates( null ); // Do not set default coordinates; let the component handle this
          setLoading( false );
          setError( `Unable to find location for the provided address.` );
        }
      } );
    };

    // Load the Google Maps script and geocode the address
    loadGoogleMapsScript()
      .then( () =>
      {
        loadGeocoder();
      } )
      .catch( ( err ) =>
      {
        console.error( err );
        setCoordinates( null );
        setLoading( false );
        setError( 'Failed to load Google Maps API.' );
      } );
  }, [ address ] );

  return { coordinates, loading, error };
}

export default useGeolocation;
