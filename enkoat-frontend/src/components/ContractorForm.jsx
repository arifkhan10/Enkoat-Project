// src/components/ContractorForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './ContractorForm.css';

const ContractorForm = () => {
  const [formData, setFormData] = useState({
    contractorName: '',
    company: '',
    roofSize: '',
    roofType: '',
    city: '',
    state: '',
    projectDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/quotes', formData);
      alert('Quote submitted successfully!');
      setFormData({
        contractorName: '',
        company: '',
        roofSize: '',
        roofType: '',
        city: '',
        state: '',
        projectDate: '',
      });
    } catch (err) {
      console.error(err);
      alert('Error submitting the form');
    }
  };

  return (
    <>
      {/* <div className="form-header">
        <img src="/img/enkoat-logo-updated-new.png" alt="Enkoat Logo" className="form-header-logo" />
        <h1 className="form-header-title">EnKoat Quote Portal</h1>
      </div> */}

      {/* <nav className="nav-links">
                <Link to="/">Quote Form</Link>
                <Link to="/dashboard">Dashboard</Link>
              </nav> */}

      <div className="form-wrapper">
        <div className="form-container">
          {/* <h2 className="form-title">Contractor Quote Form</h2> */}
          <form onSubmit={handleSubmit} className="form-grid">

            <div className="form-field">
              <label>Contractor Name</label>
              <input type="text" name="contractorName" value={formData.contractorName} onChange={handleChange} required />
            </div>

            <div className="form-field">
              <label>Company</label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} required />
            </div>

            <div className="form-field">
              <label>Roof Size (sq ft)</label>
              <input type="number" name="roofSize" value={formData.roofSize} onChange={handleChange} required />
            </div>

            <div className="form-field">
              <label>Roof Type</label>
              <select name="roofType" value={formData.roofType} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Metal">Metal</option>
                <option value="TPO">TPO</option>
                <option value="Foam">Foam</option>
                <option value="Asphalt">Asphalt</option>
              </select>
            </div>

            <div className="form-field">
              <label>City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </div>

            <div className="form-field">
              <label>State</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} required />
            </div>

            <div className="form-field">
              <label>Project Date</label>
              <input type="date" name="projectDate" value={formData.projectDate} onChange={handleChange} required />
            </div>

            <button type="submit" className="submit-btn">Submit Quote</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContractorForm;
