from sp500 import getCompanies
from intrinsic_value import calculateIntrinsicValue
from db import IntrinsicValues

companies = getCompanies()
companies.remove('MNST')
companies.remove('MPWR')
companies.remove('ISRG')
# some companies have different column names and giving us problems...
# ALL, AXP

# 33 AWK is -206.11
# 43 AAPL is 104.38
count = 1
for company in companies:
    intrinsicValue = calculateIntrinsicValue(company)
    
    print(count,company, ': ', intrinsicValue)
    newRow = IntrinsicValues(company=company, intrinsicValue=intrinsicValue)
    newRow.save()
    count += 1

# Used to load the database with the stock prices over the last 5 years:
print(loadStockPriceData(getCompanies()))