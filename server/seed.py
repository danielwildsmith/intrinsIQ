from sp500 import getCompanies
from intrinsic_value import calculateIntrinsicValue
import yfinance as yf
from db import db
import math
from firebase_admin.firestore import FieldFilter
from firebase_admin import firestore

companies = getCompanies()

# Companies giving us problems, we remove:
companies.remove('MNST')
companies.remove('MPWR')
companies.remove('ISRG')
companies.remove('PAYC')

def updateDB():
    BATCH_SIZE = 50
    for i in range(0, len(companies), BATCH_SIZE):
        print("Processing batch from", i, "to", i + BATCH_SIZE - 1)
        batch_companies = companies[i:i + BATCH_SIZE]
        process_batch(batch_companies)


def process_batch(batch_companies):
    collection = db.collection('company_stock_data')

    for company in batch_companies:
        try:
            # Download 1 day's stock data for the company
            data = yf.download(company, period="1d", progress=False)
            data.reset_index(inplace=True)  # Ensure 'Date' is a column and not an index

            # Extract necessary data
            price = data['Close'].iloc[0]
            date_str = data['Date'].iloc[0].strftime('%Y-%m-%d')
            intrinsicValue = calculateIntrinsicValue(company)

            # Check for valid intrinsic value
            if not isinstance(intrinsicValue, (int, float)) or math.isnan(intrinsicValue) or math.isinf(intrinsicValue):
                continue

            doc_ref = collection.document()  # Generate a new document ID
            doc_ref.set({
                'company': company,
                'date': date_str,
                'price': price,
                'intrinsicValue': intrinsicValue,
                'rankValue': round(((intrinsicValue - price) / price) * 100, 2)
            })

        except Exception as e:
            print(f'Error processing {company}: {e}')


def updateRanks():
    collection = db.collection('company_stock_data')
    latest_docs = []

    for company in companies:
        query = collection.where(filter=FieldFilter("company", "==", company)).order_by('date', direction=firestore.Query.DESCENDING).limit(1)
        docs = query.stream()

        for doc in docs:
            doc_dict = doc.to_dict()
            if 'rankValue' in doc_dict:  # Ensure 'rankValue' exists
                latest_docs.append(doc_dict)

    # Sort the documents that have 'rankValue'
    sorted_rank_values = sorted(latest_docs, key=lambda x: x['rankValue'], reverse=True)

    # Update ranks
    for index, item in enumerate(sorted_rank_values, start=1):
        query = collection.where('company', '==', item['company']).order_by("date", direction=firestore.Query.DESCENDING).limit(1)
        docs = query.stream()

        for doc in docs:
            doc_ref = collection.document(doc.id)
            doc_ref.update({'rank': index})
            break
