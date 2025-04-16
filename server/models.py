# server/models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Quote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    contractor_name = db.Column(db.String(100))
    company = db.Column(db.String(100))
    roof_size = db.Column(db.Integer)
    roof_type = db.Column(db.String(50))
    city = db.Column(db.String(50))
    state = db.Column(db.String(50))
    project_date = db.Column(db.Date)
