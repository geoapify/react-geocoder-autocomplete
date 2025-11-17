import React from 'react';
import './ThemeSelector.css';

const ThemeSelector = ({ selectedTheme, onThemeChange }) => {
  return (
    <div className="theme-selector">
      <span className="theme-label">Theme:</span>
      <select value={selectedTheme} onChange={(e) => onThemeChange(e.target.value)}>
        <option value="minimal">Light</option>
        <option value="minimal-dark">Dark</option>
        <option value="round-borders">Light (Round)</option>
        <option value="round-borders-dark">Dark (Round)</option>
      </select>
    </div>
  );
};

export default ThemeSelector;

