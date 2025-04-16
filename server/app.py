from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime


app = Flask(__name__)
CORS(app)


client = MongoClient("mongodb+srv://barfikhan78621:hEBrzwiw0NLYmcvE@cluster0.3yrfrdh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

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
    data = request.get_json()
    print("Received data:", data)

    try:
        # Required fields (must match frontend keys)
        required_fields = ['Contractor', 'Company', 'RoofSize', 'RoofType', 'City', 'State', 'Date']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        # Convert fields
        data['RoofSize'] = int(data['RoofSize'])
        data['Date'] = datetime.strptime(data['Date'], '%Y-%m-%d')

        # Store in DB
        quotes_collection.insert_one(data)
        return jsonify({"message": "Quote saved"}), 201

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500


@app.route('/api/quotes', methods=['GET'] )
def get_quotes():
    state = request.args.get('State')
    roof_type = request.args.get('RoofType')

    query = {}
    if state:
        query['State'] = State
    if roof_type:
        query['RoofType'] = RoofType

    quotes = list(quotes_collection.find(query, {'_id': 0}))  
    return jsonify(quotes)

@app.route('/')
def home():
    return "Flask + MongoDB is running!"

if __name__ == '__main__':
    app.run(debug=True)
