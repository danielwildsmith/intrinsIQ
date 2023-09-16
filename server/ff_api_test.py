from finvizfinance.quote import finvizfinance

finviz_stock = finvizfinance('AAPL')

stock_fundament = finviz_stock.ticker_fundament()

beta_string = stock_fundament['Beta'] # returns a string

# convert the string to a float
beta = float(beta_string)

print(beta)
#print(growth_rate_1to5)