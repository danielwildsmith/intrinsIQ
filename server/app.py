from dotenv import load_dotenv
load_dotenv()
from flask import Flask
import json
from datetime import datetime, timedelta
import os

app = Flask(__name__)
from db import db

@app.route('/')
def hello_world():
    return 'IntrinsIQ API'

@app.route('/stock/<company>', methods=['GET'])
async def getStock(company):
    documents = list(db['company_stock_data'].find({'company': company}))
    return json.dumps(documents, default=str)
    
@app.route('/intrinsic/<company>', methods=['GET'])
async def getIntrinsicValue(company):
    document = db['company_stock_data'].find_one({'company': company, "date": (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d')})
    return json.dumps(document, default=str)

@app.route('/rankings/<company>', methods=['GET'])
async def getRanking(company):
    document = db['rankings'].find_one({'company': company})
    return json.dumps(document, default=str)

@app.route('/rankings', methods=['GET'])
async def getRankings():
    documents = list(db['rankings'].find({}))
    return json.dumps(documents, default=str)

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000))