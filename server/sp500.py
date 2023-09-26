import requests
from bs4 import BeautifulSoup
import yfinance as yf
from db import StockPrices, db
from peewee import IntegrityError
import peewee

def getCompanies():
    companyList = []

    # Define the URL of the Wikipedia page containing the S&P 500 components
    url = 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies'

    # Send an HTTP GET request to the URL
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content of the page using BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find the table that contains the S&P 500 components
        table = soup.find('table', {'class': 'wikitable'})
        
        # Initialize an empty dictionary to store the company names and ticker symbols
        sp500_data = {}
        
        # Iterate over the rows in the table, starting from the second row (skip the header)
        for row in table.find_all('tr')[1:]:
            # Extract the company name and ticker symbol from the table cells
            cells = row.find_all('td')
            if len(cells) >= 2:
                company_name = cells[0].text.strip()
                ticker_symbol = cells[1].text.strip()
                sp500_data[company_name] = ticker_symbol

        # Print the dictionary of S&P 500 companies and ticker symbols
        for company_name, ticker_symbol in sp500_data.items():
            companyList.append(company_name)

    else:
        print('Failed to retrieve the webpage.')

    companyList =[ticker.replace('.', '-') for ticker in companyList]


    return companyList

def loadStockPriceData(companyList):
    i = 0
    for company in companyList:
        i += 1
        print(i, company)
        data = yf.download(str(company), period="5y")
        data.reset_index(inplace=True)

        # Prepare a list of dictionaries for batch insert/update
        records = []
        for index, row in data.iterrows():
            record = {
                'company': company,
                'price': row['Close'],
                'date': str(row['Date'])[:10]
            }
            records.append(record)

        # Replace records in smaller transactions
        batch_size = 100  # Adjust this value as needed
        for batch_start in range(0, len(records), batch_size):
            batch_records = records[batch_start: batch_start + batch_size]
            with db.atomic():
                for record in batch_records:
                    query = StockPrices.replace(**record)
                    query.execute()
