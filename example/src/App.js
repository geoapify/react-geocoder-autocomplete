import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import DemoIndex from './components/DemoIndex';
import AddressFormDemo from './components/AddressFormDemo';
import EventsShowcaseDemo from './components/EventsShowcaseDemo';
import PlaygroundDemo from './components/PlaygroundDemo';
import ThemeSelector from './components/ThemeSelector';
import './App.css';

const App = () => {
  const [theme, setTheme] = useState('round-borders');
  const location = useLocation();
  const isIndexPage = location.pathname === '/' || location.pathname === '/demos';

  useEffect(() => {
    const savedTheme = localStorage.getItem('geocoder-theme') || 'round-borders';
    setTheme(savedTheme);
    loadTheme(savedTheme);
  }, [location.pathname]);

  const loadTheme = (themeName) => {
    // Remove existing theme links
    document.querySelectorAll('link[data-geocoder-theme]').forEach(link => link.remove());
    
    // Add new theme link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://unpkg.com/@geoapify/geocoder-autocomplete@3.0.1/styles/${themeName}.css`;
    link.setAttribute('data-geocoder-theme', 'true');
    document.head.appendChild(link);

    // Update body class - don't apply theme classes on index page
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    if (!isIndexPage) {
      document.body.classList.add(`theme-${themeName}`);
    }

    localStorage.setItem('geocoder-theme', themeName);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    loadTheme(newTheme);
  };

  return (
    <div className="app">
      {!isIndexPage && <ThemeSelector selectedTheme={theme} onThemeChange={handleThemeChange} />}
      
      <Routes>
        <Route path="/" element={<DemoIndex />} />
        <Route path="/demos" element={<DemoIndex />} />
        <Route path="/demos/address-form" element={<AddressFormDemo />} />
        <Route path="/demos/events-showcase" element={<EventsShowcaseDemo />} />
        <Route path="/demos/playground" element={<PlaygroundDemo />} />
      </Routes>
    </div>
  );
};

export default App;
