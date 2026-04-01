import React, { useState } from 'react';

const BootstrapThemes = () => {
  const [selectedTheme, setSelectedTheme] = useState('light');

  const themes = [
    { name: 'light', className: 'bg-light text-dark', description: 'Light theme' },
    { name: 'dark', className: 'bg-dark text-white', description: 'Dark theme' },
    { name: 'primary', className: 'bg-primary text-white', description: 'Primary theme' },
    { name: 'success', className: 'bg-success text-white', description: 'Success theme' },
  ];

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Bootstrap Themes</h2>

      <div className="row mb-4">
        {themes.map(theme => (
          <div className="col-md-3 mb-3" key={theme.name}>
            <button
              className={`btn btn-block ${selectedTheme === theme.name ? 'btn-dark' : 'btn-outline-secondary'}`}
              onClick={() => setSelectedTheme(theme.name)}
            >
              {theme.description}
            </button>
          </div>
        ))}
      </div>

      <div className={`p-5 rounded ${themes.find(t => t.name === selectedTheme).className}`}>
        <h3>Current Theme: {selectedTheme.toUpperCase()}</h3>
        <p>This is a demonstration of Bootstrap theme customization.</p>
        <button className="btn btn-light">
          Sample Button
        </button>
      </div>
    </div>
  );
};

export default BootstrapThemes;
