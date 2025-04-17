from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
import csv

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient("mongodb+srv://barfikhan78621:hEBrzwiw0NLYmcvE@cluster0.3yrfrdh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client['enkoat_db']         # database name
quotes_collection = db['quotes'] # collection name
meta_collection = db['meta']     # <-- new collection to store metadata flags

# Check if mock data has already been inserted
mock_data_flag = meta_collection.find_one({'mock_data_inserted': True})

if not mock_data_flag:
    print("Mock data not found. Inserting mock data into quotes collection...")

    documents = []
    with open('mock_data.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            row['RoofSize'] = int(row['RoofSize'])
            row['Date'] = datetime.strptime(row['Date'], "%Y-%m-%d")
            documents.append(row)

    if documents:
        quotes_collection.insert_many(documents)
        meta_collection.insert_one({'mock_data_inserted': True})  # ✅ Set the flag
        print(f"{len(documents)} mock quotes inserted.")
else:
    print("Mock data already inserted previously. Skipping insertion.")



# --- API Routes ---

@app.route('/api/quotes', methods=['POST'])
def submit_quote():
    data = request.get_json()
    print("Received data:", data)

    try:
        required_fields = ['Contractor', 'Company', 'RoofSize', 'RoofType', 'City', 'State', 'Date']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        data['RoofSize'] = int(data['RoofSize'])
        data['Date'] = datetime.strptime(data['Date'], '%Y-%m-%d')

        quotes_collection.insert_one(data)
        return jsonify({"message": "Quote saved"}), 201

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500


@app.route('/api/quotes', methods=['GET'])
def get_quotes():
    try:
        state = request.args.get('State')
        roof_type = request.args.get('RoofType')

        query = {}
        if state:
            query['State'] = state
        if roof_type:
            query['RoofType'] = roof_type

        quotes = list(quotes_collection.find(query, {'_id': 0}))
        return jsonify(quotes)

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500


@app.route('/api/quotes/delete_all', methods=['DELETE'])
def delete_all_quotes():
    try:
        result = quotes_collection.delete_many({})
        return jsonify({'message': f'{result.deleted_count} quotes deleted.'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/')
def home():
    return "Flask + MongoDB is running!"


if __name__ == '__main__':
    app.run(debug=True)
