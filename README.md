# ReactJS compoment for Geoapify Geocoder Autocomplete
The component wraps the [@geoapify/geocoder-autocomplete](https://www.npmjs.com/package/@geoapify/geocoder-autocomplete) library into a ReactJS component.

## Geoapify Geocoding API documentation
* [Geocoding API Documentation](https://apidocs.geoapify.com/docs/geocoding)
* [Geocoding API Playground](https://apidocs.geoapify.com/playground/geocoding)
* [Register and get Geoapify API key](https://myprojects.geoapify.com)
* [Geoapify APIs](https://www.geoapify.com/)

## Compatiblity table
|@geoapify/react-geocoder-autocomplete|React|
|-|-|
|1.0.x| >= 16.8.0|

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
Geoapify has [Freemium pricing model](https://www.geoapify.com/api-pricing/). You can start for Free and extend when you need.

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

  return <GeoapifyContext apiKey="YOUR_API_KEY_HERE">
      <GeoapifyGeocoderAutocomplete placeholder="Enter address here"
        type={type}
        lang={language}
        position={position}
        countryCodes={countryCodes}
        limit={limit}
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggectionChange}
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
| position | GeoPosition | Prefered search position |
| countryCodes | CountyCode[] | Limit the search by countries |
| limit | number | The maximal number of returned suggestions |
| placeholder | string | An input field placeholder |
```javascript
export interface GeocoderAutocompleteOptions {
    type?: LocationType;
    lang?: SupportedLanguage;
    position?: GeoPosition;
    countryCodes?: CountyCode[];
    limit?: number;
    placeholder?: string;
}

export interface GeoPosition {
    lat: number;
    lon: number;
}

export type LocationType = 'country' | 'state' | 'city' | 'postcode' | 'street' | 'amenity';
export type SupportedLanguage = 'en' | 'de' | 'it' | 'fr';
export type CountyCode = "ad" | "ae" | "af" | "ag" | "ai" | "al" | "am" | "an" | "ao" | "ap" | "aq" | "ar" | "as" | "at" | "au" | "aw" | "az" | "ba" | "bb" | "bd" | "be" | "bf" | "bg" | "bh" | "bi" | "bj" | "bm" | "bn" | "bo" | "br" | "bs" | "bt" | "bv" | "bw" | "by" | "bz" | "ca" | "cc" | "cd" | "cf" | "cg" | "ch" | "ci" | "ck" | "cl" | "cm" | "cn" | "co" | "cr" | "cu" | "cv" | "cx" | "cy" | "cz" | "de" | "dj" | "dk" | "dm" | "do" | "dz" | "ec" | "ee" | "eg" | "eh" | "er" | "es" | "et" | "eu" | "fi" | "fj" | "fk" | "fm" | "fo" | "fr" | "ga" | "gb" | "gd" | "ge" | "gf" | "gh" | "gi" | "gl" | "gm" | "gn" | "gp" | "gq" | "gr" | "gs" | "gt" | "gu" | "gw" | "gy" | "hk" | "hm" | "hn" | "hr" | "ht" | "hu" | "id" | "ie" | "il" | "in" | "io" | "iq" | "ir" | "is" | "it" | "jm" | "jo" | "jp" | "ke" | "kg" | "kh" | "ki" | "km" | "kn" | "kp" | "kr" | "kw" | "ky" | "kz" | "la" | "lb" | "lc" | "li" | "lk" | "lr" | "ls" | "lt" | "lu" | "lv" | "ly" | "ma" | "mc" | "md" | "me" | "mg" | "mh" | "mk" | "ml" | "mm" | "mn" | "mo" | "mp" | "mq" | "mr" | "ms" | "mt" | "mu" | "mv" | "mw" | "mx" | "my" | "mz" | "na" | "nc" | "ne" | "nf" | "ng" | "ni" | "nl" | "no" | "np" | "nr" | "nu" | "nz" | "om" | "pa" | "pe" | "pf" | "pg" | "ph" | "pk" | "pl" | "pm" | "pr" | "ps" | "pt" | "pw" | "py" | "qa" | "re" | "ro" | "rs" | "ru" | "rw" | "sa" | "sb" | "sc" | "sd" | "se" | "sg" | "sh" | "si" | "sj" | "sk" | "sl" | "sm" | "sn" | "so" | "sr" | "st" | "sv" | "sy" | "sz" | "tc" | "td" | "tf" | "tg" | "th" | "tj" | "tk" | "tm" | "tn" | "to" | "tr" | "tt" | "tv" | "tw" | "tz" | "ua" | "ug" | "um" | "us" | "uy" | "uz" | "va" | "vc" | "ve" | "vg" | "vi" | "vn" | "vu" | "wf" | "ws" | "ye" | "yt" | "za" | "zm" | "zw";
```

### Component event properties
| Name | Description | Value type |
|-|-|-|
| placeSelect | Fired when a location was selected | [GeoJSON.Feature](https://geojson.org/) |
| suggestionsChange | Fired on new suggestions | [GeoJSON.Feature[]] (https://geojson.org/) |

Properties of the feature contain information about address and location.
Learn more about Geocoder result properties on [Geoapify Documentation page](https://apidocs.geoapify.com/docs/geocoding/).

The component doesn't have dependancy on [@types/geojson](https://www.npmjs.com/package/@types/geojson). However, you can install it to work with GeoJSON types.
