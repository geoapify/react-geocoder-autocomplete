# Quick Start

The React Geocoder Autocomplete component integrates the [@geoapify/geocoder-autocomplete](https://www.npmjs.com/package/@geoapify/geocoder-autocomplete) library into React, enabling advanced address search powered by the [Geoapify Geocoding Autocomplete](https://www.geoapify.com/address-autocomplete/) service.

## Installation

The `@geoapify/react-geocoder-autocomplete` package has a peer dependency on **@geoapify/geocoder-autocomplete**.  
Install both dependencies using either npm or yarn:

```bash
npm install @geoapify/geocoder-autocomplete @geoapify/react-geocoder-autocomplete
# or
yarn add @geoapify/geocoder-autocomplete @geoapify/react-geocoder-autocomplete

```

## Getting a Geoapify API Key

To use the component, you need a **Geoapify API key**.

1. Sign up at [myprojects.geoapify.com](https://myprojects.geoapify.com/) and create a project.
2. Copy your API key from the project dashboard.
3. Start with the **Free plan** (5 requests/sec) and upgrade as needed.
4. Store the key securely — for example, in an `.env` file:

```bash
REACT_APP_GEOAPIFY_KEY=YOUR_API_KEY
```

## Integrating the Component into Your React Project

### 1. Importing Styles

The autocomplete control comes with prebuilt CSS themes from **@geoapify/geocoder-autocomplete**.
You can include these styles in your React project in one of two ways.

#### Option 1: Import in Component

```jsx
import '@geoapify/geocoder-autocomplete/styles/round-borders.css';
```

#### Option 2: Import in your global stylesheet

```css
@import '@geoapify/geocoder-autocomplete/styles/minimal.css';
```

**Available themes:**

* `minimal` or `round-borders` — for light backgrounds
* `minimal-dark` or `round-borders-dark` — for dark backgrounds

You can also override styles using custom CSS variables or by extending Geoapify's base classes.

### 2. Using the component

```jsx
import React from 'react';
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext
} from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';

function App() {
  const onPlaceSelect = (place) => {
    console.log('Selected:', place);
  };

  return (
    <GeoapifyContext apiKey="YOUR_API_KEY_HERE">
      <GeoapifyGeocoderAutocomplete
        placeholder="Enter address here"
        placeSelect={onPlaceSelect}
      />
    </GeoapifyContext>
  );
}

export default App;
```

Basic usage:

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY_HERE">
  <GeoapifyGeocoderAutocomplete />
</GeoapifyContext>
```

Listen to key events:

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY_HERE">
  <GeoapifyGeocoderAutocomplete
    placeSelect={onPlaceSelect}
    suggestionsChange={onSuggestionsChange}
    onUserInput={onUserInput}
  />
</GeoapifyContext>
```

Configure common options:

```jsx
<GeoapifyContext apiKey="YOUR_API_KEY_HERE">
  <GeoapifyGeocoderAutocomplete
    lang="en"
    limit={10}
    filterByCountryCode={['us', 'ca']}
    biasByProximity={{ lon: -73.935242, lat: 40.73061 }}
    addDetails={true}
  />
</GeoapifyContext>
```

Example handlers:

```jsx
const onPlaceSelect = (place) => { /* use selected GeoJSON feature */ };
const onSuggestionsChange = (list) => { /* react to updated list */ };
const onUserInput = (value) => { /* track user input */ };
```

### Next Steps

Now that you've added the component and verified it works, you can:

1. **Explore configuration options**
   Learn more about all available props and callbacks in the [API Reference](api-reference.md).

2. **See working code examples**
   Check [Examples](examples.md) for common setups, like filtered searches, localized results, and custom styling.

3. **Use it without React dependency**
   If you prefer direct integration of the core JavaScript library, follow the [Standalone Usage](standalone-usage.md) guide.

4. **Read about Geoapify APIs**
   Understand how the component interacts with the backend:

   * [Geocoding API](https://apidocs.geoapify.com/docs/geocoding)
   * [Places API](https://apidocs.geoapify.com/docs/places)
   * [Geoapify Playground](https://apidocs.geoapify.com/playground/geocoding)

