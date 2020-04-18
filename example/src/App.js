import React, { useState } from 'react'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from 'react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

const App = () => {

  const [type, setType] = useState();
  const [language, setLanguage] = useState();
  const [position, setPosition] = useState();
  const [countryCodes, setCountryCodes] = useState();
  const [limit, setLimit] = useState();
  const [value, setValue] = useState();

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

  function onPlaceSelect(value) {
    console.log(value);
  }

  function onSuggectionChange(value) {
    console.log(value);
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

    <GeoapifyContext apiKey="00a9862ac01f454887fc285e220d8460">
      <GeoapifyGeocoderAutocomplete placeholder="Enter address here"
        value={value}
        type={type}
        lang={language}
        position={position}
        countryCodes={countryCodes}
        limit={limit}
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggectionChange}
        />
    </GeoapifyContext>
  </div>
}

export default App
