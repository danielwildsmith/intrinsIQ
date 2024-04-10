# IntrinsIQ Backend
Built with Flask and Firestore. Python must be installed.

## Usage
Ensure that the current directory is `/server`.

Install dependencies:
```
pip install -r requirements.txt
```

Run server:
```
python app.py
```

### Required Configuration
In `/server`, include a valid `serviceAccount.json` that can be generated within the Google Cloud project's `IAM Service Accounts`. 

In `/server`, create a file called `.env`. This file must contain:
```
ENVIRONMENT=dev
```
