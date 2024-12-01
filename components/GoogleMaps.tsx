import React, {  useState, useRef } from 'react';
import { LoadScript, Autocomplete, GoogleMap, Marker } from '@react-google-maps/api';

const AddressSelection = () =>
{
  const [ location, setLocation ] = useState( '' );
  const [ city, setCity ] = useState( '' );
  const [ state, setState ] = useState( '' );
  const [ zip, setZip ] = useState( '' );
  const [ country, setCountry ] = useState( '' );
  const [ mapCenter, setMapCenter ] = useState( { lat: 37.4221, lng: -122.0841 } );

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>( null );
  const mapRef = useRef<google.maps.Map | null>( null );

  const handlePlaceChanged = () =>
  {
    if ( autocompleteRef.current )
    {
      const place = autocompleteRef.current.getPlace();
      if ( place.geometry && place.geometry.location )
      {
        const { lat, lng } = place.geometry.location;
        setMapCenter( {
          lat: lat(),
          lng: lng(),
        } );

        setLocation( place.formatted_address || '' );
        setCity( place.address_components?.find( ac => ac.types.includes( 'locality' ) )?.long_name || '' );
        setState( place.address_components?.find( ac => ac.types.includes( 'administrative_area_level_1' ) )?.long_name || '' );
        setZip( place.address_components?.find( ac => ac.types.includes( 'postal_code' ) )?.long_name || '' );
        setCountry( place.address_components?.find( ac => ac.types.includes( 'country' ) )?.long_name || '' );
      } else
      {
        console.error( 'No details available for input:', place.name );
      }
    } else
    {
      console.error( 'Autocomplete reference is not ready.' );
    }
  };

  return (
    <div>
      <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={ [ 'places' ] }>
        <GoogleMap
          center={ mapCenter }
          zoom={ 12 }
          mapContainerStyle={ { height: '500px', width: '600px' } }
          onLoad={ ( map ) =>
          {
            mapRef.current = map;
            return undefined; // Ensuring the function returns void or Promise<void>
          } }
        >
          <Marker position={ mapCenter } />
          <Autocomplete
            onLoad={ ( autocomplete ) => ( autocompleteRef.current = autocomplete ) }
            onPlaceChanged={ handlePlaceChanged }
          >
            <input
              type="text"
              placeholder="Address"
              style={ { width: '100%', padding: '10px' } }
            />
          </Autocomplete>
        </GoogleMap>
      </LoadScript>

      {/* Display the location details */ }
      <div>
        <h3>Address Details:</h3>
        <p>Location: { location }</p>
        <p>City: { city }</p>
        <p>State: { state }</p>
        <p>ZIP: { zip }</p>
        <p>Country: { country }</p>
      </div>
    </div>
  );
};

export default AddressSelection;
