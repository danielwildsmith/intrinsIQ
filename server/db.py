from google.cloud import secretmanager_v1 as secretmanager
from firebase_admin import credentials, initialize_app
import json
import os
from dotenv import load_dotenv

# Load environment variables from .env file for local development
load_dotenv()

# Function to initialize Firebase Admin using Google Cloud Secret Manager
# Check if running locally or deployed
if os.getenv("ENVIRONMENT") == "dev":
    from google.oauth2 import service_account
    creds = service_account.Credentials.from_service_account_file("./serviceAccount.json")
    client = secretmanager.SecretManagerServiceClient(credentials=creds)
else:
    client = secretmanager.SecretManagerServiceClient()

project_id = os.getenv("PROJECT_ID")
secret_name = os.getenv("SECRET_NAME")
name = f"projects/{project_id}/secrets/{secret_name}/versions/latest"

# Access the secret version
response = client.access_secret_version(request={"name": name})
secret_string = response.payload.data.decode("UTF-8")

# Use the secret to initialize Firebase Admin
cred = credentials.Certificate(json.loads(secret_string))
app = initialize_app(cred)

from firebase_admin import firestore
db = firestore.client()