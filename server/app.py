from flask import Flask, jsonify
from flask_cors import CORS
import os
from firebase_admin.firestore import FieldFilter
from firebase_admin import firestore

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "https://intrinsiq.vercel.app/"]}})
from db import db

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
    
@app.route('/rankings', methods=['GET'])
async def getRankings():
    company_stock_ref = db.collection('company_stock_data')
    
    query_ref = company_stock_ref.order_by("date", direction=firestore.Query.DESCENDING).limit(500).order_by("rank", direction=firestore.Query.ASCENDING).stream()
    
    documents = [doc.to_dict() for doc in query_ref]
    
    return jsonify(documents)

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000))