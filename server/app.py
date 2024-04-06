from flask import Flask, jsonify, request, abort
from flask_cors import CORS
import os
from firebase_admin.firestore import FieldFilter
from firebase_admin import firestore
from seed import updateDB

app = Flask(__name__)
from db import db
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "https://intrinsiq.vercel.app/"]}})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'https://intrinsiq.vercel.app')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/')
def hello_world():
    return 'IntrinsIQ API'

@app.route('/historical/<company>', methods=['GET'])
async def getStock(company):
    company_stock_ref = db.collection('company_stock_data')
    query_ref = company_stock_ref.where(filter=FieldFilter("company", "==", company)).order_by("date", direction=firestore.Query.ASCENDING).stream()

    documents = []
    for doc in query_ref:
        documents.append(doc.to_dict())

    return jsonify(documents)

@app.route('/update', methods=['POST'])
async def updateDB(): 
    if request.headers.get('Authorization') != os.getenv("AUTH_KEY"):
        abort(401)

    print("Updating DB...")
    await updateDB()
    return 'Update process finished', 200
    
@app.route('/rankings', methods=['GET'])
async def getRankings():
    company_stock_ref = db.collection('company_stock_data')
    
    query_ref = company_stock_ref.order_by("date", direction=firestore.Query.DESCENDING).limit(500).order_by("rank", direction=firestore.Query.ASCENDING).stream()
    
    documents = [doc.to_dict() for doc in query_ref]
    
    return jsonify(documents)

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000))