import React, { useState } from 'react';
import axios from 'axios';
import './ContractorForm.css';

const ContractorForm = () => {
  const [formData, setFormData] = useState({
    Contractor: '',
    Company: '',
    RoofSize: '',
    RoofType: '',
    City: '',
    State: '',
    Date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/quotes', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Quote submitted successfully!');
      setFormData({
        Contractor: '',
        Company: '',
        RoofSize: '',
        RoofType: '',
        City: '',
        State: '',
        Date: '',
      });
    } catch (err) {
      console.error(err);
      alert('Error submitting the form');
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-field">
            <label>Contractor Name</label>
            <input type="text" name="Contractor" value={formData.Contractor} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Company</label>
            <input type="text" name="Company" value={formData.Company} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Roof Size (sq ft)</label>
            <input type="number" name="RoofSize" value={formData.RoofSize} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Roof Type</label>
            <select name="RoofType" value={formData.RoofType} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Metal">Metal</option>
              <option value="TPO">TPO</option>
              <option value="Foam">Foam</option>
              <option value="Asphalt">Asphalt</option>
            </select>
          </div>
          <div className="form-field">
            <label>City</label>
            <input type="text" name="City" value={formData.City} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>State</label>
            <input type="text" name="State" value={formData.State} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Project Date</label>
            <input type="date" name="Date" value={formData.Date} onChange={handleChange} required />
          </div>
          <button type="submit" className="submit-btn">Submit Quote</button>
        </form>
      </div>
    </div>
  );
};

export default ContractorForm;




