from sp500 import getCompanies
from intrinsic_value import calculateIntrinsicValue
import yfinance as yf
from db import db
import math

companies = getCompanies()

# Companies giving us problems, we remove:
companies.remove('MNST')
companies.remove('MPWR')
companies.remove('ISRG')
companies.remove('PAYC')

def seedStockPriceData():
    collection = db['company_stock_data']
    for company in companies:
        print(f'Processing {company}...')
        data = yf.download(company, period="5y")
        data.reset_index(inplace=True)

        records = []
        for index, row in data.iterrows():
            record = {
                'company': company,
                'date': row['Date'].strftime('%Y-%m-%d'),
                'price': row['Close']
            }
            records.append(record)
        collection.insert_many(records)

def updateDB():
    rankValues = []
    collection = db['company_stock_data']
    for company in companies:
        print(f'Processing {company}...')
        data = yf.download(company, period="1d")

        price = data['Close'].iloc[0]
        intrinsicValue = calculateIntrinsicValue(company)
        if not isinstance(intrinsicValue, (int, float)) or math.isnan(intrinsicValue) or math.isinf(intrinsicValue): continue

        collection.update_one({'company': company, 'date': data.index[0].strftime('%Y-%m-%d')}, 
                              {'$set': {'price': price, 'intrinsicValue': intrinsicValue}},
                                upsert=True)
        
        rankValues.append({
            'company': company,
            'rankValue': intrinsicValue - price
        })
    
    collection = db['rankings']

    for index, item in enumerate(sorted(rankValues, key=lambda x: x['rankValue'], reverse=True)):
        print(item['company'], item['rankValue'], index + 1)
        collection.find_one_and_replace({'company': item['company']}, {'company': item['company'], 'rank': index + 1}, upsert=True)

updateDB()