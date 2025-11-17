import React, { useState } from 'react';
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext
} from '@geoapify/react-geocoder-autocomplete';
import { GEOAPIFY_API_KEY } from '../config';
import '../CustomStyles.css';
import './PlaygroundDemo.css';

const PlaygroundDemo = () => {
  const [type, setType] = useState();
  const [language, setLanguage] = useState();
  const [debounceDelay, setDebounceDelay] = useState();
  const [limit, setLimit] = useState();
  const [value, setValue] = useState('');
  const [filterByCountryCode, setFilterByCountryCode] = useState();
  const [filterByCircle, setFilterByCircle] = useState();
  const [filterByRect, setFilterByRect] = useState();
  const [filterByPlace, setFilterByPlace] = useState();
  const [biasByCountryCode, setBiasByCountryCode] = useState();
  const [biasByCircle, setBiasByCircle] = useState();
  const [biasByRect, setBiasByRect] = useState();
  const [biasByProximity, setBiasByProximity] = useState();
  const [isLoading, setIsLoading] = useState(false);

  function handleTypeChange(event) {
    setType(event.target.value);
  }

  function handleLanguageChange(event) {
    setLanguage(event.target.value);
  }

  function handleGeoLocationChange(event) {
    const positionName = event.target.value;
    if (positionName === 'Munich') {
      setBiasByProximity({
        lat: 48.140278,
        lon: 11.562254
      });
    } else if (positionName === 'New York') {
      setBiasByProximity({
        lat: 40.716738,
        lon: -74.001261
      });
    } else if (positionName === "Sydney") {
      setBiasByProximity({
        lat: -33.872866,
        lon: 151.212336
      });
    }
  }

  function handleCountryCodesChange(event) {
    setFilterByCountryCode(event.target.value.split(','));
  }

  function handleLimitChange(event) {
    setLimit(event.target.value);
  }

  function handleDebounceDelayChange(event) {
    setDebounceDelay(event.target.value);
  }

  function handleValueChange(event) {
    setValue(event.target.value);
  }

  function handleFilterChange(event) {
    const positionName = event.target.value;
    if (positionName === 'none') {
      setFilterByCountryCode(null);
      setFilterByRect(null);
      setFilterByCircle(null);
      setFilterByPlace(null)
    } else if (positionName === 'circle') {
      setFilterByCircle({ lat: 55.75638407268255, lon: 37.599963771743774, radiusMeters: 100000 });
      setFilterByCountryCode(null);
      setFilterByRect(null);
      setFilterByPlace(null)
    } else if (positionName === "rect") {
      setFilterByCircle(null);
      setFilterByCountryCode(null);
      setFilterByRect({ lat1: 40.30722603742393, lon1: -74.64393682324243, lat2: 41.09089986660214, lon2: -73.26457192453972 });
      setFilterByPlace(null)
    } else if (positionName === "country") {
      setFilterByRect(null);
      setFilterByCircle(null);
      setFilterByCountryCode(['it', 'ch'])
      setFilterByPlace(null)
    } else if (positionName === "place") {
      setFilterByRect(null);
      setFilterByCircle(null);
      setFilterByCountryCode(null)
      setFilterByPlace('51ac66e77e9826274059f9426dc08c114840f00101f901dcf3000000000000c00208')
    }
  }

  function handleBiasChange(event) {
    const positionName = event.target.value;
    if (positionName === 'none') {
      setBiasByCountryCode(null);
      setBiasByRect(null);
      setBiasByCircle(null);
      setBiasByProximity(null);
    } else if (positionName === 'circle') {
      setBiasByCountryCode(null);
      setBiasByRect(null);
      setBiasByProximity(null);
      setBiasByCircle({ lat: 1.3132160633313674, lon: 103.74138874820653, radiusMeters: 100000 });
    } else if (positionName === "rect") {
      setBiasByCountryCode(null);
      setBiasByCircle(null);
      setBiasByProximity(null);
      setBiasByRect({ lat1: 3.162983444447292, lon1: -85.96878977760184, lat2: 11.917122016913211, lon2: -74.64581654099129 });
    } else if (positionName === "country") {
      setBiasByRect(null);
      setBiasByCircle(null);
      setBiasByProximity(null);
      setBiasByCountryCode(['au'])
    } else if (positionName === "proximity") {
      setBiasByCountryCode(null);
      setBiasByRect(null);
      setBiasByCircle(null);
      setBiasByProximity({ lat: 38.724643206383064, lon: -9.1558806969947 });
    }
  }

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

  function onUserInput(input) {
    console.log(input);
  }

  function onOpen(opened) {
    console.log(opened);
  }

  function onClose(opened) {
    console.log(opened);
  }

  function sendGeocoderRequest(value, geocoder) {
    console.log(value);
    return geocoder.sendGeocoderRequest(value);
  }

  function sendPlaceDetailsRequest(feature, geocoder) {
    console.log(feature);
    return geocoder.sendPlaceDetailsRequest(feature);
  }

  function onRequestStart(value) {
    console.log('🔄 Starting geocoding request for:', value);
    setIsLoading(true);
  }

  function onRequestEnd(success, data, error) {
    console.log(success ? '✅ Geocoding request successful:' : '❌ Geocoding request failed:', success ? data : error);
    setIsLoading(false);
  }

  return <div className="playground-demo">
    <div className="container">
      <h1>Playground: All Features & Options</h1>
      <p className="hint">Experiment with all available configuration options and features.</p>

      <div className="setting" onChange={handleTypeChange}>
        <span className="label">Location type:</span>
        <div className="options">
          <label><input type="radio" value="country" name="type" /> Country</label>
          <label><input type="radio" value="city" name="type" /> City</label>
          <label><input type="radio" value="amenity" name="type" /> Amenity</label>
        </div>
      </div>

      <div className="setting" onChange={handleLanguageChange}>
        <span className="label">Language:</span>
        <div className="options">
          <label><input type="radio" value="de" name="language" /> German</label>
          <label><input type="radio" value="it" name="language" /> Italian</label>
          <label><input type="radio" value="fr" name="language" /> French</label>
          <label><input type="radio" value="ru" name="language" /> Russian</label>
        </div>
      </div>

      <div className="setting" onChange={handleGeoLocationChange}>
        <span className="label">Location bias:</span>
        <div className="options">
          <label><input type="radio" value="Munich" name="position" /> Munich</label>
          <label><input type="radio" value="New York" name="position" /> New York</label>
          <label><input type="radio" value="Sydney" name="position" /> Sydney</label>
        </div>
      </div>

      <div className="setting" onChange={handleCountryCodesChange}>
        <span className="label">Countries:</span>
        <div className="options">
          <label><input type="radio" value="us" name="country" /> USA</label>
          <label><input type="radio" value="de,au" name="country" /> Germany and Austria</label>
          <label><input type="radio" value="ru,be" name="country" /> Russia and Belarus</label>
        </div>
      </div>

      <div className="setting" onChange={handleLimitChange}>
        <span className="label">Limit:</span>
        <div className="options">
          <label><input type="radio" value="2" name="limit" /> 2</label>
          <label><input type="radio" value="5" name="limit" /> 5</label>
          <label><input type="radio" value="10" name="limit" /> 10</label>
        </div>
      </div>

      <div className="setting" onChange={handleDebounceDelayChange}>
        <span className="label">Delay:</span>
        <div className="options">
          <label><input type="radio" value="100" name="delay" /> 100ms</label>
          <label><input type="radio" value="300" name="delay" /> 300ms</label>
          <label><input type="radio" value="500" name="delay" /> 500ms</label>
        </div>
      </div>

      <div className="setting" onChange={handleValueChange}>
        <span className="label">Value:</span>
        <div className="options">
          <label><input type="radio" value="Munich" name="value" /> Munich</label>
          <label><input type="radio" value="New York" name="value" /> New York</label>
          <label><input type="radio" value="Sydney" name="value" /> Sydney</label>
        </div>
      </div>

      <div className="setting" onChange={handleFilterChange}>
        <span className="label">Filter:</span>
        <div className="options">
          <label><input type="radio" value="none" name="filter" /> None</label>
          <label><input type="radio" value="country" name="filter" /> By Country (it,ch)</label>
          <label><input type="radio" value="circle" name="filter" /> By circle (Moscow + 100km)</label>
          <label><input type="radio" value="rect" name="filter" /> By Rect (New York)</label>
          <label><input type="radio" value="place" name="filter" /> By Place</label>
        </div>
      </div>

      <div className="setting" onChange={handleBiasChange}>
        <span className="label">Bias:</span>
        <div className="options">
          <label><input type="radio" value="none" name="bias" /> None</label>
          <label><input type="radio" value="country" name="bias" /> By country (Australia)</label>
          <label><input type="radio" value="circle" name="bias" /> By Circle (Singapore + 100km)</label>
          <label><input type="radio" value="rect" name="bias" /> By Rect (Panama)</label>
          <label><input type="radio" value="proximity" name="bias" /> By Proximity (Lisboa)</label>
        </div>
      </div>

      <GeoapifyContext apiKey={GEOAPIFY_API_KEY}>
        {/* Example: Custom styled input with blue theme and loading */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#2c3e50', fontSize: '18px', marginBottom: '10px' }}>🎨 Custom Styled Input with Loading</h3>
          <p style={{ color: '#7f8c8d', fontSize: '14px', marginBottom: '10px' }}>
            This input demonstrates loading state management using <code>onRequestStart</code> and <code>onRequestEnd</code> callbacks.
          </p>
          <div className={`custom-blue-theme loading-input-container ${isLoading ? 'active' : ''}`}>
            <GeoapifyGeocoderAutocomplete
              placeholder="Type to see loading states..."
              placeSelect={onPlaceSelect}
              suggestionsChange={onSuggectionChange}
              onUserInput={onUserInput}
              onOpen={onOpen}
              onClose={onClose}
              onRequestStart={onRequestStart}
              onRequestEnd={onRequestEnd}
              allowNonVerifiedHouseNumber={true}
            />
          </div>
        </div>

        <hr style={{ margin: '20px 0', border: '1px solid #e1e8ed' }} />

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#2c3e50', fontSize: '18px', marginBottom: '10px' }}>📝 Default Theme Examples</h3>
          <p style={{ color: '#7f8c8d', fontSize: '14px', marginBottom: '15px' }}>
            All inputs below use different configurations and options.
          </p>
        </div>

        <GeoapifyGeocoderAutocomplete
          placeholder="Enter address here"
          value={value}
          type={type}
          lang={language}
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
          suggestionsChange={onSuggectionChange}
          onRequestStart={onRequestStart}
          onRequestEnd={onRequestEnd}
          skipIcons={true}
          skipSelectionOnArrowKey={true}
          allowNonVerifiedHouseNumber={true}
          allowNonVerifiedStreet={true}
          debounceDelay={debounceDelay}
        />

        <GeoapifyGeocoderAutocomplete
          placeSelect={onPlaceSelect}
          suggestionsChange={onSuggectionChange}
          preprocessHook={preprocessHook}
          postprocessHook={postprocessHook}
          suggestionsFilter={suggestionsFilter}
        />

        <GeoapifyGeocoderAutocomplete
          sendGeocoderRequestFunc={sendGeocoderRequest}
          addDetails={true}
          sendPlaceDetailsRequestFunc={sendPlaceDetailsRequest}
        />
      </GeoapifyContext>
    </div>
  </div>
}

export default PlaygroundDemo;

