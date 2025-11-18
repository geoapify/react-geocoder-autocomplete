import React, { useState, useRef, useEffect } from 'react';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import { GEOAPIFY_API_KEY } from '../config';
import './EventsShowcaseDemo.css';

const EventsShowcaseDemo = () => {
  const [events, setEvents] = useState([
    { key: 'select', label: 'select', enabled: true },
    { key: 'suggestions', label: 'suggestions', enabled: true },
    { key: 'userInput', label: 'userInput', enabled: true },
    { key: 'close', label: 'close', enabled: true },
    { key: 'open', label: 'open', enabled: true },
    { key: 'request_start', label: 'request_start', enabled: true },
    { key: 'request_end', label: 'request_end', enabled: true },
    { key: 'places', label: 'places', enabled: true },
    { key: 'places_request_start', label: 'places_request_start', enabled: true },
    { key: 'places_request_end', label: 'places_request_end', enabled: true },
    { key: 'place_details_request_start', label: 'place_details_request_start', enabled: true },
    { key: 'place_details_request_end', label: 'place_details_request_end', enabled: true },
    { key: 'place_select', label: 'place_select', enabled: true },
    { key: 'clear', label: 'clear', enabled: true }
  ]);

  const [options] = useState({
    debounceDelay: 250,
    addDetails: true,
    addCategorySearch: true
  });

  const [consoleLogs, setConsoleLogs] = useState([]);
  const consoleRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom when new logs are added
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleLogs]);

  const logEvent = (eventName, payload) => {
    // Check if this event type is enabled
    const eventConfig = events.find(e => e.key === eventName);
    if (!eventConfig || !eventConfig.enabled) {
      return;
    }

    const timestamp = nowTimestamp();
    const newLog = {
      timestamp,
      event: eventName,
      payload: formatPayload(payload)
    };

    setConsoleLogs(prev => {
      const updated = [...prev, newLog];
      // Keep only last 100 logs for performance
      return updated.length > 100 ? updated.slice(-100) : updated;
    });
  };

  const nowTimestamp = () => {
    const d = new Date();
    const pad = (n, s = 2) => String(n).padStart(s, '0');
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(), 3)}`;
  };

  const formatPayload = (obj) => {
    try {
      const text = typeof obj === 'string' ? obj : JSON.stringify(obj, null, 2);
      return text.length > 800 ? text.slice(0, 800) + '…' : text;
    } catch (e) {
      return String(obj) + ':' + String(e);
    }
  };

  const getResultCount = (data) => {
    if (Array.isArray(data)) return data.length;
    if (data && Array.isArray(data.features)) return data.features.length;
    return 0;
  };

  // Event handlers
  const onInput = (text) => {
    logEvent('userInput', { text });
  };

  const onRequestStart = (query) => {
    logEvent('request_start', { query });
  };

  const onRequestEnd = (result) => {
    const success = result?.success !== false;
    const count = getResultCount(result?.data || result);
    const error = result?.error && !result.error.canceled ? String(result.error) : undefined;
    logEvent('request_end', { success, suggestions: count, error });
  };

  const onSuggestions = (items) => {
    const count = Array.isArray(items) ? items.length : 0;
    logEvent('suggestions', { count });
  };

  const onSelect = (feature) => {
    const p = feature?.properties || {};
    logEvent('select', { formatted: p.formatted, lat: p.lat, lon: p.lon });
  };

  const onOpen = (event) => {
    logEvent('open', event);
  };

  const onClose = (event) => {
    logEvent('close', event);
  };

  const onClear = (context) => {
    logEvent('clear', { context });
  };

  const onPlaceDetailsRequestStart = (feature) => {
    const p = feature?.properties || {};
    logEvent('place_details_request_start', { name: p.name || p.formatted });
  };

  const onPlaceDetailsRequestEnd = (success, data, error) => {
    const feature = data || {};
    const p = feature?.properties || {};
    const errorMsg = error && !error.canceled ? String(error) : undefined;
    logEvent('place_details_request_end', {
      success,
      name: p.name || p.formatted,
      error: errorMsg
    });
  };

  const onPlacesRequestStart = (categoryKeys) => {
    logEvent('places_request_start', { categories: categoryKeys });
  };

  const onPlacesRequestEnd = (success, data, error) => {
    const count = getResultCount(data);
    const errorMsg = error && !error.canceled ? String(error) : undefined;
    logEvent('places_request_end', { success, places: count, error: errorMsg });
  };

  const onPlaces = (places) => {
    const count = Array.isArray(places) ? places.length : 0;
    logEvent('places', { count });
  };

  const onPlaceSelectEvent = (event) => {
    const place = event?.place;
    const index = event?.index;
    const p = place?.properties || {};
    logEvent('place_select', {
      index,
      name: p.name || p.formatted,
      lat: p.lat,
      lon: p.lon
    });
  };

  // Control methods
  const toggleEvent = (key) => {
    setEvents(prev => prev.map(e => 
      e.key === key ? { ...e, enabled: !e.enabled } : e
    ));
  };

  const enableAllEvents = () => {
    setEvents(prev => prev.map(e => ({ ...e, enabled: true })));
  };

  const disableAllEvents = () => {
    setEvents(prev => prev.map(e => ({ ...e, enabled: false })));
  };

  const clearLog = () => {
    setConsoleLogs([]);
  };

  return (
    <GeoapifyContext apiKey={GEOAPIFY_API_KEY}>
      <div className="events-showcase-demo">
        <div className="container">
          <h1>Events Demo — Full GeocoderAutocomplete Event Showcase</h1>
          <p className="hint">
            Toggle event listeners to see what the component emits. Logs update in real time with event name, timestamp, and a compact payload.
          </p>

          <div className="panel">
            <h3>1. Autocomplete</h3>
            <div className="autocomplete-container">
              <GeoapifyGeocoderAutocomplete
                showPlacesByCategoryList={true}
                enablePlacesByCategoryLazyLoading={true}
                placesByCategoryLimit={10}
                limit={8}
                hidePlacesByCategoryListAfterSelect={true}
                skipIcons={false}
                placeholder="Type to search addresses or categories…"
                addCategorySearch={options.addCategorySearch}
                addDetails={options.addDetails}
                debounceDelay={options.debounceDelay}
                onUserInput={onInput}
                onRequestStart={onRequestStart}
                onRequestEnd={onRequestEnd}
                suggestionsChange={onSuggestions}
                placeSelect={onSelect}
                onOpen={onOpen}
                onClose={onClose}
                onClear={onClear}
                onPlaceDetailsRequestStart={onPlaceDetailsRequestStart}
                onPlaceDetailsRequestEnd={onPlaceDetailsRequestEnd}
                onPlacesByCategoryRequestStart={onPlacesRequestStart}
                onPlacesByCategoryRequestEnd={onPlacesRequestEnd}
                onPlacesByCategoryChange={onPlaces}
                onPlaceByCategorySelect={onPlaceSelectEvent}
              />
            </div>
            <p className="tip-text">
              Tip: Category mode is enabled to show Places-related events as well.
            </p>
          </div>

          <div className="panel">
            <h3>2. Events</h3>
            <div className="event-grid">
              {events.map(event => (
                <label key={event.key} className="event-checkbox">
                  <input
                    type="checkbox"
                    checked={event.enabled}
                    onChange={() => toggleEvent(event.key)}
                  />
                  <span>{event.label}</span>
                </label>
              ))}
            </div>
            <div className="button-group">
              <button onClick={enableAllEvents}>Enable All</button>
              <button onClick={disableAllEvents}>Disable All</button>
              <button onClick={clearLog}>Clear Log</button>
            </div>
          </div>

          <div className="panel">
            <h3>Console</h3>
            <div ref={consoleRef} className="console" aria-live="polite">
              {consoleLogs.map((log, index) => (
                <div key={index} className="line">
                  <span className="ts">{log.timestamp}</span>
                  <span className="evt">{log.event}</span>
                  <span className="payload">{log.payload}</span>
                </div>
              ))}
              {consoleLogs.length === 0 && (
                <div className="empty-console">Start typing in the autocomplete above to see events here...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </GeoapifyContext>
  );
};

export default EventsShowcaseDemo;

