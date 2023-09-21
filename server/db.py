from dotenv import load_dotenv
load_dotenv()
import os
from peewee import Model, CompositeKey, CharField, DoubleField
from playhouse.mysql_ext import MySQLConnectorDatabase

# Define a MySQL database connection
db = MySQLConnectorDatabase(
    os.getenv("DB_NAME"),
    user=os.getenv("DB_USERNAME"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),
    port=int(os.getenv("DB_PORT")),
    ssl_ca="/etc/ssl/cert.pem",  # Path to your CA certificate
    charset='utf8mb4'
)

# Define your model(s)
class BaseModel(Model):
    """A base model that will use our MySQL database"""
    class Meta:
        database = db

class StockPrices(Model):
    company = CharField()
    price = DoubleField()
    date = CharField()

    class Meta:
        primary_key = CompositeKey('company', 'date')
        database = db  # Assign the database connection to the model
    
class IntrinsicValues(Model):
    company = CharField()
    intrinsicValue = DoubleField()
    
    class Meta:
        primary_key = CompositeKey('company')
        database = db  # Assign the database connection to the model
        
def connectDB():
    db.connect()
    print('Connected to db.')   
