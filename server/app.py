from flask import Flask, jsonify
from datetime import datetime
import os
from firebase_admin.firestore import FieldFilter

app = Flask(__name__)
from db import db

@app.route('/')
def hello_world():
    return 'IntrinsIQ API'

@app.route('/stock/<company>', methods=['GET'])
async def getStock(company):
    company_stock_ref = db.collection('company_stock_data')
    query_ref = company_stock_ref.where(filter=FieldFilter("company", "==", company)).stream()

    documents = []
    for doc in query_ref:
        documents.append(doc.to_dict())

    return jsonify(documents)
    
@app.route('/intrinsic/<company>', methods=['GET'])
async def getIntrinsicValue(company):
    date_str = (datetime.now()).strftime('%Y-%m-%d')
    
    company_stock_ref = db.collection('company_stock_data')
    
    # Query for documents where `company` matches and `date` is yesterday
    query_ref = company_stock_ref.where(filter=FieldFilter("company", "==", company)).where(filter=FieldFilter("date", "==", date_str)).limit(1).stream()
    
    document = None
    for doc in query_ref:
        document = doc.to_dict()
        break  # Assuming there's only one document
    
    if document:
        return jsonify(document)
    else:
        return jsonify({"error": "Document not found"}), 404

@app.route('/rankings/<company>', methods=['GET'])
async def getRanking(company):
    rankings_ref = db.collection('rankings')
    
    # Query for documents where `company` matches
    query_ref = rankings_ref.where(filter=FieldFilter("company", "==", company)).limit(1).stream()
    
    document = None
    for doc in query_ref:
        document = doc.to_dict()
        break  # Assuming there's only one document per company
    
    if document:
        return jsonify(document)
    else:
        return jsonify({"error": "Document not found"}), 404

@app.route('/rankings', methods=['GET'])
async def getRankings():
    rankings_ref = db.collection('rankings')
    
    query_ref = rankings_ref.order_by('rank').stream()
    
    documents = [doc.to_dict() for doc in query_ref]
    
    return jsonify(documents)

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000))