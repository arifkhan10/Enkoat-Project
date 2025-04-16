# EnKoat Quote Portal & Performance Dashboard

##  Project Overview

This full-stack application simulates a contractor-facing interface for submitting roofing project quotes and visualizing project performance data using EnKoat's IntelliKoat™ system.

It includes:
- A quote submission form for contractors.
- A dynamic dashboard with charts and map views of roofing project trends. 
- Features like filtering by state and roof type, export to CSV and PDF, and a geographic heatmap using Leaflet.



##  Tech Stack & Tools

### Frontend:
- React
- Recharts (for visualizations)
- React-Leaflet (for the map)
- React Router (for navigation)
- PapaParse (for CSV parsing)
- jsPDF + html2canvas (for PDF generation)

### Backend:
- No backend needed for this version (mock data is CSV-based).
- Flask or MongoDB integration could be added in future versions.



##  How to Run Locally

### 1. Clone the Repository

git clone https://github.com/your-username/enkoat-quote-dashboard.git
cd enkoat-quote-dashboard
