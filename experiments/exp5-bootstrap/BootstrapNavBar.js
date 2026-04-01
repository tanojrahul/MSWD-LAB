import React from 'react';

const BootstrapNavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand font-weight-bold" href="#home">
          💼 Jobs Portal
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#browse">Browse Jobs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary btn-sm ml-2">Login</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default BootstrapNavBar;
