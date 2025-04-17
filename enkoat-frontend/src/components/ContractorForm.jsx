
import React, { useState, useRef } from 'react';
import axios from 'axios';
import './ContractorForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const STATE_CITY_MAP = {
  'AZ': ['Phoenix', 'Tucson', 'Mesa'],
  'CA': ['Los Angeles', 'San Francisco', 'San Diego'],
  'NY': ['New York', 'Buffalo', 'Rochester'],
  'TX': ['Houston', 'Dallas', 'Austin'],
  'FL': ['Miami', 'Orlando', 'Tampa'],
  'IL': ['Chicago', 'Springfield', 'Naperville'],
};

const US_STATES = Object.keys(STATE_CITY_MAP);

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
  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'State') {
      setFormData(prev => ({
        ...prev,
        State: value,
        City: '', 
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date();
    const selectedDate = new Date(formData.Date);

    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      toast.error('Project Date cannot be earlier than today.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/quotes', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      toast.success('Quote submitted successfully! 🎉', {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

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

      toast.error('Error submitting the form ❌', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-grid">
          
          <div className="form-field">
            <label>Contractor Name<span className="required">*</span></label>
            <input
              type="text"
              name="Contractor"
              value={formData.Contractor}
              onChange={handleChange}
              required
            />
          </div>

          
          <div className="form-field">
            <label>Company<span className="required">*</span></label>
            <input
              type="text"
              name="Company"
              value={formData.Company}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Roof Size (sq ft)<span className="required">*</span></label>
            <input
              type="number"
              name="RoofSize"
              value={formData.RoofSize}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

         
          <div className="form-field">
            <label>Roof Type<span className="required">*</span></label>
            <select
              name="RoofType"
              value={formData.RoofType}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Metal">Metal</option>
              <option value="TPO">TPO</option>
              <option value="Foam">Foam</option>
              <option value="Asphalt">Asphalt</option>
            </select>
          </div>

          <div className="form-field">
            <label>State<span className="required">*</span></label>
            <select
              name="State"
              value={formData.State}
              onChange={handleChange}
              required
            >
              <option value="">Select State</option>
              {US_STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

         
          <div className="form-field">
            <label>City<span className="required">*</span></label>
            <select
              name="City"
              value={formData.City}
              onChange={handleChange}
              required
              disabled={!formData.State}
            >
              <option value="">Select City</option>
              {formData.State && STATE_CITY_MAP[formData.State].map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

        
          <div className="form-field" onClick={() => dateInputRef.current.showPicker()}>
            <label>Project Date<span className="required">*</span></label>
            <input
              type="date"
              name="Date"
              value={formData.Date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              ref={dateInputRef}
            />
          </div>

        
          <button type="submit" className="submit-btn">Submit Quote</button>
        </form>
      </div>

     
      <ToastContainer />
    </div>
  );
};

export default ContractorForm;
