from db import *
from sp500 import getCompanies, loadStockPriceData
from intrinsic_value import calculateIntrinsicValue
from peewee import IntegrityError

def seedDB():
    db.create_tables([StockPrices, IntrinsicValues], safe=True)
    
    companies = getCompanies()
    # Companies giving us problems, we removed:
    companies.remove('MNST')
    companies.remove('MPWR')
    companies.remove('ISRG')
    
    # Load in stock price data from past 5 years
    loadStockPriceData(companyList=companies[53:])
    
    count = 1
    for company in companies:
        intrinsicValue = calculateIntrinsicValue(company)
        
        try:
            newRow, created = IntrinsicValues.get_or_create(company=company, intrinsicValue=intrinsicValue)
            if not created:
                newRow.intrinsicValue = intrinsicValue
                newRow.save()
        except IntegrityError as e:
            print(f"Error inserting/updating record for company {company}: {e}")

        count += 1
