import React, { useEffect, useRef, MutableRefObject } from "react";
import {
  GeocoderAutocomplete,
  LocationType,
  SupportedLanguage,
  GeoPosition,
  CountyCode,
  ByCountryCodeOptions,
  ByCircleOptions,
  ByRectOptions,
  ByProximityOptions,
} from '@geoapify/geocoder-autocomplete';

export const GeoapifyApiKey = React.createContext<string>('');

export const GeoapifyContext = (props: any) => {
  return (
    <GeoapifyApiKey.Provider value={props.apiKey}>
      {props.children}
    </GeoapifyApiKey.Provider>
  );
};

export interface GeoapifyGeocoderAutocompleteOptions {
  value?: string;
  type?: LocationType;
  lang?: SupportedLanguage;
  limit?: number;
  placeholder?: string;
  filterByCountryCode?: ByCountryCodeOptions;
  filterByPlace?: string;
  filterByCircle?: ByCircleOptions;
  filterByRect?: ByRectOptions;
  biasByCountryCode?: ByCountryCodeOptions;
  biasByCircle?: ByCircleOptions;
  biasByRect?: ByRectOptions;
  biasByProximity?: ByProximityOptions;
  position?: GeoPosition;
  countryCodes?: CountyCode[];

  debounceDelay?: number
  skipIcons?: boolean;
  addDetails?: boolean;
  skipSelectionOnArrowKey?: boolean;
  allowNonVerifiedHouseNumber?: boolean;
  allowNonVerifiedStreet?: boolean;

  placeSelect?: (value: any) => void;
  suggestionsChange?: (value: any) => void;

  preprocessHook?: (value: string) => string;
  postprocessHook?: (feature: any) => string;
  suggestionsFilter?: (suggestions: any[]) => any[];
  sendGeocoderRequestFunc?: (value: string, geocoderAutocomplete: GeocoderAutocomplete) => Promise<any>;
  sendPlaceDetailsRequestFunc?: (feature: any, geocoderAutocomplete: GeocoderAutocomplete) => Promise<any>;

  onUserInput?: (input: string) => void;
  onOpen?: (opened: boolean) => void;
  onClose?: (opened: boolean) => void;
  onRequestStart?: (value: string) => void;
  onRequestEnd?: (success: boolean, data?: any, error?: any) => void;
}

export const GeoapifyGeocoderAutocomplete = ({
  placeholder: placeholderValue,
  type: typeValue,
  lang: langValue,
  limit: limitValue,
  value: valueValue,
  filterByCountryCode: filterByCountryCodeValue,
  filterByCircle: filterByCircleValue,
  filterByRect: filterByRectValue,
  filterByPlace: filterByPlaceValue,
  biasByCountryCode: biasByCountryCodeValue,
  biasByCircle: biasByCircleValue,
  biasByRect: biasByRectValue,
  biasByProximity: biasByProximityValue,
  position: positionValue,
  countryCodes: countryCodesValue,
  debounceDelay: debounceDelayValue,
  skipIcons: skipIconsValue,
  skipSelectionOnArrowKey: skipSelectionOnArrowKeyValue,
  allowNonVerifiedHouseNumber: allowNonVerifiedHouseNumberValue,
  allowNonVerifiedStreet: allowNonVerifiedStreetValue,
  addDetails: addDetailsValue,
  preprocessHook: preprocessHookValue,
  postprocessHook: postprocessHookValue,
  suggestionsFilter: suggestionsFilterValue,
  sendGeocoderRequestFunc: sendGeocoderRequestFuncValue,
  sendPlaceDetailsRequestFunc: sendPlaceDetailsRequestFuncValue,
  placeSelect: placeSelectCallback,
  suggestionsChange: suggestionsChangeCallback,
  onUserInput: userInputCallback,
  onOpen: openCallback,
  onClose: closeCallback,
  onRequestStart: requestStartCallback,
  onRequestEnd: requestEndCallback,
}: GeoapifyGeocoderAutocompleteOptions) => {
  const apiKey = React.useContext<string>(GeoapifyApiKey);
  let geocoderContainer: HTMLDivElement | null;

  const geocoderAutocomplete: MutableRefObject<
    GeocoderAutocomplete | undefined
  > = useRef<GeocoderAutocomplete | undefined>(undefined);

  const placeSelectCallbackRef: MutableRefObject<
    ((value: any) => void) | undefined
  > = useRef<((value: any) => void) | undefined>(undefined);

  const suggestionsChangeCallbackRef: MutableRefObject<
    ((value: any) => void) | undefined
  > = useRef<((value: any) => void) | undefined>(undefined);

  const userInputCallbackRef: MutableRefObject<
    ((input: string) => void) | undefined
  > = useRef<((input: string) => void) | undefined>(undefined);

  const openCallbackRef: MutableRefObject<
    ((opened: boolean) => void) | undefined
  > = useRef<((opened: boolean) => void) | undefined>(undefined);

  const closeCallbackRef: MutableRefObject<
    ((opened: boolean) => void) | undefined
  > = useRef<((opened: boolean) => void) | undefined>(undefined);

  const requestStartCallbackRef: MutableRefObject<
    ((value: string) => void) | undefined
  > = useRef<((value: string) => void) | undefined>(undefined);

  const requestEndCallbackRef: MutableRefObject<
    ((success: boolean, data?: any, error?: any) => void) | undefined
  > = useRef<((success: boolean, data?: any, error?: any) => void) | undefined>(undefined);

  placeSelectCallbackRef.current = placeSelectCallback;
  suggestionsChangeCallbackRef.current =  suggestionsChangeCallback;

  userInputCallbackRef.current = userInputCallback;
  openCallbackRef.current = openCallback;
  closeCallbackRef.current = closeCallback;
  requestStartCallbackRef.current = requestStartCallback;
  requestEndCallbackRef.current = requestEndCallback;

  const onSelect = React.useCallback((value: any) => {
    if (placeSelectCallbackRef.current) {
      placeSelectCallbackRef.current(value);
    }
  },[]);

  const onSuggestions = React.useCallback((value: any) => {
    if (suggestionsChangeCallbackRef.current) {
      suggestionsChangeCallbackRef.current(value);
    }
  },[]);

  const onUserInput = React.useCallback((input: string) => {
    if (userInputCallbackRef.current) {
      userInputCallbackRef.current(input);
    }
  },[]);

  const onOpen = React.useCallback((opened: boolean) => {
    if (openCallbackRef.current) {
      openCallbackRef.current(opened);
    }
  },[]);

  const onClose = React.useCallback((opened: boolean) => {
    if (closeCallbackRef.current) {
      closeCallbackRef.current(opened);
    }
  },[]);

  const onRequestStart = React.useCallback((value: string) => {
    if (requestStartCallbackRef.current) {
      requestStartCallbackRef.current(value);
    }
  },[]);

  const onRequestEnd = React.useCallback((success: boolean, data?: any, error?: any) => {
    if (requestEndCallbackRef.current) {
      requestEndCallbackRef.current(success, data, error);
    }
  },[]);

  useEffect(() => {
    if(!geocoderAutocomplete.current) {
      geocoderAutocomplete.current = new GeocoderAutocomplete(
        geocoderContainer as HTMLDivElement,
        apiKey,
        {
          placeholder: placeholderValue || "",
          addDetails: addDetailsValue,
          skipIcons: skipIconsValue,
          skipSelectionOnArrowKey: skipSelectionOnArrowKeyValue,
          allowNonVerifiedHouseNumber: allowNonVerifiedHouseNumberValue,
          allowNonVerifiedStreet: allowNonVerifiedStreetValue,
          debounceDelay: debounceDelayValue || 100
        }
      );
    }

    geocoderAutocomplete.current.on("select", onSelect);
    geocoderAutocomplete.current.on("suggestions", onSuggestions);
    geocoderAutocomplete.current.on("input", onUserInput);
    geocoderAutocomplete.current.on("close", onClose);
    geocoderAutocomplete.current.on("open", onOpen);
    geocoderAutocomplete.current.on("request_start", onRequestStart);
    geocoderAutocomplete.current.on("request_end", onRequestEnd);

    if (sendGeocoderRequestFuncValue) {
      geocoderAutocomplete.current.setSendGeocoderRequestFunc(sendGeocoderRequestFuncValue)
    }
    return () => {
      if (geocoderAutocomplete.current) {
        geocoderAutocomplete.current.off("select", onSelect);
        geocoderAutocomplete.current.off("suggestions", onSuggestions);
        geocoderAutocomplete.current.off("input", onUserInput);
        geocoderAutocomplete.current.off("close", onClose);
        geocoderAutocomplete.current.off("open", onOpen);
        geocoderAutocomplete.current.off("request_start", onRequestStart);
        geocoderAutocomplete.current.off("request_end", onRequestEnd);
      }
    };
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
    if (geocoderAutocomplete.current && positionValue) {
      console.warn(
        "WARNING! Obsolete function called. The  'position' input has been deprecated, please use the new 'biasByLocation' input instead!"
      );
      geocoderAutocomplete.current.addBiasByProximity(
        positionValue as GeoPosition
      );
    }
  }, [positionValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current && countryCodesValue) {
      console.warn(
        "WARNING! Obsolete function called. The  'countryCodes' input has been deprecated, please use the new 'filterByCountryCode' input instead!"
      );
      geocoderAutocomplete.current.addFilterByCountry(
        countryCodesValue as CountyCode[]
      );
    }
  }, [countryCodesValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setLimit(limitValue as number);
    }
  }, [limitValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setValue((valueValue as string) || "");
    }
  }, [valueValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addFilterByCountry(
        filterByCountryCodeValue as ByCountryCodeOptions
      );
    }
  }, [filterByCountryCodeValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addFilterByCircle(
        filterByCircleValue as ByCircleOptions
      );
    }
  }, [filterByCircleValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addFilterByRect(
        filterByRectValue as ByRectOptions
      );
    }
  }, [filterByRectValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addFilterByPlace(
        filterByPlaceValue as string
      );
    }
  }, [filterByRectValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addBiasByCountry(
        biasByCountryCodeValue as ByCountryCodeOptions
      );
    }
  }, [biasByCountryCodeValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addBiasByCircle(
        biasByCircleValue as ByCircleOptions
      );
    }
  }, [biasByCircleValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addBiasByRect(
        biasByRectValue as ByRectOptions
      );
    }
  }, [biasByRectValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addBiasByProximity(
        biasByProximityValue as ByProximityOptions
      );
    }
  }, [biasByProximityValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setPreprocessHook(
        preprocessHookValue
      );
    }
  }, [preprocessHookValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setPostprocessHook(
        postprocessHookValue
      );
    }
  }, [postprocessHookValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setSuggestionsFilter(
        suggestionsFilterValue
      );
    }
  }, [suggestionsFilterValue]);


  useEffect(() => {
    if (geocoderAutocomplete.current && sendGeocoderRequestFuncValue) {
      geocoderAutocomplete.current.setSendGeocoderRequestFunc(
        sendGeocoderRequestFuncValue
      );
    }
  }, [sendGeocoderRequestFuncValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current && sendPlaceDetailsRequestFuncValue) {
      geocoderAutocomplete.current.setSendPlaceDetailsRequestFunc(
        sendPlaceDetailsRequestFuncValue
      );
    }
  }, [sendPlaceDetailsRequestFuncValue]);

  return (
    <div
      className="geocoder-container"
      style={{ position: "relative" }}
      ref={(el) => { geocoderContainer = el; }}
    ></div>
  );
};
