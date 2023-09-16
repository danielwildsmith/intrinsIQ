from sp500 import getCompanies
from intrinsic_value import calculateIntrinsicValue
from db import IntrinsicValues

companies = getCompanies()
companies.remove('ALL')
companies.remove('AXP')
# some companies have different column names and giving us problems...
# ALL, AXP

for company in companies:
    intrinsicValue = calculateIntrinsicValue(company)
    
    print(company, ': ', intrinsicValue)
    newRow = IntrinsicValues(company=company, intrinsicValue=intrinsicValue)
    newRow.save()

# Used to load the database with the stock prices over the last 5 years:
# print(loadStockPriceData(getCompanies()))