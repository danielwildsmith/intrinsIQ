from firebase_admin import credentials, firestore, initialize_app
import json
import os
from dotenv import load_dotenv
load_dotenv()
from firebase_admin.firestore import FieldFilter

if os.getenv("ENVIRONMENT") == "dev":
    cred = credentials.Certificate('./serviceAccount.json')
else:
    cred = credentials.Certificate(json.loads(os.getenv("SECRET")))

default_app = initialize_app(cred)

db = firestore.client()
query = db.collection('company_stock_data').where(filter=FieldFilter("date", "==", "2024-05-03"))

docs = query.stream()

# Delete the most recent record
for doc in docs:
    print(f"Deleting document with ID: {doc.id}")
    db.collection('company_stock_data').document(doc.id).delete()
