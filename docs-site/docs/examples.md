# Examples

This section shows practical examples of using the `<GeoapifyGeocoderAutocomplete>` component in different configurations.
Each snippet demonstrates how to combine props and callbacks to create flexible address search fields for your React app.

## Simple Address Input Field

A minimal setup that displays an address input and listens for place selection events.

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete
    placeholder="Search for an address"
    placeSelect={onPlaceSelected}
  />
</GeoapifyContext>
```

```jsx
const onPlaceSelected = (place) => {
  console.log('Selected place:', place.properties.formatted);
};
```
**Used properties:**

* `placeholder` – displays hint text inside the input field.
* `placeSelect` – event emitted when a user selects a place from the suggestions.


## Search for Cities in a country

This setup limits suggestions to US cities and requests additional place details, such as boundaries when available.

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete
    type="city"
    filterByCountryCode={['us']}
    addDetails={true}
    placeholder="Search for a city in the US"
    placeSelect={onCitySelected}
  />
</GeoapifyContext>
```

```jsx
const onCitySelected = (place) => {
  console.log('City:', place.properties.city);
  console.log('Boundary:', place.properties.bounds);
};
```

**Used properties:**

* `type="city"` – restricts suggestions to cities only.
* `filterByCountryCode={['us']}` – limits results to the United States.
* `addDetails={true}` – requests extended details, including geometry data like city boundaries.
* `placeSelect` – event triggered when a city is selected.


## Bias Results Using User Location

This example uses the browser's geolocation API to detect the user's position and bias autocomplete suggestions toward nearby results.

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete
    placeholder="Search nearby places"
    biasByProximity={userLocation}
    placeSelect={onPlaceSelected}
  />
</GeoapifyContext>
```

```jsx
const [userLocation, setUserLocation] = useState(null);

useEffect(() => {
  navigator.geolocation.getCurrentPosition((pos) => {
    setUserLocation({
      lon: pos.coords.longitude,
      lat: pos.coords.latitude
    });
  });
}, []);

const onPlaceSelected = (place) => {
  console.log('Selected place:', place.properties.formatted);
};
```

**Used properties:**

* `biasByProximity` – prioritizes results near the provided coordinates.
* `placeholder` – displays guidance text inside the input field.
* `placeSelect` – emits the selected place once a suggestion is chosen.

## Showing a Loading Indicator During Search

This example displays a simple loading spinner while the autocomplete sends a request and hides it once the results are received.

```jsx
<div className="autocomplete-wrapper">
  <GeoapifyContext apiKey="YOUR_API_KEY">
    <GeoapifyGeocoderAutocomplete
      placeholder="Search for an address"
      onRequestStart={() => setIsLoading(true)}
      onRequestEnd={() => setIsLoading(false)}
      placeSelect={onPlaceSelected}
    />
  </GeoapifyContext>

  {isLoading && <div className="loader">Loading...</div>}
</div>
```

```jsx
const [isLoading, setIsLoading] = useState(false);

const onPlaceSelected = (place) => {
  console.log('Selected place:', place.properties.formatted);
};
```

**Used properties:**

* `onRequestStart` – fires when a geocoding request starts.
* `onRequestEnd` – fires when the request completes (success or failure).
* `placeSelect` – emits the selected place from suggestions.
* `placeholder` – text displayed inside the input field.


## Searching for Places by Category

This example enables category-based (POI) search using the Geoapify Places API.
Users can type categories like *restaurant*, *hotel*, or *pharmacy* to find nearby points of interest.

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete
    addCategorySearch={true}
    showPlacesByCategoryList={true}
    enablePlacesByCategoryLazyLoading={true}
    placesByCategoryLimit={10}
    placeholder="Search for restaurants, hotels, or shops"
    onPlacesByCategoryChange={onPlacesLoaded}
    placeSelect={onPlaceSelected}
    onPlaceByCategorySelect={onPlaceFromListSelected}
  />
</GeoapifyContext>
```

```jsx
const onPlacesLoaded = (places) => {
  console.log('Loaded POIs:', places);
};

const onPlaceSelected = (place) => {
  console.log('Selected address:', place.properties.formatted);
};

const onPlaceFromListSelected = ({ place, index }) => {
  console.log('Selected POI:', place.properties.name);
};
```

**Used properties:**

* `addCategorySearch` – enables category-based POI search.
* `showPlacesByCategoryList` – displays a list of nearby POIs below the input field.
* `enablePlacesByCategoryLazyLoading` – dynamically loads additional POIs as the user scrolls.
* `placesByCategoryLimit` – sets the maximum number of POIs to display.
* `onPlacesByCategoryChange` – emits when POIs are loaded from the Places API.
* `placeSelect` – emits when a user selects an address suggestion.
* `onPlaceByCategorySelect` – emits when a POI is selected from the list.
* `placeholder` – shows guidance text inside the input field.

## Preprocessing User Input with Filter by Area

This example shows how to combine `preprocessHook` with `filterByRect` to focus searches on a specific region — in this case, **Berlin**.
The hook appends "Berlin" to each query, while the bounding box filter limits results to the city's area.

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete
    placeholder="Search for an address in Berlin"
    preprocessHook={addCityToQuery}
    filterByRect={berlinBbox}
    placeSelect={onPlaceSelected}
  />
</GeoapifyContext>
```

```jsx
// Approximate bounding box for Berlin
const berlinBbox = {
  lon1: 13.0884,  // west
  lat1: 52.3383,  // south
  lon2: 13.7611,  // east
  lat2: 52.6755   // north
};

const addCityToQuery = (value) => {
  // Ensure the city name is always part of the query
  return `${value}, Berlin`;
};

const onPlaceSelected = (place) => {
  console.log('Selected place:', place.properties.formatted);
};
```

**Used properties:**

* `preprocessHook` – appends "Berlin" to user queries.
* `filterByRect` – restricts results to Berlin's geographic area.
* `placeholder` – displays hint text inside the input field.
* `placeSelect` – fires when a user selects a search result.


## Filtering Suggestions Programmatically

Use `suggestionsFilter` to modify the suggestion list before it's displayed.
This example removes duplicates by street name and excludes results without a house number.

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY">
  <GeoapifyGeocoderAutocomplete
    placeholder="Search address"
    suggestionsFilter={filterSuggestions}
    placeSelect={onPlaceSelected}
  />
</GeoapifyContext>
```

```jsx
const filterSuggestions = (features) => {
  const seen = new Set();

  return features.filter((f) => {
    const props = f?.properties || {};
    const street = props.street;
    const hasHouseNumber = Boolean(props.housenumber);

    if (!street || !hasHouseNumber) return false;
    if (seen.has(street)) return false;

    seen.add(street);
    return true;
  });
};

const onPlaceSelected = (place) => {
  console.log('Selected:', place.properties.formatted);
};
```

**Used properties:**

* `suggestionsFilter` – filters or reshapes suggestions before rendering.
* `placeholder` – hint text for the input.
* `placeSelect` – emits when a suggestion is chosen.

## Learn More

Explore more examples and customization options to get the most out of the React Geocoder Autocomplete component:

* [Quick Start](quick-start.md) – learn how to install and integrate the component in your React app.
* [API Reference](api-reference.md) – detailed list of all props, callbacks, and customization hooks.
* [Standalone Usage](standalone-usage.md) – use the core JavaScript library without React.
* [Geoapify Geocoding API Docs](https://apidocs.geoapify.com/docs/geocoding) – explore available endpoints and parameters.
* [Geoapify Address Autocomplete Guide](https://www.geoapify.com/address-autocomplete/) – learn about the underlying service powering autocomplete suggestions.
* [@geoapify/geocoder-autocomplete on npm](https://www.npmjs.com/package/@geoapify/geocoder-autocomplete) – see more live demos and usage examples.
