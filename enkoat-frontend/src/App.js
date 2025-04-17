// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ContractorForm from './components/ContractorForm';
import Dashboard from './components/Dashboard';
import Report from './components/Report';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <header className="header">
        <div className="header-section">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img
              src="/enkoat-logo-updated-new.png"
              alt="EnKoat Logo"
              className="logo"
              style={{ cursor: 'pointer' }}
            />
          </Link>
        </div>

        <div className="center-section">
          <h1 className="portal-title">EnKoat Quote Portal</h1>
        </div>

        {/* Hamburger Button */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          &#9776;
        </div>

        {/* Navigation Links */}
        <nav className={`nav-links header-section ${menuOpen ? 'open' : ''}`} style={{ justifyContent: "flex-end" }}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Quote Form</Link>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/report" onClick={() => setMenuOpen(false)}>Report</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<ContractorForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;
