import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Papa from 'papaparse';
import './Report.css';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA',
  'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT',
  'VA', 'WA', 'WV', 'WI', 'WY'
];

const ROOF_TYPES = ['Metal', 'TPO', 'Foam', 'Asphalt'];

const Report = () => {
  const [data, setData] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedRoofType, setSelectedRoofType] = useState('');

  useEffect(() => {
    Papa.parse('/mock_data_with_latlng.csv', {
      header: true,
      download: true,
      complete: (result) => {
        const cleaned = result.data.filter(row => row.Contractor && !isNaN(row.RoofSize));
        setData(cleaned);
      },
      error: (err) => console.error('CSV Parsing Error:', err)
    });
  }, []);

  const filteredData = data.filter(row => {
    const matchesState = selectedState ? row.State === selectedState : true;
    const matchesRoof = selectedRoofType ? row.RoofType === selectedRoofType : true;
    return matchesState && matchesRoof;
  });

  const exportPDF = () => {
    const input = document.getElementById('report-section');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('report.pdf');
    });
  };

  return (
    <div className="report-container" id="report-section">
      <h2>Project Quotes Dashboard</h2>

      <div className="report-filters">
        <div className="filter-group">
          <label>State</label>
          <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            <option value="">All</option>
            {US_STATES.map(state => <option key={state} value={state}>{state}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label>Roof Type</label>
          <select value={selectedRoofType} onChange={(e) => setSelectedRoofType(e.target.value)}>
            <option value="">All</option>
            {ROOF_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>

        <button className="btn-clear" onClick={() => {
          setSelectedState('');
          setSelectedRoofType('');
        }}>Clear Filters</button>

        
        <button onClick={exportPDF} className="btn-export-red">Export PDF</button>
        <CSVLink data={filteredData} filename="report.csv" className="btn-export">Export CSV</CSVLink>
      </div>

      <table className="report-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Contractor</th>
            <th>Company</th>
            <th>Roof Size</th>
            <th>Roof Type</th>
            <th>City</th>
            <th>State</th>
            <th>Project Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{row.Contractor}</td>
              <td>{row.Company}</td>
              <td>{row.RoofSize}</td>
              <td>{row.RoofType}</td>
              <td>{row.City}</td>
              <td>{row.State}</td>
              <td>{row.Date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;