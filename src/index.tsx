import React, { useEffect, useRef, MutableRefObject } from 'react';
import { GeocoderAutocompleteOptions, GeocoderAutocomplete, LocationType, SupportedLanguage, GeoPosition, CountyCode } from '@geoapify/geocoder-autocomplete';

export const GeoapifyApiKey = React.createContext<string>('');

export const GeoapifyContext = (props: any) => {
  return <GeoapifyApiKey.Provider value={props.apiKey}>
    {props.children}
  </GeoapifyApiKey.Provider>
}

export interface GeoapifyGeocoderAutocompleteOptions extends GeocoderAutocompleteOptions {
  value: string;
  placeSelect: (value: any) => {};
  suggestionsChange: (value: any) => {}
}

export const GeoapifyGeocoderAutocomplete = ({ placeholder: placeholderValue,
  type: typeValue,
  lang: langValue,
  position: positionValue,
  countryCodes: countryCodesValue,
  limit: limitValue,
  value: valueValue,
  placeSelect: placeSelectCallback,
  suggestionsChange: suggestionsChangeCallback}: GeoapifyGeocoderAutocompleteOptions) => {
  const apiKey = React.useContext<string>(GeoapifyApiKey);
  let geocoderContainer: HTMLDivElement | null;
  let initialized: boolean = false;
  let geocoderAutocomplete: MutableRefObject<GeocoderAutocomplete | undefined> = useRef<GeocoderAutocomplete>();

  function onSelect(value: any) {
    if (placeSelectCallback) {
        placeSelectCallback(value);
    }
  }

  function onSuggestions(value: any) {
    if (suggestionsChangeCallback) {
      suggestionsChangeCallback(value);
    }
  }

  useEffect(() => {
    if (initialized) {

      if (geocoderAutocomplete.current) {
        geocoderAutocomplete.current.off('select', onSelect);
        geocoderAutocomplete.current.off('suggestions', onSuggestions);
      }

      return;
    }

    initialized = true;

    geocoderAutocomplete.current = new GeocoderAutocomplete(geocoderContainer as HTMLDivElement, apiKey, {
      placeholder: placeholderValue
    });

    geocoderAutocomplete.current.on('select', onSelect);
    geocoderAutocomplete.current.on('suggestions', onSuggestions);
  }, []);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setType(typeValue as LocationType);
    }
  }, [typeValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setLang(langValue as SupportedLanguage);
    }
  }, [langValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setPosition(positionValue as GeoPosition);
    }
  }, [positionValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setCountryCodes(countryCodesValue as CountyCode[]);
    }
  }, [countryCodesValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setLimit(limitValue as number);
    }
  }, [limitValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setValue(valueValue as string);
    }
  }, [valueValue]);


  return <div className="geocoder-container" style={{ 'position': 'relative' }} ref={el => geocoderContainer = el}></div>
}