from peewee import Model, SqliteDatabase, CompositeKey, CharField, DoubleField, DateTimeField, BooleanField

# Define an SQLite database connection
db = SqliteDatabase('mydatabase.db')

# Define your model(s)
class StockPrices(Model):
    company = CharField()
    price = DoubleField()
    date = CharField()

    class Meta:
        primary_key = CompositeKey('company', 'date')
        database = db  # Assign the database connection to the model
    
# class FundamentalVariables(Model):
    

db.connect()
print('Connected to db.')
db.create_tables([StockPrices], safe=True)
db.close()
