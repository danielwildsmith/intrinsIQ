from peewee import Model, SqliteDatabase, CharField, BooleanField

# Define an SQLite database connection
db = SqliteDatabase('mydatabase.db')

# Define your model(s)
class Task(Model):
    title = CharField()
    completed = BooleanField()

    class Meta:
        database = db  # Assign the database connection to the model
        
# class FundamentalVariables(Model):
    

db.connect()
print('Connected to db.')
db.create_tables([Task], safe=True)
db.close()
