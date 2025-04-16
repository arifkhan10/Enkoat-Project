
// import { CSVLink } from 'react-csv';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import React, { useEffect, useState } from 'react';
// import Papa from 'papaparse';
// import './Dashboard.css';
// import {
//   BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
// } from 'recharts';
// import { MapContainer, TileLayer, CircleMarker, Tooltip as LeafletTooltip } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// const aggregateBy = (data, key) => {
//   const map = {};
//   data.forEach(item => {
//     const k = item[key] || 'undefined';
//     map[k] = (map[k] || 0) + 1;
//   });
//   return Object.keys(map).map(k => ({ name: k, count: map[k] }));
// };

// const averageBy = (data, key, field) => {
//   const map = {};
//   const count = {};
//   data.forEach(item => {
//     const k = item[key] || 'undefined';
//     const value = parseFloat(item[field]);
//     if (!isNaN(value)) {
//       map[k] = (map[k] || 0) + value;
//       count[k] = (count[k] || 0) + 1;
//     }
//   });
//   return Object.keys(map).map(k => ({
//     name: k,
//     average: (map[k] / count[k]).toFixed(2)
//   }));
// };

// const groupByMonth = (data) => {
//   const map = {};
//   data.forEach(item => {
//     const date = new Date(item.projectDate);
//     if (!isNaN(date)) {
//       const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
//       map[key] = (map[key] || 0) + 1;
//     }
//   });
//   return Object.keys(map).sort().map(month => ({
//     month,
//     count: map[month]
//   }));
// };

// const US_STATES = [
//   "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
//   "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
//   "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
//   "VA","WA","WV","WI","WY"
// ];

// const ROOF_TYPES = ["Metal", "TPO", "Foam", "Asphalt"];

// const Dashboard = () => {
//   const [data, setData] = useState([]);
//   const [summary, setSummary] = useState({ totalProjects: 0, avgRoofSize: '0.00' });
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedRoofType, setSelectedRoofType] = useState('');

//   const exportPDF = () => {
//     const input = document.getElementById('dashboard-section');
//     html2canvas(input).then(canvas => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const width = pdf.internal.pageSize.getWidth();
//       const height = (canvas.height * width) / canvas.width;
//       pdf.addImage(imgData, 'PNG', 0, 0, width, height);
//       pdf.save('dashboard-report.pdf');
//     });
//   };

//   useEffect(() => {
//     Papa.parse('/mock_data_with_latlng.csv', {
//       header: true,
//       download: true,
//       complete: (result) => {
//         const cleaned = result.data
//           .filter(row => row.lat && row.lng && !isNaN(row.RoofSize))
//           .map(row => ({
//             lat: parseFloat(row.lat),
//             lng: parseFloat(row.lng),
//             roofSize: parseFloat(row.RoofSize),
//             roofType: row.RoofType,
//             state: row.State,
//             city: row.City,
//             contractor: row.Contractor,
//             company: row.Company,
//             projectDate: row.Date
//           }));
//         setData(cleaned);
//         calculateSummary(cleaned);
//       },
//       error: (err) => console.error("CSV Parsing Error:", err)
//     });
//   }, []);

//   const filteredData = data.filter(d =>
//     (!selectedState || d.state === selectedState) &&
//     (!selectedRoofType || d.roofType === selectedRoofType)
//   );

//   useEffect(() => {
//     calculateSummary(filteredData);
//   }, [selectedState, selectedRoofType, data]);

//   const calculateSummary = (filtered) => {
//     const validSizes = filtered.map(item => parseFloat(item.roofSize)).filter(size => !isNaN(size));
//     const avgRoofSize = validSizes.length > 0
//       ? (validSizes.reduce((sum, size) => sum + size, 0) / validSizes.length).toFixed(2)
//       : '0.00';

//     setSummary({
//       totalProjects: filtered.length,
//       avgRoofSize
//     });
//   };

//   return (
//     <div className="dashboard-container" id="dashboard-section">
//       <h2>Performance Dashboard</h2>

//       <div className="filter-bar" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
//         <div style={{ display: 'flex', flexDirection: 'column' }}>
//           <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>State</label>
//           <select 
//             style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
//             onChange={(e) => setSelectedState(e.target.value)} 
//             value={selectedState}
//           >
//             <option value="">All</option>
//             {US_STATES.map(state => (
//               <option key={state} value={state}>{state}</option>
//             ))}
//           </select>
//         </div>

//         <div style={{ display: 'flex', flexDirection: 'column' }}>
//           <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Roof Type</label>
//           <select 
//             style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
//             onChange={(e) => setSelectedRoofType(e.target.value)} 
//             value={selectedRoofType}
//           >
//             <option value="">All</option>
//             {ROOF_TYPES.map(type => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
//         <CSVLink data={filteredData} filename="roofing-data.csv" className="btn-export">
//           Export CSV
//         </CSVLink>
//         <button onClick={exportPDF} className="btn-export-red">Export PDF</button>
//       </div>

//       <div className="dashboard-summary">
//         <div>Total Projects: <strong>{summary.totalProjects}</strong></div>
//         <div>Average Roof Size: <strong>{summary.avgRoofSize} sq ft</strong></div>
//       </div>

//       <div className="chart-box">
//         <h4>Projects by State</h4>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={aggregateBy(filteredData, 'state')}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="count" fill="#007bff" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="chart-box">
//         <h4>Avg Roof Size by Roof Type</h4>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={averageBy(filteredData, 'roofType', 'roofSize')}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="average" fill="#28a745" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="chart-box">
//         <h4>Monthly Projects Completed</h4>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={groupByMonth(filteredData)}>
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="count" stroke="#ff7300" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="chart-box">
//         <h4>Project Density (Map View)</h4>
//         <MapContainer center={[37.7749, -122.4194]} zoom={6} style={{ height: '400px', width: '100%' }}>
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           {filteredData.filter(d => d.lat && d.lng).map((d, idx) => (
//             <CircleMarker
//               key={idx}
//               center={[d.lat, d.lng]}
//               radius={8}
//               color="blue"
//               fillOpacity={0.5}
//             >
//               <LeafletTooltip>{d.city || d.state}</LeafletTooltip>
//             </CircleMarker>
//           ))}
//         </MapContainer>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import './Dashboard.css';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { MapContainer, TileLayer, CircleMarker, Tooltip as LeafletTooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const aggregateBy = (data, key) => {
  const map = {};
  data.forEach(item => {
    const k = item[key] || 'undefined';
    map[k] = (map[k] || 0) + 1;
  });
  return Object.keys(map).map(k => ({ name: k, count: map[k] }));
};

const averageBy = (data, key, field) => {
  const map = {};
  const count = {};
  data.forEach(item => {
    const k = item[key] || 'undefined';
    const value = parseFloat(item[field]);
    if (!isNaN(value)) {
      map[k] = (map[k] || 0) + value;
      count[k] = (count[k] || 0) + 1;
    }
  });
  return Object.keys(map).map(k => ({
    name: k,
    average: (map[k] / count[k]).toFixed(2)
  }));
};

const groupByMonth = (data) => {
  const map = {};
  data.forEach(item => {
    const date = new Date(item.projectDate);
    if (!isNaN(date)) {
      const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      map[key] = (map[key] || 0) + 1;
    }
  });
  return Object.keys(map).sort().map(month => ({
    month,
    count: map[month]
  }));
};

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY"
];

const ROOF_TYPES = ["Metal", "TPO", "Foam", "Asphalt"];

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({ totalProjects: 0, avgRoofSize: '0.00' });
  const [selectedState, setSelectedState] = useState('');
  const [selectedRoofType, setSelectedRoofType] = useState('');

  const exportPDF = () => {
    const input = document.getElementById('dashboard-section');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('dashboard-report.pdf');
    });
  };

  useEffect(() => {
    Papa.parse('/mock_data_with_latlng.csv', {
      header: true,
      download: true,
      complete: (result) => {
        const cleaned = result.data
          .filter(row => row.lat && row.lng && !isNaN(row.RoofSize))
          .map(row => ({
            lat: parseFloat(row.lat),
            lng: parseFloat(row.lng),
            roofSize: parseFloat(row.RoofSize),
            roofType: row.RoofType,
            state: row.State,
            city: row.City,
            contractor: row.Contractor,
            company: row.Company,
            projectDate: row.Date
          }));
        setData(cleaned);
        calculateSummary(cleaned);
      },
      error: (err) => console.error("CSV Parsing Error:", err)
    });
  }, []);

  const filteredData = data.filter(d =>
    (!selectedState || d.state === selectedState) &&
    (!selectedRoofType || d.roofType === selectedRoofType)
  );

  useEffect(() => {
    calculateSummary(filteredData);
  }, [selectedState, selectedRoofType, data]);

  const calculateSummary = (filtered) => {
    const validSizes = filtered.map(item => parseFloat(item.roofSize)).filter(size => !isNaN(size));
    const avgRoofSize = validSizes.length > 0
      ? (validSizes.reduce((sum, size) => sum + size, 0) / validSizes.length).toFixed(2)
      : '0.00';

    setSummary({
      totalProjects: filtered.length,
      avgRoofSize
    });
  };

  return (
    <div className="dashboard-container" id="dashboard-section">
      <h2 style={{ textAlign: 'center' }}>Performance Dashboard</h2>

      <div className="filter-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>State</label>
          <select 
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
            onChange={(e) => setSelectedState(e.target.value)} 
            value={selectedState}
          >
            <option value="">All</option>
            {US_STATES.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Roof Type</label>
          <select 
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
            onChange={(e) => setSelectedRoofType(e.target.value)} 
            value={selectedRoofType}
          >
            <option value="">All</option>
            {ROOF_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <CSVLink data={filteredData} filename="roofing-data.csv" className="btn-export">
          Export CSV
        </CSVLink>
        <button onClick={exportPDF} className="btn-export-red">Export PDF</button>
      </div>

      <div className="dashboard-summary">
        <div>Total Projects: <strong>{summary.totalProjects}</strong></div>
        <div>Average Roof Size: <strong>{summary.avgRoofSize} sq ft</strong></div>
      </div>

      <div className="chart-box">
        <h4>Projects by State</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={aggregateBy(filteredData, 'state')}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
        <h4>Avg Roof Size by Roof Type</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={averageBy(filteredData, 'roofType', 'roofSize')}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="average" fill="#28a745" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
        <h4>Monthly Projects Completed</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={groupByMonth(filteredData)}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
        <h4>Project Density (Map View)</h4>
        <MapContainer center={[37.7749, -122.4194]} zoom={6} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredData.filter(d => d.lat && d.lng).map((d, idx) => (
            <CircleMarker
              key={idx}
              center={[d.lat, d.lng]}
              radius={8}
              color="blue"
              fillOpacity={0.5}
            >
              <LeafletTooltip>{d.city || d.state}</LeafletTooltip>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Dashboard;