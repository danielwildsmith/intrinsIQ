from sp500 import getCompanies
from intrinsic_value import calculateIntrinsicValue
import yfinance as yf
from db import db
import math
from firebase_admin.firestore import FieldFilter

companies = getCompanies()

# Companies giving us problems, we remove:
companies.remove('MNST')
companies.remove('MPWR')
companies.remove('ISRG')
companies.remove('PAYC')

def seedStockPriceData():
    collection = db.collection('company_stock_data')
    for company in companies:
        print(f'Processing {company}...')
        data = yf.download(company, period="5y")
        data.reset_index(inplace=True)

        batch = db.batch()
        for index, row in data.iterrows():
            doc_ref = collection.document()
            record = {
                'company': company,
                'date': row['Date'].strftime('%Y-%m-%d'),
                'price': row['Close']
            }
            batch.set(doc_ref, record)
        batch.commit()

def updateDB():
    rankValues = []
    collection = db.collection('company_stock_data')

    for company in companies:
        try:
            data = yf.download(company, period="1d", progress=False)

            price = data['Close'].iloc[0]
            date_str = data.index[0].strftime('%Y-%m-%d')
            intrinsicValue = calculateIntrinsicValue(company)
            if not isinstance(intrinsicValue, (int, float)) or math.isnan(intrinsicValue) or math.isinf(intrinsicValue): continue

            query = collection.where(filter=FieldFilter("company", "==", company)).where(filter=FieldFilter("date", "==", date_str)).limit(1)

            docs = query.stream()

            doc_found = None
            for doc in docs:
                doc_found = doc
                break

            if doc_found:
                # If document found, update it
                doc_ref = collection.document(doc_found.id)
                doc_ref.update({
                    'price': price,
                    'intrinsicValue': intrinsicValue
                })
            else:
                # If no matching document, create a new one
                collection.add({
                    'company': company,
                    'date': date_str,
                    'price': price,
                    'intrinsicValue': intrinsicValue
                })
            
            rankValues.append({
                'company': company,
                'rankValue': intrinsicValue - price
            })
        except Exception as e:
            print(f'Error processing {company}: {e}')

    collection = db.collection('rankings')

    sorted_rank_values = sorted(rankValues, key=lambda x: x['rankValue'], reverse=True)
    for index, item in enumerate(sorted_rank_values, start=1):
        # Create a query for documents with a matching 'company'
        query = collection.where('company', '==', item['company']).limit(1)
        docs = query.stream()

        doc_found = None
        for doc in docs:
            doc_found = doc
            break

        if doc_found:
            # If the document exists, update it
            doc_ref = collection.document(doc_found.id)
            doc_ref.update({'rank': index})
        else:
            # If no matching document exists, create a new one
            collection.add({'company': item['company'], 'rank': index})
