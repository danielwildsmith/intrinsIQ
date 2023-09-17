from peewee import Model, SqliteDatabase, CompositeKey, CharField, DoubleField

# Define an SQLite database connection
db = SqliteDatabase('mydatabase.db')

def connectDB(db):
    db.connect()
    print('Connected to db.')
    db.create_tables([StockPrices, IntrinsicValues], safe=True)
    
# Define your model(s)
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