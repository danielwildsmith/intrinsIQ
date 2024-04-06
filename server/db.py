from firebase_admin import credentials, firestore, initialize_app
import json
import os

if os.getenv("ENVIRONMENT") == "dev":
    cred = credentials.Certificate('./serviceAccount.json')
else:
    cred = credentials.Certificate(json.loads(os.getenv("SECRET")))

default_app = initialize_app(cred)

db = firestore.client()