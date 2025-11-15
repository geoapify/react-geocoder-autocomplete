# Standalone Usage (Without React Wrapper)

In some cases, you may want to use the `geocoder-autocomplete` library directly — without the `@geoapify/react-geocoder-autocomplete` wrapper.
This gives you full control over rendering, lifecycle, and styling, while keeping your setup lightweight.

Use the standalone version if you want to:

* Integrate address autocomplete into a non-React component or mixed environment.
* Avoid adding React-specific dependencies.
* Manage request logic, hooks, and styles manually for advanced customization.

## Benefits of Standalone Integration

1. **Zero Dependencies** – The library is pure JavaScript and does not depend on React or other frameworks, reducing bundle size and compatibility issues.
2. **Direct Control** – You decide how and when to initialize, destroy, or style the component.
3. **Flexibility** – It can be used across multiple frameworks or plain JS environments.
4. **Performance** – No React overhead, ideal for lightweight or embedded widgets.


### 1. Create a Container Element

Add a container in your JSX to host the autocomplete control. The container should have `position: relative` to position the dropdown correctly.

```jsx
<div ref={containerRef} style={{ position: 'relative' }}>
  {/* The geocoder-autocomplete control will be added here */}
</div>
```

### 2. Reference the Container with useRef

Use `useRef` to access the container element from your component.

```jsx
import { useRef } from 'react';

function YourComponent() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* Autocomplete will be rendered here */}
    </div>
  );
}
```


### 3. Initialize Geocoder-Autocomplete

In your component, create and configure a new `GeocoderAutocomplete` instance using `useEffect`.

```jsx
import { useRef, useEffect } from 'react';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';

function YourComponent() {
  const containerRef = useRef(null);
  const geocoderRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const options = {
      apiKey: 'YOUR_GEOAPIFY_API_KEY', // required for requests
      placeholder: 'Search for an address'
    };

    geocoderRef.current = new GeocoderAutocomplete(
      containerRef.current,
      options
    );

    // Optional: listen for selection
    const handleSelect = (feature) => {
      console.log('Selected place:', feature.properties.formatted);
    };

    geocoderRef.current.on('select', handleSelect);

    // Cleanup on unmount
    return () => {
      if (geocoderRef.current) {
        geocoderRef.current.off('select', handleSelect);
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* Autocomplete will be rendered here */}
    </div>
  );
}
```


### 4. Add Styles

Include one of the built-in styles in your project.
You can either import in your component or in your global stylesheet.

**Option 1: Import in Component**

```jsx
import '@geoapify/geocoder-autocomplete/styles/round-borders.css';
```

**Option 2: Import in Global CSS (`index.css` or `App.css`)**

```css
@import '@geoapify/geocoder-autocomplete/styles/minimal.css';
```


You've now integrated the `geocoder-autocomplete` widget directly into your React project — without using the wrapper.
This setup gives you complete control over initialization, styling, and API behavior.


### Geoapify API Resources

* [Geocoding API Documentation](https://apidocs.geoapify.com/docs/geocoding)
* [Place Details API Documentation](https://apidocs.geoapify.com/docs/place-details)
* [Geocoding API Playground](https://apidocs.geoapify.com/playground/geocoding)
* [Register and get your API key](https://myprojects.geoapify.com)
* [Geoapify APIs Overview](https://www.geoapify.com/)

