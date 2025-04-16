// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ContractorForm from './components/ContractorForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <header className="main-header">
  <div className="header-section">
    {/* <img src="/img/enkoat-logo-updated-new.png" " /> */}

    <img src="public/enkoat-logo-updated-new.png" alt="EnKoat Logo" className="logo"/>
  </div>

  <div className="center-section">
    <h1 className="portal-title">EnKoat Quote Portal</h1>
  </div>

  <nav className="nav-links header-section" style={{ justifyContent: "flex-end" }}>
    <Link to="/">Quote Form</Link>
    <Link to="/dashboard">Dashboard</Link>
  </nav>
</header>


      <Routes>
        <Route path="/" element={<ContractorForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
