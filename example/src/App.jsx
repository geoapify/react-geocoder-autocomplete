import React, { useState, useEffect } from 'react';
import DemoIndex from './components/DemoIndex';
import AddressFormDemo from './components/AddressFormDemo';
import EventsShowcaseDemo from './components/EventsShowcaseDemo';
import PlaygroundDemo from './components/PlaygroundDemo';
import ThemeSelector from './components/ThemeSelector';
import './App.css';

const App = () => {
  const [theme, setTheme] = useState('round-borders');
  const [pathname, setPathname] = useState(window.location.pathname);
  const isIndexPage = pathname === '/' || pathname === '/demos';

  useEffect(() => {
    const savedTheme = localStorage.getItem('geocoder-theme') || 'round-borders';
    setTheme(savedTheme);
    loadTheme(savedTheme);
  }, [pathname]);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const loadTheme = (themeName) => {
    // Remove existing theme links
    document.querySelectorAll('link[data-geocoder-theme]').forEach(link => link.remove());
    
    // Add new theme link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://unpkg.com/@geoapify/geocoder-autocomplete@3.1.0/styles/${themeName}.css`;
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

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setPathname(path);
  };

  const renderPage = () => {
    switch (pathname) {
      case '/demos/address-form':
        return <AddressFormDemo />;
      case '/demos/events-showcase':
        return <EventsShowcaseDemo />;
      case '/demos/playground':
        return <PlaygroundDemo />;
      default:
        return <DemoIndex onNavigate={navigate} />;
    }
  };

  return (
    <div className="app">
      {!isIndexPage && <ThemeSelector selectedTheme={theme} onThemeChange={handleThemeChange} />}

      {renderPage()}
    </div>
  );
};

export default App;
