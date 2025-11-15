# API Reference

The React Geocoder Autocomplete component exposes several **props** and **callbacks** that control how address suggestions are fetched, filtered, and displayed.

## Props and Callbacks

| Name                          | Type                                                 | Direction | Description                                                      |
| ----------------------------- | ---------------------------------------------------- | --------- | ---------------------------------------------------------------- |
| `value`                       | `string`                                             | Prop      | Current value of the input field.                                |
| `placeholder`                 | `string`                                             | Prop      | Text shown when the input is empty.                              |
| `type`                        | `LocationType`                                       | Prop      | Type of place to search for (`country`, `city`, `street`, etc.). |
| `lang`                        | `SupportedLanguage`                                  | Prop      | Language of suggestions and results.                             |
| `limit`                       | `number`                                             | Prop      | Max number of suggestions to show.                               |
| `debounceDelay`               | `number`                                             | Prop      | Delay (ms) before sending requests after typing.                 |
| `filterByCountryCode`         | `ByCountryCodeOptions`                               | Prop      | Restrict results to selected countries.                          |
| `filterByCircle`              | `ByCircleOptions`                                    | Prop      | Limit search within a circular area.                             |
| `filterByRect`                | `ByRectOptions`                                      | Prop      | Limit search within a rectangle.                                 |
| `filterByPlace`               | `string`                                             | Prop      | Filter by specific place ID.                                     |
| `biasByProximity`             | `ByProximityOptions`                                 | Prop      | Prioritize results near a given point.                           |
| `biasByCountryCode`           | `ByCountryCodeOptions`                               | Prop      | Prioritize results from certain countries.                       |
| `biasByCircle`                | `ByCircleOptions`                                    | Prop      | Bias results within a circle.                                    |
| `biasByRect`                  | `ByRectOptions`                                      | Prop      | Bias results within a rectangle.                                 |
| `skipIcons`                   | `boolean`                                            | Prop      | Hide icons in the suggestions list.                              |
| `addDetails`                  | `boolean`                                            | Prop      | Include detailed place info in results.                          |
| `allowNonVerifiedHouseNumber` | `boolean`                                            | Prop      | Allow house numbers not verified in data.                        |
| `allowNonVerifiedStreet`      | `boolean`                                            | Prop      | Allow street names not verified in data.                         |
| `skipSelectionOnArrowKey`     | `boolean`                                            | Prop      | Disable auto-select with arrow keys.                             |
| `addCategorySearch`           | `boolean`                                            | Prop      | Enable category-based (POI) search.                              |
| `showPlacesByCategoryList`              | `boolean`                                            | Prop      | Display POI list under the field.                                |
| `hidePlacesByCategoryListAfterSelect`   | `boolean`                                            | Prop      | Hide POI list after selection.                                   |
| `enablePlacesByCategoryLazyLoading`     | `boolean`                                            | Prop      | Load additional POI items dynamically.                           |
| `placesByCategoryLimit`                 | `number`                                             | Prop      | Max number of POIs to display.                                   |
| `placesByCategoryFilter`                | `object`                                             | Prop      | Filters for category-based search.                               |
| `placesByCategoryBias`                  | `object`                                             | Prop      | Bias rules for category-based search.                            |
| `preprocessHook`              | `(value: string) => string`                          | Prop      | Modify input before request.                                     |
| `postprocessHook`             | `(feature: any) => string`                           | Prop      | Modify selected result before display.                           |
| `suggestionsFilter`           | `(features: any[]) => any[]`                         | Prop      | Filter suggestions before display.                               |
| `sendGeocoderRequestFunc`     | `(value: string, geocoder: GeocoderAutocomplete) => Promise<any>` | Prop | Custom function to send geocoder requests.   |
| `sendPlaceDetailsRequestFunc` | `(feature: any, geocoder: GeocoderAutocomplete) => Promise<any>`  | Prop | Custom function to send place details requests. |
| `sendPlacesByCategoryRequestFunc` | `(category: string[], offset: number, geocoder: GeocoderAutocomplete) => Promise<any>` | Prop | Custom function to send places by category requests. |
| `placeSelect`                 | `(feature: any) => void`                             | Callback  | Fires when a user selects a place.                               |
| `suggestionsChange`           | `(features: any[]) => void`                          | Callback  | Fires when suggestions are updated.                              |
| `onUserInput`                 | `(input: string) => void`                            | Callback  | Fires on user input changes.                                     |
| `onOpen`                      | `(opened: boolean) => void`                          | Callback  | Fires when the dropdown opens.                                   |
| `onClose`                     | `(opened: boolean) => void`                          | Callback  | Fires when the dropdown closes.                                  |
| `onRequestStart`              | `(query: string) => void`                            | Callback  | Fires when a geocoding request starts.                           |
| `onRequestEnd`                | `(success: boolean, data?: any, error?: any) => void` | Callback | Fires when a geocoding request completes.                        |
| `onPlacesByCategoryChange`              | `(places: any[]) => void`                            | Callback  | Emits POI results when category search is active.                |
| `onPlacesByCategoryRequestStart`        | `(category: Category) => void`                       | Callback  | Fires when a POI request starts.                                 |
| `onPlacesByCategoryRequestEnd`          | `(success: boolean, data?: any, error?: any) => void` | Callback | Fires when a POI request ends.                                   |
| `onPlaceDetailsRequestStart`  | `(feature: any) => void`                             | Callback  | Fires when a place details request starts.                       |
| `onPlaceDetailsRequestEnd`    | `(success: boolean, data?: any, error?: any) => void` | Callback | Fires when a place details request ends.                         |
| `onPlaceByCategorySelect`           | `(value: {place: any, index: number}) => void`       | Callback  | Fires when a POI is selected from the list.                      |
| `onClear`                     | `(type: ItemType) => void`                           | Callback  | Fires when the field or selection is cleared.                    |

Each prop allows you to control how the autocomplete behaves and appears.
Props can be bound to React component state, enabling dynamic updates and reactive configurations.

Below are examples showing how to define these properties in your component and use them in JSX.

### `value` (Prop)

**Type:** `string`
**Description:** Sets or retrieves the current value of the autocomplete input field.
Can be bound to a component state for dynamic updates.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete value={address} />
</GeoapifyContext>
```

```jsx
const [address, setAddress] = useState('New York, USA');
```


### `placeholder` (Prop)

**Type:** `string`
**Description:** Text shown when the field is empty.
Commonly used to hint at what users can type.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete placeholder={placeholderText} />
</GeoapifyContext>
```

```jsx
const placeholderText = 'Search for a location';
```

### `type` (Prop)

**Type:** `LocationType`
**Description:** Defines the type of place to search for — such as `'country'`, `'city'`, `'postcode'`, `'street'`, or `'amenity'`.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete type={locationType} />
</GeoapifyContext>
```

```jsx
const locationType = 'city';
```

### `lang` (Prop)

**Type:** `SupportedLanguage`
**Description:** Language code used for displaying suggestions and results.
Supports ISO 639-1 codes like `'en'`, `'de'`, `'fr'`, `'es'`.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete lang={language} />
</GeoapifyContext>
```

```jsx
const language = 'fr'; // French
```


### `limit` (Prop)

**Type:** `number`
**Description:** Maximum number of suggestions to display in the dropdown.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete limit={maxSuggestions} />
</GeoapifyContext>
```

```jsx
const maxSuggestions = 5;
```


### `debounceDelay` (Prop)

**Type:** `number`
**Description:** Time in milliseconds to wait after user input before triggering a new API request.
Helps prevent excessive requests during fast typing.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete debounceDelay={debounceTime} />
</GeoapifyContext>
```

```jsx
const debounceTime = 400;
```

### `filterByCountryCode` (Prop)

**Type:** `ByCountryCodeOptions`
**Description:** Restricts suggestions to specific country codes (ISO 3166-1 alpha-2).

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete filterByCountryCode={allowedCountries} />
</GeoapifyContext>
```

```jsx
const allowedCountries = ['US', 'CA']; // Only show addresses in the US and Canada
```


### `filterByCircle` (Prop)

**Type:** `ByCircleOptions`
**Description:** Limits search results to a circular area around a specific coordinate.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete filterByCircle={cityCenterFilter} />
</GeoapifyContext>
```

```jsx
const cityCenterFilter = {
  lon: -73.935242,
  lat: 40.73061,
  radiusMeters: 10000 // 10 km radius
};
```


### `filterByRect` (Prop)

**Type:** `ByRectOptions`
**Description:** Restricts results to a rectangular bounding box defined by two corner coordinates.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete filterByRect={nycBoundingBox} />
</GeoapifyContext>
```

```jsx
const nycBoundingBox = {
  lon1: -74.25909,
  lat1: 40.4774,
  lon2: -73.70027,
  lat2: 40.91758
};
```

### `filterByPlace` (Prop)

**Type:** `string`
**Description:** Filters results by a specific Geoapify place ID, restricting search to that area.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete filterByPlace={placeId} />
</GeoapifyContext>
```

```jsx
const placeId = '51c4a8dee5136e3f4059e511b0eb34354440f00101f9014d270000000000c00208';
```


### `biasByProximity` (Prop)

**Type:** `ByProximityOptions`
**Description:** Prioritizes suggestions that are geographically closer to a given point.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete biasByProximity={userLocation} />
</GeoapifyContext>
```

```jsx
const userLocation = { lon: -73.935242, lat: 40.73061 };
```


### `biasByCountryCode` (Prop)

**Type:** `ByCountryCodeOptions`
**Description:** Suggests results from specific countries first, while still including others.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete biasByCountryCode={preferredCountries} />
</GeoapifyContext>
```

```jsx
const preferredCountries = ['US'];
```


### `biasByCircle` (Prop)

**Type:** `ByCircleOptions`
**Description:** Prefers results inside a given circle but still shows matches from other areas.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete biasByCircle={focusArea} />
</GeoapifyContext>
```

```jsx
const focusArea = {
  lon: -73.935242,
  lat: 40.73061,
  radiusMeters: 5000
};
```


### `biasByRect` (Prop)

**Type:** `ByRectOptions`
**Description:** Prioritizes results from within a rectangular area.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete biasByRect={preferredRegion} />
</GeoapifyContext>
```

```jsx
const preferredRegion = {
  lon1: -74.05,
  lat1: 40.68,
  lon2: -73.85,
  lat2: 40.85
};
```

### `skipIcons` (Prop)

**Type:** `boolean`
**Description:** Hides category and location icons in suggestion items. Useful for minimal or custom UI designs.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete skipIcons={true} />
</GeoapifyContext>
```

### `addDetails` (Prop)

**Type:** `boolean`
**Description:** When `true`, includes detailed place information (e.g., `formatted`, `country`, `postcode`) in search results.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete addDetails={includeDetails} />
</GeoapifyContext>
```

```jsx
const includeDetails = true;
```

### `allowNonVerifiedHouseNumber` (Prop)

**Type:** `boolean`
**Description:** Allows users to enter and select house numbers not verified in the Geoapify database.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete allowNonVerifiedHouseNumber={true} />
</GeoapifyContext>
```

### `allowNonVerifiedStreet` (Prop)

**Type:** `boolean`
**Description:** Permits users to enter unverified or incomplete street names.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete allowNonVerifiedStreet={true} />
</GeoapifyContext>
```

### `skipSelectionOnArrowKey` (Prop)

**Type:** `boolean`
**Description:** Prevents automatic selection when navigating suggestions with arrow keys.
Useful if you want users to confirm a selection manually with *Enter*.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete skipSelectionOnArrowKey={false} />
</GeoapifyContext>
```

### `addCategorySearch` (Prop)

**Type:** `boolean`
**Description:** Enables **category-based search** (Points of Interest) using the Geoapify Places API.
When active, users can type categories like "restaurant", "hotel", or "park".

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete addCategorySearch={true} />
</GeoapifyContext>
```

### `showPlacesByCategoryList` (Prop)

**Type:** `boolean`
**Description:** Displays a list of matching POIs under the input field when category search is enabled.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete
    addCategorySearch={true}
    showPlacesByCategoryList={true}
  />
</GeoapifyContext>
```

### `hidePlacesByCategoryListAfterSelect` (Prop)

**Type:** `boolean`
**Description:** Automatically hides the POI list once a place is selected, creating a cleaner user experience.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete
    addCategorySearch={true}
    showPlacesByCategoryList={true}
    hidePlacesByCategoryListAfterSelect={true}
  />
</GeoapifyContext>
```

### `enablePlacesByCategoryLazyLoading` (Prop)

**Type:** `boolean`
**Description:** Loads more POI results dynamically as the user scrolls or requests additional data.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete
    addCategorySearch={true}
    showPlacesByCategoryList={true}
    enablePlacesByCategoryLazyLoading={true}
  />
</GeoapifyContext>
```

### `placesByCategoryLimit` (Prop)

**Type:** `number`
**Description:** Maximum number of places (POIs) displayed when category search is enabled.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete
    addCategorySearch={true}
    placesByCategoryLimit={maxPlaces}
  />
</GeoapifyContext>
```

```jsx
const maxPlaces = 10;
```

### `placesByCategoryFilter` (Prop)

**Type:** `object`
**Description:** Defines filters for category-based searches, such as location or category constraints.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete
    addCategorySearch={true}
    placesByCategoryFilter={placesByCategoryFilter}
  />
</GeoapifyContext>
```

```jsx
const placesByCategoryFilter = {
  filter: { circle: { lon: -73.935242, lat: 40.73061, radiusMeters: 5000 } }
};
```

### `placesByCategoryBias` (Prop)

**Type:** `object`
**Description:** Adds bias rules for category-based search, prioritizing results in certain areas.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete
    addCategorySearch={true}
    placesByCategoryBias={placesByCategoryBias}
  />
</GeoapifyContext>
```

```jsx
const placesByCategoryBias = {
  bias: { proximity: { lon: -73.935242, lat: 40.73061 } }
};
```

### `preprocessHook` (Prop)

**Type:** `(value: string) => string`
**Description:** A function that modifies user input before sending the geocoding request.
Useful for appending contextual data or standardizing input.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete preprocessHook={preprocessInput} />
</GeoapifyContext>
```

```jsx
const preprocessInput = (value) => `${value}, New York, USA`;
```

### `postprocessHook` (Prop)

**Type:** `(feature: any) => string`
**Description:** A function that processes or reformats the selected place before it's displayed in the input field.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete postprocessHook={formatResult} />
</GeoapifyContext>
```

```jsx
const formatResult = (feature) => `${feature.properties.street}, ${feature.properties.city}`;
```

### `suggestionsFilter` (Prop)

**Type:** `(features: any[]) => any[]`
**Description:** Filters or modifies the suggestion list before display.
Can be used to remove duplicates or limit certain results.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete suggestionsFilter={filterSuggestions} />
</GeoapifyContext>
```

```jsx
const filterSuggestions = (features) => {
  const unique = new Map();
  return features.filter(f => {
    const street = f.properties.street;
    if (unique.has(street)) return false;
    unique.set(street, true);
    return true;
  });
};
```

### `sendGeocoderRequestFunc` (Prop)

**Type:** `(value: string, geocoderAutocomplete: GeocoderAutocomplete) => Promise<any>`
**Description:** Custom function to override the default geocoder request behavior.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete sendGeocoderRequestFunc={customGeocoderRequest} />
</GeoapifyContext>
```

```jsx
const customGeocoderRequest = async (value, geocoder) => {
  // Custom implementation
  return fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=YOUR_KEY`)
    .then(res => res.json());
};
```

### `sendPlaceDetailsRequestFunc` (Prop)

**Type:** `(feature: any, geocoderAutocomplete: GeocoderAutocomplete) => Promise<any>`
**Description:** Custom function to override the default place details request behavior.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete sendPlaceDetailsRequestFunc={customDetailsRequest} />
</GeoapifyContext>
```

```jsx
const customDetailsRequest = async (feature, geocoder) => {
  // Custom implementation
  return fetch(`https://api.geoapify.com/v2/place-details?id=${feature.properties.place_id}&apiKey=YOUR_KEY`)
    .then(res => res.json());
};
```

### `sendPlacesByCategoryRequestFunc` (Prop)

**Type:** `(category: string[], offset: number, geocoderAutocomplete: GeocoderAutocomplete) => Promise<any>`
**Description:** Custom function to override the default places by category request behavior.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete sendPlacesByCategoryRequestFunc={customPlacesRequest} />
</GeoapifyContext>
```

```jsx
const customPlacesRequest = async (category, offset, geocoder) => {
  // Custom implementation
  return fetch(`https://api.geoapify.com/v2/places?categories=${category.join(',')}&limit=20&apiKey=YOUR_KEY`)
    .then(res => res.json());
};
```

### `placeSelect` (Callback)

**Type:** `(feature: any) => void`
**Description:** Triggered when a user selects a place from the autocomplete suggestions.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete placeSelect={onPlaceSelected} />
</GeoapifyContext>
```

```jsx
const onPlaceSelected = (place) => {
  console.log('Selected place:', place.properties.formatted);
};
```

### `suggestionsChange` (Callback)

**Type:** `(features: any[]) => void`
**Description:** Fired whenever the list of suggestions changes, for example, when the user types or modifies input.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete suggestionsChange={onSuggestionsChange} />
</GeoapifyContext>
```

```jsx
const onSuggestionsChange = (suggestions) => {
  console.log('Updated suggestions:', suggestions);
};
```

### `onUserInput` (Callback)

**Type:** `(input: string) => void`
**Description:** Emits every time the user types or modifies text in the input field.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete onUserInput={onUserInput} />
</GeoapifyContext>
```

```jsx
const onUserInput = (value) => {
  console.log('User input:', value);
};
```

### `onOpen` (Callback)

**Type:** `(opened: boolean) => void`
**Description:** Fired when the suggestions dropdown opens.
You can use this to apply styles or track UI state.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete onOpen={onDropdownOpen} />
</GeoapifyContext>
```

```jsx
const onDropdownOpen = (isOpen) => {
  console.log('Dropdown opened:', isOpen);
};
```

### `onClose` (Callback)

**Type:** `(opened: boolean) => void`
**Description:** Fired when the suggestions dropdown closes.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete onClose={onDropdownClose} />
</GeoapifyContext>
```

```jsx
const onDropdownClose = (isClosed) => {
  console.log('Dropdown closed:', isClosed);
};
```

### `onRequestStart` (Callback)

**Type:** `(query: string) => void`
**Description:** Fires when a geocoding request begins (after the debounce delay).
Useful for showing loading indicators.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete onRequestStart={onRequestStart} />
</GeoapifyContext>
```

```jsx
const onRequestStart = (query) => {
  setLoading(true);
};
```

### `onRequestEnd` (Callback)

**Type:** `(success: boolean, data?: any, error?: any) => void`
**Description:** Fires when a geocoding request finishes, regardless of success or failure.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete onRequestEnd={onRequestEnd} />
</GeoapifyContext>
```

```jsx
const onRequestEnd = (success, data, error) => {
  setLoading(false);
};
```

### `onPlacesByCategoryChange` (Callback)

**Type:** `(places: any[]) => void`
**Description:** Emits a list of POI (Places of Interest) results when category search is active.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete
    addCategorySearch={true}
    onPlacesByCategoryChange={onPlacesLoaded}
  />
</GeoapifyContext>
```

```jsx
const onPlacesLoaded = (places) => {
  console.log('Loaded places:', places);
};
```

### `onPlacesByCategoryRequestStart` (Callback)

**Type:** `(category: Category) => void`
**Description:** Triggered when a Places API request starts.
Useful for showing a loading spinner while fetching nearby POIs.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete
    addCategorySearch={true}
    onPlacesByCategoryRequestStart={onPlacesLoadingStart}
  />
</GeoapifyContext>
```

```jsx
const onPlacesLoadingStart = (category) => {
  setIsPlacesLoading(true);
};
```

### `onPlacesByCategoryRequestEnd` (Callback)

**Type:** `(success: boolean, data?: any, error?: any) => void`
**Description:** Fired when a Places API request completes (whether successful or not).

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete
    addCategorySearch={true}
    onPlacesByCategoryRequestEnd={onPlacesLoadingEnd}
  />
</GeoapifyContext>
```

```jsx
const onPlacesLoadingEnd = (success, data, error) => {
  setIsPlacesLoading(false);
  console.log('Places request finished successfully:', success);
};
```

### `onPlaceDetailsRequestStart` (Callback)

**Type:** `(feature: any) => void`
**Description:** Fires when a **place details** request begins — for example, when extra data for a POI is being fetched.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete onPlaceDetailsRequestStart={onDetailsRequestStart} />
</GeoapifyContext>
```

```jsx
const onDetailsRequestStart = (feature) => {
  setIsLoadingDetails(true);
};
```

### `onPlaceDetailsRequestEnd` (Callback)

**Type:** `(success: boolean, data?: any, error?: any) => void`
**Description:** Fires when a **place details** request completes, whether successful or not.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete onPlaceDetailsRequestEnd={onDetailsRequestEnd} />
</GeoapifyContext>
```

```jsx
const onDetailsRequestEnd = (success, data, error) => {
  setIsLoadingDetails(false);
  console.log('Details request success:', success);
};
```

### `onPlaceByCategorySelect` (Callback)

**Type:** `(value: {place: any, index: number}) => void`
**Description:** Fired when a POI is selected from the **places list** (not from the address suggestions).
Provides both the selected place and its index in the list.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete
    addCategorySearch={true}
    onPlaceByCategorySelect={onPlaceFromListSelected}
  />
</GeoapifyContext>
```

```jsx
const onPlaceFromListSelected = ({ place, index }) => {
  console.log('Selected POI:', place, 'at index', index);
};
```

### `onClear` (Callback)

**Type:** `(type: ItemType) => void`
**Description:** Fired when the input field or selection is cleared by the user.

**Example:**

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete onClear={onCleared} />
</GeoapifyContext>
```

```jsx
const onCleared = (type) => {
  setSelectedPlace(null);
  console.log('Input cleared, type:', type);
};
```

## Learn More

You've now explored all available props and callbacks of the React Geocoder Autocomplete component.
Continue with the following guides to see how to apply them in real projects:

* [Quick Start](quick-start.md) – set up the component in your React app.
* [Examples](examples.md) – explore common use cases and live configurations.
* [Standalone Usage](standalone-usage.md) – learn how to use the underlying JavaScript library without React.
* [Geoapify Geocoding API Docs](https://apidocs.geoapify.com/docs/geocoding) – discover the full range of address and place search features available through the API.
