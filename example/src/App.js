import React, { useState } from 'react'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

const App = () => {

  const [type, setType] = useState();
  const [language, setLanguage] = useState();
  const [position, setPosition] = useState();
  const [countryCodes, setCountryCodes] = useState();
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

  function handleTypeChange(event) {
    setType(event.target.value);
  }

  function handleLanguageChange(event) {
    setLanguage(event.target.value);
  }

  function handleGeoLocationChange(event) {
    const positionName = event.target.value;
    if (positionName === 'Munich') {
      setPosition({
        lat: 48.140278,
        lon: 11.562254
      });
    } else if (positionName === 'New York') {
      setPosition({
        lat: 40.716738,
        lon: -74.001261
      });
    } else if (positionName === "Sydney") {
      setPosition({
        lat: -33.872866,
        lon: 151.212336
      });
    }
  }

  function handleCountryCodesChange(event) {
    setCountryCodes(event.target.value.split(','));
  }

  function handleLimitChange(event) {
    setLimit(event.target.value);
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
    } else if (positionName === "country") {
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

  return <div>
    <div className="setting" onChange={handleTypeChange}>
      <span className="label">Location type:</span>
      <input type="radio" value="country" name="type" /> Country
      <input type="radio" value="city" name="type" /> City
      <input type="radio" value="amenity" name="type" /> Amenity
    </div>

    <div className="setting" onChange={handleLanguageChange}>
      <span className="label">Language:</span>
      <input type="radio" value="de" name="language" /> German
      <input type="radio" value="it" name="language" /> Italian
      <input type="radio" value="fr" name="language" /> French
      <input type="radio" value="ru" name="language" /> Russian
    </div>

    <div className="setting" onChange={handleGeoLocationChange}>
      <span className="label">Location bias:</span>
      <input type="radio" value="Munich" name="position" /> Munich
      <input type="radio" value="New York" name="position" /> New York
      <input type="radio" value="Sydney" name="position" /> Sydney
    </div>

    <div className="setting" onChange={handleCountryCodesChange}>
      <span className="label">Contries:</span>
      <input type="radio" value="us" name="country" /> USA
      <input type="radio" value="de,au" name="country" /> Germany and Austria
      <input type="radio" value="ru,be" name="country" /> Russia and Belarus
    </div>

    <div className="setting" onChange={handleLimitChange}>
      <span className="label">Limit:</span>
      <input type="radio" value="2" name="limit" /> 2
      <input type="radio" value="5" name="limit" /> 5
      <input type="radio" value="10" name="limit" /> 10
    </div>

    <div className="setting" onChange={handleValueChange}>
      <span className="label">Value:</span>
      <input type="radio" value="Munich" name="value" /> Munich
      <input type="radio" value="New York" name="value" /> New York
      <input type="radio" value="Sydney" name="value" /> Sydney
    </div>

    <div className="setting" onChange={handleFilterChange}>
      <span className="label">Filter:</span>
      <input type="radio" value="none" name="filter" /> None
      <input type="radio" value="country" name="filter" /> By Country (it,ch)
      <input type="radio" value="circle" name="filter" /> By circle (Moscow + 100km)
      <input type="radio" value="rect" name="filter" /> By Rect (New York)
      <input type="radio" value="place" name="filter" /> By Place (51ac66e77e9826274059f9426dc08c114840f00101f901dcf3000000000000c00208)
    </div>

    <div className="setting" onChange={handleBiasChange}>
      <span className="label">Bias:</span>
      <input type="radio" value="none" name="bias" /> None
      <input type="radio" value="country" name="bias" /> By country (Australia)
      <input type="radio" value="circle" name="bias" /> By Circle (Singapore + 100km)
      <input type="radio" value="rect" name="bias" /> By Rect (Panama)
      <input type="radio" value="proximity" name="bias" /> By Proximity (Lisboa)
    </div>

    <GeoapifyContext apiKey="00a9862ac01f454887fc285e220d8460">

      <GeoapifyGeocoderAutocomplete
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggectionChange}
        onUserInput={onUserInput}
        onOpen={onOpen}
        onClose={onClose}
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
        filterByPlace={filterByPlace}
        biasByCountryCode={biasByCountryCode}
        biasByCircle={biasByCircle}
        biasByRect={biasByRect}
        biasByProximity={biasByProximity}
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggectionChange}
        skipIcons={true}
        skipDetails={true}
        skipSelectionOnArrowKey={true}
        allowNonVerifiedHouseNumber={true}
        allowNonVerifiedStreet={true}
      />

      <GeoapifyGeocoderAutocomplete
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggectionChange}
        preprocessHook={preprocessHook}
        postprocessHook={postprocessHook}
        suggestionsFilter={suggestionsFilter}
      />

    </GeoapifyContext>
  </div>
}

export default App
