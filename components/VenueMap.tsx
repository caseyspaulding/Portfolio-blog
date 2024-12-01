"use client"; // This directive ensures the component is treated as a client component.

import { AdvancedMarker, APIProvider, Map, Pin } from '@vis.gl/react-google-maps';
import useGeolocation from '@/hooks/useGeoLocation';
import Script from 'next/script'; 

interface VenueMapProps
{
  address: string;
}

const VenueMap: React.FC<VenueMapProps> = ( { address } ) =>
{
  const { coordinates, loading, error } = useGeolocation( address );

  if ( loading )
  {
    return <div>Loading map...</div>;
  }

  if ( error )
  {
    return <div>{ error }</div>;
  }

  if ( !coordinates )
  {
    return <div>Loading map...</div>;
  }

  return (
    <>
      {/* Load the Google Maps JavaScript API */ }
      <Script
        src={ `https://maps.googleapis.com/maps/api/js?key=${ process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }&libraries=places` }
        strategy="beforeInteractive"
      />

      <APIProvider apiKey={ process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '' }>
        <div className="h-96">
          <Map zoom={ 15 } center={ coordinates } mapId={ process.env.NEXT_PUBLIC_MAP_ID }>
            <AdvancedMarker position={ coordinates }>
              <Pin background="orange" borderColor="blue" glyphColor="blue" />
            </AdvancedMarker>
          </Map>
        </div>
      </APIProvider>
    </>
  );
};

export default VenueMap;
