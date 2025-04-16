# # server/app.py
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from flask_sqlalchemy import SQLAlchemy
# from models import db, Quote
# from datetime import datetime

# app = Flask(__name__)
# CORS(app)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db.init_app(app)

# with app.app_context():
#     db.create_all()

# # POST - Submit quote
# @app.route('/api/quotes', methods=['POST'])
# def submit_quote():
#     data = request.json
#     new_quote = Quote(
#         contractor_name=data['contractorName'],
#         company=data['company'],
#         roof_size=data['roofSize'],
#         roof_type=data['roofType'],
#         city=data['city'],
#         state=data['state'],
#         project_date=datetime.strptime(data['projectDate'], '%Y-%m-%d')
#     )
#     db.session.add(new_quote)
#     db.session.commit()
#     return jsonify({"message": "Quote saved"}), 201

# # GET - Retrieve quotes (filterable)
# @app.route('/api/quotes', methods=['GET'])
# def get_quotes():
#     state = request.args.get('state')
#     roof_type = request.args.get('roof_type')

#     query = Quote.query
#     if state:
#         query = query.filter_by(state=state)
#     if roof_type:
#         query = query.filter_by(roof_type=roof_type)

#     quotes = query.all()
#     result = [{
#         "contractorName": q.contractor_name,
#         "company": q.company,
#         "roofSize": q.roof_size,
#         "roofType": q.roof_type,
#         "city": q.city,
#         "state": q.state,
#         "projectDate": q.project_date.strftime('%Y-%m-%d')
#     } for q in quotes]

#     return jsonify(result)

# if __name__ == '__main__':
#     app.run(debug=True)



from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime


app = Flask(__name__)
CORS(app)

# Replace with your MongoDB connection string (Atlas or local)
# mongodb+srv://<db_username>:<db_password>@cluster0.3yrfrdh.mongodb.net/
client = MongoClient("mongodb+srv://barfikhan78621:hEBrzwiw0NLYmcvE@cluster0.3yrfrdh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
# client = MongoClient("mongodb+srv://barfikhan78621:zNxHQfLAdgGM7FaM@cluster0.3yrfrdh.mongodb.net/")  # or your MongoDB Atlas URL
db = client['enkoat_db']         # database name
quotes_collection = db['quotes'] # collection name



import csv
from pymongo import MongoClient
from datetime import datetime

client = MongoClient("mongodb+srv://barfikhan78621:hEBrzwiw0NLYmcvE@cluster0.3yrfrdh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client['enkoat_db']
collection = db['quotes']

with open('mock_data.csv', 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        row['RoofSize'] = int(row['RoofSize'])
        row['Date'] = datetime.strptime(row['Date'], "%Y-%m-%d")
        collection.insert_one(row)
        
# 


@app.route('/api/quotes', methods=['POST'])
def submit_quote():
    data = request.json
    data['projectDate'] = datetime.strptime(data['projectDate'], '%Y-%m-%d')
    quotes_collection.insert_one(data)
    return jsonify({"message": "Quote saved"}), 201

@app.route('/api/quotes', methods=['GET'])
def get_quotes():
    state = request.args.get('state')
    roof_type = request.args.get('roof_type')

    query = {}
    if state:
        query['state'] = state
    if roof_type:
        query['roofType'] = roof_type

    quotes = list(quotes_collection.find(query, {'_id': 0}))  # exclude MongoDB's _id
    return jsonify(quotes)

@app.route('/')
def home():
    return "✅ Flask + MongoDB is running!"

if __name__ == '__main__':
    app.run(debug=True)
