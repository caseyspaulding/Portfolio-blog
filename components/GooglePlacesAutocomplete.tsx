import React, { useRef, useState } from 'react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import type { Libraries } from '@react-google-maps/api';

// Define the libraries to load
const libraries: Libraries = [ 'places' ];

interface GooglePlacesAutocompleteProps
{
  apiKey: string;
  onPlaceSelected: ( place: google.maps.places.PlaceResult ) => void;
}

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ( { apiKey, onPlaceSelected } ) =>
{
  const [ autocomplete, setAutocomplete ] = useState<google.maps.places.Autocomplete | null>( null );
  const inputRef = useRef<HTMLInputElement>( null );

  const handleLoad = ( autocompleteInstance: google.maps.places.Autocomplete ) =>
  {
    console.log( 'Autocomplete loaded:', autocompleteInstance );
    setAutocomplete( autocompleteInstance );
  };

  const handlePlaceChanged = () =>
  {
    if ( autocomplete !== null )
    {
      const place = autocomplete.getPlace();
      console.log( 'Place selected:', place ); // Log the selected place details
      onPlaceSelected( place );
    } else
    {
      console.warn( 'Autocomplete is not loaded yet!' );
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={ apiKey }
      libraries={ libraries } // Asynchronously load the Places library
      onLoad={ () => console.log( 'Google Maps Script loaded' ) }
      onError={ ( error ) => console.error( 'Error loading Google Maps Script:', error ) }
    >
      <GoogleMap mapContainerStyle={ { display: 'none' } } center={ { lat: 0, lng: 0 } } zoom={ 1 }>
        <Autocomplete onLoad={ handleLoad } onPlaceChanged={ handlePlaceChanged }>
          <input
            type="text"
            placeholder="Enter a location"
            ref={ inputRef }
            style={ {
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            } }
          />
        </Autocomplete>
      </GoogleMap>
    </LoadScript>
  );
};

export default GooglePlacesAutocomplete;
