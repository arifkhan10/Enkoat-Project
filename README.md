#  EnKoat Quote Portal & Performance Dashboard

## 🚀 Project Overview  
This full-stack application simulates a contractor-facing interface for submitting roofing project quotes and visualizing project performance data using EnKoat's IntelliKoat™ system.It uses a mock dataset located at:  `enkoat-frontend/public/mock_data_with_latlng.csv`

---

## ✨ Features  
- 🧾 Quote submission form for contractors  
- 📊 Performance dashboard with charts:  
  - State-wise distribution  
  - Roof-type-wise breakdown  
  - Monthly trends  
- 🌐 Map view using Leaflet to visualize project density  
- 🎯 Filters by state and roof type  
- 📥 Export to CSV and PDF  
- 📍 Location markers powered by city/state lat/lng  

---

## 🛠️ Tech Stack & Tools  

### **Frontend**
- React  
- Recharts – for charts and graphs  
- React-Leaflet – for map visualization  
- React Router – for page routing  
- PapaParse – for CSV parsing  
- jsPDF + html2canvas – for PDF export  

### **Backend**
- Flask – lightweight Python backend for quote submission  
- MongoDB Atlas – cloud-hosted NoSQL database for storing submitted quotes  

---

## 🧑‍💻 How to Run Locally  

### 1. Clone the Repository

```bash
git clone https://github.com/arifkhan10/Enkoat-Project.git
cd Enkoat-Project-main
### Frontend
- cd enkoat-frontend
- npm install
- npm start

### Backend
- cd server
- python -m venv venv
- source venv/bin/activate   # or venv\\Scripts\\activate on Windows
- python app.py
