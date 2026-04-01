import React, { useState } from 'react';
import BootstrapNavBar from './BootstrapNavBar';
import JobsCatalog from './JobsCatalog';
import BootstrapThemes from './BootstrapThemes';

const Exp5App = () => {
  const [activeTab, setActiveTab] = useState('jobs');

  return (
    <div>
      <BootstrapNavBar />

      {/* Tabs Navigation */}
      <div className="container-fluid mt-4 mb-4">
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'jobs' ? 'active' : ''}`}
              onClick={() => setActiveTab('jobs')}
            >
              Jobs Catalog
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'themes' ? 'active' : ''}`}
              onClick={() => setActiveTab('themes')}
            >
              Bootstrap Themes
            </button>
          </li>
        </ul>
      </div>

      {/* Tab Content */}
      <div className="container-fluid">
        {activeTab === 'jobs' && <JobsCatalog />}
        {activeTab === 'themes' && <BootstrapThemes />}
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <p>&copy; 2024 Jobs Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Exp5App;
