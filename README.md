# React Geocoder Autocomplete

The @geoapify/react-geocoder-autocomplete component serves as an interface to the [@geoapify/geocoder-autocomplete](https://www.npmjs.com/package/@geoapify/geocoder-autocomplete) library, seamlessly integrating its capabilities into React-based applications. This integration harnesses the power of the [Geoapify Geocoding Autocomplete](https://www.geoapify.com/address-autocomplete/) service for advanced address search functionality.

Address autocomplete is a feature that enhances user experience and accuracy when entering location-based information, particularly addresses. It's a technology often used in web and mobile applications to assist users in quickly and accurately inputting addresses by providing real-time suggestions as they type.

![Geocoder Autocomplete](https://github.com/geoapify/geocoder-autocomplete/blob/9b46b3e458d18b45e2957298e8833f830ed6252a/img/address-autocomplete-example.png?raw=true)
## Installation

`@geoapify/react-geocoder-autocomplete` relies on **@geoapify/geocoder-autocomplete** as a peer dependency. To include both packages in your project, you can use the following commands:

Using npm:

```bash
npm install @geoapify/geocoder-autocomplete @geoapify/react-geocoder-autocomplete
```

Using Yarn:

```bash
yarn add @geoapify/geocoder-autocomplete @geoapify/react-geocoder-autocomplete
```

This ensures that both the React wrapper and the underlying geocoder-autocomplete library are correctly installed and compatible with each other in your project.

## Compatibility Table
| @geoapify/react-geocoder-autocomplete | React |
|----------------------------------------|-------|
| 1.0.x                                  | >= 16.8.0 |
| 1.1.x                                  | >= 16.8.0 |
| 1.2.x                                  | >= 17.0.0 |
| 1.3.x                                  | >= 17.0.0 |
| 1.4.x                                  | >= 18.0.0 |
| 1.5.x                                  | >= 18.0.0 |
| 2.0.x                                  | >= 18.0.0 |

This table provides compatibility information between different versions of **@geoapify/react-geocoder-autocomplete** and the required minimum version of React. Make sure to choose the appropriate version based on your React project's version.

Certainly, here's a complete "Getting Started" guide for using the `@geoapify/react-geocoder-autocomplete` library in your React project:

## Getting Started

Geoapify Geocoder Autocomplete simplifies address search in your React applications. Follow these steps to get started:

### Obtaining Your API Key

Before integrating the `@geoapify/react-geocoder-autocomplete` library into your project, you must acquire an API key from Geoapify. Here's a step-by-step guide:

1. **Register for a Geoapify Account:** If you don't already have a Geoapify account, visit [Geoapify My Projects](https://myprojects.geoapify.com/) and sign up for a free account.

2. **Create a New Project:** After registering and logging in, create a new project in your Geoapify account.

3. **Generate an API Key:** Within your project settings, you can generate a new API key. Customize the key's settings according to your project's requirements. Once configured, generate the API key. Be sure to copy it because you'll need it to authenticate and use Geoapify services in your React project.

### Integrate the Geocoder Autocomplete Component

To integrate the `@geoapify/react-geocoder-autocomplete` component into your React project, follow these steps:

1. **Import Styles:**
   Import the CSS style file from `@geoapify/geocoder-autocomplete` to ensure the control appears correctly. You can choose from various styles like `minimal`, `round-borders`, `minimal-dark`, or `round-borders-dark`, depending on your webpage's background color.

   ```tsx
   import '@geoapify/geocoder-autocomplete/styles/minimal.css';
   ```

2. **Add Geoapify Context and Provide API Key:**
   Wrap your component with the `GeoapifyContext` and provide your Geoapify API key as a prop. This context will enable the component to authenticate and use Geoapify services.

   ```tsx
   import { GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';

   // Inside your component...
   <GeoapifyContext apiKey="YOUR_API_KEY_HERE">
     {/* Your Geoapify Geocoder Autocomplete components go here */}
   </GeoapifyContext>
   ```

   Replace `"YOUR_API_KEY_HERE"` with your actual Geoapify API key.

3. **Add Geoapify Geocoder Autocomplete Component:**
   You can add one or more instances of the `GeoapifyGeocoderAutocomplete` component within the `GeoapifyContext`. Customize the component by passing various props like `placeholder`, `value`, `type`, `lang`, and more, based on your specific requirements.

   Here's an example of using the component with different props and callback functions:

  ```tsx
  import '@geoapify/geocoder-autocomplete/styles/minimal.css';
  import {
    GeoapifyGeocoderAutocomplete,
    GeoapifyContext
  } from '@geoapify/react-geocoder-autocomplete';

  ...
   <GeoapifyContext apiKey="YOUR_API_KEY">
    <GeoapifyGeocoderAutocomplete
      placeholder="Enter address here"
      value={value}
      type={type}
      lang={language}
      position={position}
      countryCodes={countryCodes}
      limit={limit}
      filterByCountryCode={filterByCountryCode}
      filterByCircle={filterByCircle}
      filterByRect={filterByRect}
      filterByPlace={filterByPlace}
      biasByCountryCode={biasByCountryCode}
      biasByCircle={biasByCircle}
      biasByRect={biasByRect}
      biasByProximity={biasByProximity}
      placeSelect={onPlaceSelect}
      suggestionsChange={onSuggestionChange}
    />
  </GeoapifyContext>
  ```

  Customize the props to meet your project's needs, and handle events like `placeSelect` and `suggestionsChange` by specifying callback functions as shown in the example.

Optionally, you can use preprocessing and postprocessing hooks, as well as suggestions filtering, by providing the respective functions as props to the `GeoapifyGeocoderAutocomplete` component. These functions allow you to modify user input and search results to fit your application's requirements.

By following these steps and configuring the `GeoapifyGeocoderAutocomplete` component with the necessary props and callbacks, you can seamlessly integrate address autocomplete functionality into your React project while customizing it to your specific needs.

## API documentation

Here are the props for the `GeoapifyGeocoderAutocomplete` component:

| Prop                           | Type                                                                                                   | Description                                                                                                                                                                                                                                  |
|--------------------------------|--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `placeholder`                   | string                                                                                                 | Placeholder text for the input field.                                                                                                                                                                                                                                                                     |
| `type`                          | GeocoderAutocomplete.LocationType                                                                                           | The type of location to search for (e.g., 'city', 'postcode', 'street'). Default is 'city'.                                                                                                                                                                                                               |
| `lang`                          | GeocoderAutocomplete.SupportedLanguage                                                                                      | The language for search suggestions. Default is 'en'.                                                                                                                                                                                                                                                     |
| `limit`                         | number                                                                                                 | The maximum number of suggestions to display. Default is 5.                                                                                                                                                                                                                                                |
| `value`                         | string                                                                                                 | The initial input value.                                                                                                                                                                                                                                                                                  |
| `filterByCountryCode`           | GeocoderAutocomplete.ByCountryCodeOptions                                                                                   | Filter suggestions by country code(s).                                                                                                                                                                                                                                                                    |
| `filterByPlace`                 | string                                                                                                 | Filter suggestions by a specific place (e.g., 'New York').                                                                                                                                                                                                                                                  |
| `filterByCircle`                | GeocoderAutocomplete.ByCircleOptions                                                                                        | Filter suggestions by a circular area.                                                                                                                                                                                                                                                                     |
| `filterByRect`                  | GeocoderAutocomplete.ByRectOptions                                                                                          | Filter suggestions by a rectangular area.                                                                                                                                                                                                                                                                  |
| `biasByCountryCode`             | GeocoderAutocomplete.ByCountryCodeOptions                                                                                   | Bias suggestions by country code(s).                                                                                                                                                                                                                                                                       |
| `biasByCircle`                  | GeocoderAutocomplete.ByCircleOptions                                                                                        | Bias suggestions by a circular area.                                                                                                                                                                                                                                                                        |
| `biasByRect`                    | GeocoderAutocomplete.ByRectOptions                                                                                          | Bias suggestions by a rectangular area.                                                                                                                                                                                                                                                                     |
| `biasByProximity`               | GeocoderAutocomplete.ByProximityOptions                                                                                     | Bias suggestions by proximity to a location.                                                                                                                                                                                                                                                                |
| `debounceDelay`                 | number                                                                                                 | Delay in milliseconds to wait for user input before triggering suggestions. Default is 100.                                                                                                                                                                                                               |
| `skipIcons`                     | boolean                                                                                                | Whether to skip displaying icons in suggestions. Default is false.                                                                                                                                                                                                                                         |
| `addDetails`                    | boolean                                                                                                | Whether to add detailed place information to suggestions. Default is false.                                                                                                                                                                                                                                 |
| `skipSelectionOnArrowKey`       | boolean                                                                                                | Whether to skip selecting suggestions when using arrow keys. Default is false.                                                                                                                                                                                                                              |
| `allowNonVerifiedHouseNumber`   | boolean                                                                                                | Whether to allow non-verified house numbers in suggestions. Default is false.                                                                                                                                                                                                                               |
| `allowNonVerifiedStreet`        | boolean                                                                                                | Whether to allow non-verified streets in suggestions. Default is false.                                                                                                                                                                                                                                     |
| `placeSelect`                   | (value: GeoJSON.Feature) => void                                                                                   | Callback function when a place is selected.                                                                                                                                                                                                                                                                |
| `suggestionsChange`             | (values: GeoJSON.Feature[]) => void                                                                                   | Callback function when suggestions change.                                                                                                                                                                                                                                                                 |
| `preprocessHook`                | (value: string) => string                                                                              | Preprocessing hook for user input.                                                                                                                                                                                                                                                                         |
| `postprocessHook`               | (feature: GeoJSON.Feature) => string                                                                               | Postprocessing hook for selected suggestions.                                                                                                                                                                                                                                                              |
| `suggestionsFilter`             | (suggestions: GeoJSON.Feature[]) => any[]                                                                         | Custom filter for suggestions.                                                                                                                                                                                                                                                                             |
| `sendGeocoderRequestFunc`       | (value: string, geocoderAutocomplete: GeocoderAutocomplete) => Promise<GeoJSON.FeatureCollection>                             | Custom function to send geocoder requests.                                                                                                                                                                                                                                                                  |
| `sendPlaceDetailsRequestFunc`   | (feature: GeoJSON.Feature, geocoderAutocomplete: GeocoderAutocomplete) => Promise<GeoJSON.Feature>                             | Custom function to send place details requests.                                                                                                                                                                                                                                                             |
| `onUserInput`                   | (input: string) => void                                                                               | Callback function when user input changes.                                                                                                                                                                                                                                                                 |
| `onOpen`                        | (opened: boolean) => void                                                                            | Callback function when the suggestions dropdown opens.                                                                                                                                                                                                                                                      |
| `onClose`                       | (opened: boolean) => void                                                                            | Callback function when the suggestions dropdown closes.                                                                                                                                                                                                                                                     |

These props allow you to configure and customize the behavior of the `GeoapifyGeocoderAutocomplete` component in your React application.

You can apply multiple filters simultaneously, and the **AND** logic is used to combine these filters. Similarly, you can utilize multiple bias parameters concurrently, and the **OR** logic is employed to combine these biases.

The component does not have a dependency on [@types/geojson](https://www.npmjs.com/package/@types/geojson). Nevertheless, you have the option to install it if you intend to work with GeoJSON types.


**Explore More:**
- [Geoapify Maps and APIs](https://www.geoapify.com/)
- [Geoapify Address Autocomplete Playground](https://apidocs.geoapify.com/playground/geocoding/#autocomplete)
- [Geoapify Address Autocomplete Docs](https://apidocs.geoapify.com/docs/geocoding/address-autocomplete/#autocomplete)