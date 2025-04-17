#  EnKoat Quote Portal & Performance Dashboard

## 🚀 Project Overview  
This full-stack application simulates a contractor-facing interface for submitting roofing project quotes and visualizing project performance data using EnKoat's IntelliKoat™ system.It uses a mock dataset located at:  `enkoat-frontend/public/mock_data_with_latlng.csv`

---

## ✨ Features  
- 🧾 Quote submission form for contractors (**NOTE** I am using MongoDB Atlas. When a user submits the Quote Form, they can navigate to the Reports page and see their entry added to the 
     table in real-time. New Quote form information is added at the end of table.)
- 📊 Performance dashboard with charts:  
  - State-wise distribution  
  - Roof-type-wise breakdown  
  - Monthly trends  
- 🌐 Map view using Leaflet to visualize project density  
- 🎯 Filters by state and roof type  
- 📥 Export to CSV and PDF  
- 📍 Location markers powered by city/state lat/lng  

---
# 🧪 Mock Data Generation
- The initial project dataset (mock_data_with_latlng.csv) was generated using a combination of:

- The Faker library (for random contractor names, company names, dates)

- Randomized roof sizes, roof types, cities, and states.

- Latitude and longitude fields were populated based on standard US city coordinates.

# 🔥 Future Improvements
- Given more time, the following enhancements could be implemented:

- Add authentication and role-based access (e.g., Admin vs Contractor login)

- Implement server-side pagination and search for large datasets

- Improve city/state dropdowns by dynamically fetching from an API

- Add form field validation using React libraries (Formik + Yup)

- Integrate Google Maps instead of Leaflet for richer map interactions

- Deploy backend and frontend to production (AWS/GCP + Netlify/Vercel)

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
cd Enkoat-Project
### Frontend
- cd enkoat-frontend
- npm install
- npm start

### Backend
cd Enkoat-Project
- cd server
- python -m venv venv
- venv\Scripts\activate for windows    # or source venv/bin/activate  for mac
- pip install -r requirements.txt
- python app.py

