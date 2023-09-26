from flask import Flask, jsonify
from db import connectDB, db, StockPrices, IntrinsicValues
from playhouse.shortcuts import model_to_dict
from flask_cors import CORS
from peewee import JOIN, fn

app = Flask(__name__)
cors = CORS(app)
connectDB()

@app.route('/')
def hello_world():
    return 'IntrinsIQ API'

@app.route('/stock/<company>', methods=['GET'])
async def getStock(company):
    print(company)
    try:
        records = StockPrices.select().where(StockPrices.company == company)
        data = []
        for record in records:
            data.append(model_to_dict(record))
        return jsonify(data)  # Serialize the data to JSON
    except StockPrices.DoesNotExist:
        return "No data found for company: " + company
    
@app.route('/intrinsic/<company>', methods=['GET'])
async def getIntrinsicValue(company):
    print(company)
    try:
        records = IntrinsicValues.select().where(IntrinsicValues.company == company)
        data = []
        for record in records:
            data.append(model_to_dict(record))
        return jsonify(data)  # Serialize the data to JSON
    except IntrinsicValues.DoesNotExist:
        return "No data found for company: " + company

# Return a list of rank values (intrinsic value - most recent stock price), sorted
# {company: string, rankValue: double}
@app.route('/rankingList', methods=['GET'])
async def getRankingList():
    try:
        # Joining the two tables and ordering by intrinsicValue descending
        query = (IntrinsicValues
         .select(IntrinsicValues, StockPrices.price.alias('mostRecentPrice'))
         .join(StockPrices, JOIN.LEFT_OUTER, on=(IntrinsicValues.company == StockPrices.company))
         .where(StockPrices.date == StockPrices.select(fn.MAX(StockPrices.date).alias('most_recent_date'))
                                              .where(IntrinsicValues.company == StockPrices.company))
         .order_by(IntrinsicValues.intrinsicValue.desc())
        )

        ranking_list = []
        for record in query.dicts():  # Use dicts() to iterate over as dictionaries
            rankValue = record['intrinsicValue'] - record['mostRecentPrice']
            ranking_list.append({
                "company": record['company'],
                "rankValue": rankValue,
                "stockPrice": record['mostRecentPrice'],
                "intrinsicValue": record['intrinsicValue']
            })

        ranking_list = sorted(ranking_list, key=lambda x: x['rankValue'], reverse=True)
        return jsonify(ranking_list)
    except IntrinsicValues.DoesNotExist:
        return jsonify({"error": "No instrinsic values found."})
    except Exception as e:
        print(e)  # Log the exception for debugging
        return jsonify({"error": "Server error."}), 500

@app.route('/list', methods=['GET'])
async def getCompanyList():
    try:
        records = IntrinsicValues.select()
        data = []
        for record in records:
            data.append(record.company)
        return data # Serialize the data to JSON
    except IntrinsicValues.DoesNotExist:
        return "No companies found."

if __name__ == '__main__':
    app.run()

db.close()
