import React, { useState, useRef, useEffect } from 'react';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import { GEOAPIFY_API_KEY } from '../config';
import './AddressFormDemo.css';

const AddressFormDemo = () => {
  const [formData, setFormData] = useState({
    street: '',
    housenumber: '',
    city: '',
    postcode: '',
    country: ''
  });

  const [highlightFields, setHighlightFields] = useState({
    street: false,
    housenumber: false,
    city: false,
    postcode: false,
    country: false
  });

  const [message, setMessage] = useState('');
  const [showWarnings, setShowWarnings] = useState(false);
  const [canConfirm, setCanConfirm] = useState(false);
  const [matchBadge, setMatchBadge] = useState({ visible: false, text: '', className: '' });
  const [devPanel, setDevPanel] = useState({
    visible: false,
    status: 'Press "Confirm address" to run a one-time geocoding check.',
    meta: '',
    code: ''
  });

  const streetInputRef = useRef(null);
  const houseInputRef = useRef(null);
  const postcodeInputRef = useRef(null);
  const cityInputRef = useRef(null);
  const countryInputRef = useRef(null);

  useEffect(() => {
    updateConfirmState();
  }, [formData]);

  const onAddressSelected = (result) => {
    if (!result || !result.properties) return;

    const p = result.properties;

    setFormData({
      street: p.street || '',
      housenumber: p.housenumber || '',
      city: p.city || p.town || p.village || p.suburb || '',
      postcode: p.postcode || '',
      country: p.country || ''
    });

    // Highlight all fields
    const fields = ['street', 'housenumber', 'city', 'postcode', 'country'];
    fields.forEach(field => {
      setTimeout(() => {
        setHighlightFields(prev => ({ ...prev, [field]: true }));
        setTimeout(() => {
          setHighlightFields(prev => ({ ...prev, [field]: false }));
        }, 1800);
      }, 10);
    });
  };

  const updateConfirmState = () => {
    const isValid = formData.country.trim() && formData.city.trim() && 
                    formData.street.trim() && formData.housenumber.trim() && 
                    formData.postcode.trim();
    setCanConfirm(isValid);
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEnterManually = (e) => {
    e.preventDefault();
    if (streetInputRef && streetInputRef.current) {
      streetInputRef.current.focus();
    }
  };

  const confirmAddress = async () => {
    const { street, housenumber, city, postcode, country } = formData;

    setMessage('');
    setMatchBadge({ visible: false, text: '', className: '' });

    const missing = [];
    if (!country.trim()) missing.push('Country');
    if (!city.trim()) missing.push('City');
    if (!street.trim()) missing.push('Street');
    if (!housenumber.trim()) missing.push('House number');
    if (!postcode.trim()) missing.push('Postcode');

    if (missing.length) {
      setShowWarnings(true);
      setTimeout(() => setShowWarnings(false), 2500);
      setMessage('Please fill in the required fields and confirm again.');
      return;
    }

    const formatted = `${street} ${housenumber}, ${postcode} ${city}, ${country}`;
    setMessage(`Address confirmed: ${formatted}`);

    // Perform geocoding verification
    performGeocodingVerification(housenumber, street, postcode, city, country);
  };

  const performGeocodingVerification = async (house, street, postcode, city, country) => {
    setDevPanel(prev => ({ ...prev, visible: true }));

    const params = new URLSearchParams({
      housenumber: house,
      street,
      postcode,
      city,
      country,
      apiKey: GEOAPIFY_API_KEY
    });

    const url = `https://api.geoapify.com/v1/geocode/search?${params.toString()}`;
    const maskedUrl = url.replace(/(apiKey=)[^&]+/i, '$1YOUR_API_KEY');

    setDevPanel(prev => ({
      ...prev,
      status: 'Requesting Geoapify Geocoding API…',
      meta: `<strong>URL:</strong> ${maskedUrl}`,
      code: ''
    }));

    try {
      const response = await fetch(url);
      const data = await response.json();
      const features = data?.features || [];

      if (!features.length) {
        setDevPanel(prev => ({
          ...prev,
          status: 'No matches returned for the structured address.',
          code: JSON.stringify(data, null, 2)
        }));
        return;
      }

      const found = features[0];
      const p = found.properties || {};
      const rank = p.rank || {};

      let verification = '';
      if (rank.confidence === 1) {
        verification = 'Verified to building level.';
      } else if (rank.confidence > 0.5 && rank.confidence_street_level === 1) {
        verification = 'Likely accurate; verified to street level.';
      } else if (rank.confidence_street_level === 1) {
        verification = 'Verified to street level only.';
      } else {
        verification = 'Partial verification only.';
      }

      const statusText = [
        `<strong>Verification:</strong> ${verification}`,
        ` | <strong>Confidence:</strong> ${rank.confidence ?? 'n/a'}`,
        ` | <strong>Street-level:</strong> ${rank.confidence_street_level ?? 'n/a'}`
      ].join('');

      const label = (() => {
        if (rank.confidence === 1 && p.housenumber) return 'Building-level match';
        if (rank.confidence_street_level === 1 || p.street) return 'Street-level match';
        return 'City-level match';
      })();

      const metaText = [
        `<strong>URL:</strong> ${maskedUrl}`,
        `<br><strong>Top result:</strong> ${p.formatted || '—'}`,
        `<br><strong>Match badge:</strong> ${label}`,
        `<br><strong>Coords:</strong> ${found.geometry?.coordinates?.join(', ') || '—'}`
      ].join('');

      const snippet = JSON.stringify(p, null, 2);
      const code = snippet.length > 5000 ? snippet.slice(0, 5000) + '\n…' : snippet;

      setDevPanel({
        visible: true,
        status: statusText,
        meta: metaText,
        code
      });

      // Set match badge
      const level = getMatchLevel(p);
      const labelMap = {
        building: 'Building-level match',
        street: 'Street-level match',
        city: 'City-level match',
        ambiguous: 'Ambiguous match'
      };

      setMatchBadge({
        visible: true,
        text: labelMap[level] || 'Match level',
        className: `match-badge is-${level}`
      });

    } catch (err) {
      setDevPanel(prev => ({
        ...prev,
        status: 'Request failed. You can proceed with manual confirmation.',
        meta: `<strong>Error:</strong> ${String(err)}`
      }));
    }
  };

  const getMatchLevel = (p) => {
    const rank = p.rank || {};
    const hasStreet = !!p.street;
    const hasHouse = !!p.housenumber;
    const conf = typeof rank.confidence === 'number' ? rank.confidence : undefined;
    const streetLevel = rank.confidence_street_level === 1 || hasStreet;

    if (conf !== undefined && conf < 0.5) return 'ambiguous';
    if (hasHouse && conf === 1) return 'building';
    if (streetLevel) return 'street';
    return 'city';
  };

  return (
    <GeoapifyContext apiKey={GEOAPIFY_API_KEY}>
      <div className="address-form-demo">
        <div className="container">
          <h1>Address Form — Search, Check, Confirm</h1>
          <p className="hint">
            Search for your address to prefill the form. Review and correct if needed, then confirm the address. Autocomplete assists — you verify the final details.
          </p>

          <div className="panel">
            <div className="section-title">
              <span className="section-num">1</span>
              <h3 className="section-heading">Search address</h3>
            </div>
            <div className="autocomplete-container">
              <GeoapifyGeocoderAutocomplete
                allowNonVerifiedHouseNumber={true}
                allowNonVerifiedStreet={true}
                skipIcons={true}
                placeholder=" "
                skipSelectionOnArrowKey={true}
                placeSelect={onAddressSelected}
              />
              <p className="search-hint">
                Use search to start. We'll prefill; you review and complete. Can't find your exact address? <a href="#" onClick={handleEnterManually}>Enter it manually</a>.
              </p>
            </div>
          </div>

          <div className="panel">
            <div className="section-title">
              <span className="section-num">2</span>
              <h3 className="section-heading">Check and edit if needed</h3>
            </div>
            <div className="form-grid">
              <div className="form-field">
                <label>Street</label>
                <input
                  ref={streetInputRef}
                  type="text"
                  value={formData.street}
                  onChange={(e) => handleFieldChange('street', e.target.value)}
                  className={highlightFields.street ? 'highlight' : ''}
                />
              </div>
              <div className="form-field">
                <label>House number</label>
                <input
                  ref={houseInputRef}
                  type="text"
                  value={formData.housenumber}
                  onChange={(e) => handleFieldChange('housenumber', e.target.value)}
                  className={highlightFields.housenumber ? 'highlight' : ''}
                />
              </div>
              <div className="form-field">
                <label>City</label>
                <input
                  ref={cityInputRef}
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleFieldChange('city', e.target.value)}
                  className={highlightFields.city ? 'highlight' : ''}
                />
              </div>
              <div className="form-field">
                <label>Postcode</label>
                <input
                  ref={postcodeInputRef}
                  type="text"
                  value={formData.postcode}
                  onChange={(e) => handleFieldChange('postcode', e.target.value)}
                  className={highlightFields.postcode ? 'highlight' : ''}
                />
              </div>
              <div className="form-field form-field-wide">
                <label>Country</label>
                <input
                  ref={countryInputRef}
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleFieldChange('country', e.target.value)}
                  className={highlightFields.country ? 'highlight' : ''}
                />
              </div>
            </div>
            {showWarnings && <div className="warning-message">⚠️ Please fill in all required fields</div>}
          </div>

          <div className="panel">
            <div className="section-title">
              <span className="section-num">3</span>
              <h3 className="section-heading">Confirm</h3>
            </div>
            <div className="confirm-section">
              <div className="confirm-hint">
                Autocomplete suggests. You confirm.
              </div>
              <button 
                className="confirm-button" 
                onClick={confirmAddress}
                disabled={!canConfirm}
              >
                Confirm address
              </button>
            </div>
            {message && <div className="success-message">{message}</div>}
            {matchBadge.visible && (
              <div className={matchBadge.className}>{matchBadge.text}</div>
            )}
          </div>

          {devPanel.visible && (
            <div className="panel dev-panel">
              <h3>Developer Info (Geocoding Verification)</h3>
              <div className="dev-status" dangerouslySetInnerHTML={{ __html: devPanel.status }}></div>
              {devPanel.meta && <div className="dev-meta" dangerouslySetInnerHTML={{ __html: devPanel.meta }}></div>}
              {devPanel.code && (
                <pre className="dev-code">{devPanel.code}</pre>
              )}
            </div>
          )}
        </div>
      </div>
    </GeoapifyContext>
  );
};

export default AddressFormDemo;

