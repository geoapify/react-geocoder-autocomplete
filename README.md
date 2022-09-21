# React compoment for Geoapify Geocoder Autocomplete
The component wraps the [@geoapify/geocoder-autocomplete](https://www.npmjs.com/package/@geoapify/geocoder-autocomplete) library into a React component. The library uses [Geoapify Geocoding Autocomplete](https://www.geoapify.com/address-autocomplete/) as an address search service.

## Geoapify Geocoding Autocomplete API
The component uses Geoapify Geocoding API for address search.
* [Documentation](https://apidocs.geoapify.com/docs/geocoding)
* [Playground](https://apidocs.geoapify.com/playground/geocoding#autocomplete)
* [Register and get Geoapify API key](https://myprojects.geoapify.com)
* [Geoapify Location Platform](https://www.geoapify.com/)

## Geoapify Place Details API
On user select events the Place Details API is called to provide more details for the selected place and it's geometry.
Note, that the Place Deatils API call costs additional "Geocoding & Places" request. Use the `skipDetails` option to skip the Places Details API call.
* [Place Details API Documentation](https://apidocs.geoapify.com/docs/place-details)
* [Place Details API Playground](https://apidocs.geoapify.com/playground/place-details)


## Compatiblity table
|@geoapify/react-geocoder-autocomplete|React|
|-|-|
|1.0.x| >= 16.8.0|
|1.1.x| >= 16.8.0|
|1.2.x| >= 17.0.0|
|1.3.x| >= 17.0.0|
|1.4.x| >= 18.0.0|
## Installation
@geoapify/react-geocoder-autocomplete has a peer dependancy on **@geoapify/geocoder-autocomplete**:
```
npm install @geoapify/geocoder-autocomplete @geoapify/react-geocoder-autocomplete
# or 
yarn add @geoapify/geocoder-autocomplete @geoapify/react-geocoder-autocomplete
```

## Usage
You need an API key to be able to call Geoapify Geocoding API. 
Register and get an API key for Free on [myprojects.geoapify.com](https://myprojects.geoapify.com/).
Geoapify has [Freemium pricing model](https://www.geoapify.com/pricing/). You can start for Free and extend when you need.

1. Import styles
Import CSS style file from **@geoapify-geocoder-autocomplete** to make the control appear correctly. You can choose from several stylings:
* `minimal` and `round-borders` - for webpages with light background color
* `minimal-dark` and `round-borders-dark` for webpages with dark background color.
2. Add Geoapify context and provide an apiKey there
3. Add Geoapify Geocoder Autocomplete component

```tsx
import React, { useState } from 'react'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

const App = () => {
  ...

  function onPlaceSelect(value) {
    console.log(value);
  }

  function onSuggectionChange(value) {
    console.log(value);
  }

  function preprocessHook(value) {
    return `${value}, Munich, Germany`
  }

  function postprocessHook(feature) {
    return feature.properties.street;
  }

  function suggestionsFilter(suggestions) {
    const processedStreets = [];

    const filtered = suggestions.filter(value => {
      if (!value.properties.street || processedStreets.indexOf(value.properties.street) >= 0) {
        return false;
      } else {
        processedStreets.push(value.properties.street);
        return true;
      }
    })

    return filtered;
  }

  return <GeoapifyContext apiKey="YOUR_API_KEY_HERE">

      <GeoapifyGeocoderAutocomplete
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggectionChange}
      />

      <GeoapifyGeocoderAutocomplete placeholder="Enter address here"
        value={value}
        type={type}
        lang={language}
        position={position}
        countryCodes={countryCodes}
        limit={limit}
        filterByCountryCode={filterByCountryCode}
        filterByCircle={filterByCircle}
        filterByRect={filterByRect}
        biasByCountryCode={biasByCountryCode}
        biasByCircle={biasByCircle}
        biasByRect={biasByRect}
        biasByProximity={biasByProximity}
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggectionChange}
      />

      <GeoapifyGeocoderAutocomplete
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggectionChange}
        preprocessHook={preprocessHook}
        postprocessHook={postprocessHook}
        suggestionsFilter={suggestionsFilter}
      />
    </GeoapifyContext>
}

export default App

```
### Component properties

| Name | Type | Description |
|-|-|-| 
| value | string | Initial value or display value for the input field |
| type | LocationType | Type of a location
| lang | SupportedLanguage | Results language |
| limit | number | The maximal number of returned suggestions |
| placeholder | string | An input field placeholder |
| filterByCountryCode | ByCountryCodeOptions | Search places in the countries |
| filterByCircle | ByCircleOptions | Search places inside the circle |
| filterByRect | ByRectOptions | Search places inside the rectangle |
| biasByCountryCode | ByCountryCodeOptions | First, search places in the countries |
| biasByCircle | ByCircleOptions | First, search places inside the circle |
| biasByRect | ByRectOptions | First, search places inside the rectangle |
| biasByProximity | ByProximityOptions | Prioritize results by farness from the location |
| skipIcons | boolean | Don't add icons to suggestions |
| skipDetails | boolean | Skip Place Details API call on selection change |

You can use several filters at once. The **AND** logic is applied to multiple filters.

You can use several bias parameters at once. The **OR** logic is applied to multiple biases.

```javascript
export type ByCountryCodeOptions = CountyCode[];

export interface ByProximityOptions {
    lon: number;
    lat: number;
}

export interface ByCircleOptions {
    lon: number;
    lat: number;
    radiusMeters: number;
}

export interface ByRectOptions {
    lon1: number;
    lat1: number;
    lon2: number;
    lat2: number;
}

export type LocationType = 'country' | 'state' | 'city' | 'postcode' | 'street' | 'amenity';
export type SupportedLanguage = "ab" | "aa" | "af" | "ak" | "sq" | "am" | "ar" | "an" | "hy" | "as" | "av" | "ae" | "ay" | "az" | "bm" | "ba" | "eu" | "be" | "bn" | "bh" | "bi" | "bs" | "br" | "bg" | "my" | "ca" | "ch" | "ce" | "ny" | "zh" | "cv" | "kw" | "co" | "cr" | "hr" | "cs" | "da" | "dv" | "nl" | "en" | "eo" | "et" | "ee" | "fo" | "fj" | "fi" | "fr" | "ff" | "gl" | "ka" | "de" | "el" | "gn" | "gu" | "ht" | "ha" | "he" | "hz" | "hi" | "ho" | "hu" | "ia" | "id" | "ie" | "ga" | "ig" | "ik" | "io" | "is" | "it" | "iu" | "ja" | "jv" | "kl" | "kn" | "kr" | "ks" | "kk" | "km" | "ki" | "rw" | "ky" | "kv" | "kg" | "ko" | "ku" | "kj" | "la" | "lb" | "lg" | "li" | "ln" | "lo" | "lt" | "lu" | "lv" | "gv" | "mk" | "mg" | "ms" | "ml" | "mt" | "mi" | "mr" | "mh" | "mn" | "na" | "nv" | "nb" | "nd" | "ne" | "ng" | "nn" | "no" | "ii" | "nr" | "oc" | "oj" | "cu" | "om" | "or" | "os" | "pa" | "pi" | "fa" | "pl" | "ps" | "pt" | "qu" | "rm" | "rn" | "ro" | "ru" | "sa" | "sc" | "sd" | "se" | "sm" | "sg" | "sr" | "gd" | "sn" | "si" | "sk" | "sl" | "so" | "st" | "es" | "su" | "sw" | "ss" | "sv" | "ta" | "te" | "tg" | "th" | "ti" | "bo" | "tk" | "tl" | "tn" | "to" | "tr" | "ts" | "tt" | "tw" | "ty" | "ug" | "uk" | "ur" | "uz" | "ve" | "vi" | "vo" | "wa" | "cy" | "wo" | "fy" | "xh" | "yi" | "yo" | "za";

export type CountyCode = "none"| "auto" | "ad" | "ae" | "af" | "ag" | "ai" | "al" | "am" | "an" | "ao" | "ap" | "aq" | "ar" | "as" | "at" | "au" | "aw" | "az" | "ba" | "bb" | "bd" | "be" | "bf" | "bg" | "bh" | "bi" | "bj" | "bm" | "bn" | "bo" | "br" | "bs" | "bt" | "bv" | "bw" | "by" | "bz" | "ca" | "cc" | "cd" | "cf" | "cg" | "ch" | "ci" | "ck" | "cl" | "cm" | "cn" | "co" | "cr" | "cu" | "cv" | "cx" | "cy" | "cz" | "de" | "dj" | "dk" | "dm" | "do" | "dz" | "ec" | "ee" | "eg" | "eh" | "er" | "es" | "et" | "eu" | "fi" | "fj" | "fk" | "fm" | "fo" | "fr" | "ga" | "gb" | "gd" | "ge" | "gf" | "gh" | "gi" | "gl" | "gm" | "gn" | "gp" | "gq" | "gr" | "gs" | "gt" | "gu" | "gw" | "gy" | "hk" | "hm" | "hn" | "hr" | "ht" | "hu" | "id" | "ie" | "il" | "in" | "io" | "iq" | "ir" | "is" | "it" | "jm" | "jo" | "jp" | "ke" | "kg" | "kh" | "ki" | "km" | "kn" | "kp" | "kr" | "kw" | "ky" | "kz" | "la" | "lb" | "lc" | "li" | "lk" | "lr" | "ls" | "lt" | "lu" | "lv" | "ly" | "ma" | "mc" | "md" | "me" | "mg" | "mh" | "mk" | "ml" | "mm" | "mn" | "mo" | "mp" | "mq" | "mr" | "ms" | "mt" | "mu" | "mv" | "mw" | "mx" | "my" | "mz" | "na" | "nc" | "ne" | "nf" | "ng" | "ni" | "nl" | "no" | "np" | "nr" | "nu" | "nz" | "om" | "pa" | "pe" | "pf" | "pg" | "ph" | "pk" | "pl" | "pm" | "pr" | "ps" | "pt" | "pw" | "py" | "qa" | "re" | "ro" | "rs" | "ru" | "rw" | "sa" | "sb" | "sc" | "sd" | "se" | "sg" | "sh" | "si" | "sj" | "sk" | "sl" | "sm" | "sn" | "so" | "sr" | "st" | "sv" | "sy" | "sz" | "tc" | "td" | "tf" | "tg" | "th" | "tj" | "tk" | "tm" | "tn" | "to" | "tr" | "tt" | "tv" | "tw" | "tz" | "ua" | "ug" | "um" | "us" | "uy" | "uz" | "va" | "vc" | "ve" | "vg" | "vi" | "vn" | "vu" | "wf" | "ws" | "ye" | "yt" | "za" | "zm" | "zw";
```

### Component event properties
| Name | Description | Value type |
|-|-|-|
| placeSelect | Fired when a location was selected | [GeoJSON.Feature](https://geojson.org/) |
| suggestionsChange | Fired on new suggestions | [GeoJSON.Feature[]](https://geojson.org/) |
| onUserInput | Fired on user input | string |
| onOpen | Fired on dropdown list open | |
| onClose | Fired on dropdownlist close | |

Properties of the feature contain information about address and location.
Learn more about Geocoder result properties on [Geoapify Documentation page](https://apidocs.geoapify.com/docs/geocoding/).

The component doesn't have dependancy on [@types/geojson](https://www.npmjs.com/package/@types/geojson). However, you can install it to work with GeoJSON types.

### Hooks and filters
| Name | Description |
|-|-|
| preprocessingHook | Modify the text to search. For example, if you expect that the user enters a street name you can add a city or postcode to search streets in the city. |
| postprocessingHook | Modify the text that will be displayed in the input field and suggestions list. For example, you can show only a street name. |
| suggestionsFilter | Filtering some suggestions. It lets to avoid duplicated results when you modify the address with a post-process hook. For example, suggestions may contain several addresses with the same street name, they will be duplicated when not the whole address but only the street name is shown. |