# calculate intrinsic value

'''
Intrinsic value=(DCF + cash/short term investments - total debt)/# outstanding shares

All the things we need to collect for each individual stock:

Present free cash flow (yfinance)
Growth rate (years 1 to 5) (EPS next 5 years from Finviz?)
Growth rate (years 6 to 10) (#4 but cut in half)
Growth rate (years 11 to 20) (~4% or 0.04, slight above inflation)
Discount rate (get Beta from Finviz, and correlate it to table)
Discount Factor, DF (1/(1+discount rate))
DCF
Current Cash and short term investments (yfinance)
Total debt (long term debt + short term debt) (yfinance)
Number of shares outstanding (Finviz)

'''

# imports
import yfinance as yf
from finvizfinance.quote import finvizfinance

# hard coded all values from Apple. it works!

def calculateIntrinsicValue(company):
    # 1. get free cash flow from last report

    # ticker symbol represents the company you're calculating for
    ticker_symbol = company

    # Get cashflow data for the company
    stock = yf.Ticker(ticker_symbol)
    cashflow_statement = stock.cashflow


    # Extract the most recent free cash flow value
    most_recent_date = cashflow_statement.columns[0]  # Assuming the most recent date is the first column
    free_cashflow = cashflow_statement.loc['Free Cash Flow', most_recent_date]
    #print(f'free cashflow is: {free_cashflow}')
    # 2. get growth rates (EPS next 5 years) from finviz

    # be more conservative as growth rates continue

    finviz_stock = finvizfinance(ticker_symbol)

    stock_fundament = finviz_stock.ticker_fundament()

    growth_rate_prct = stock_fundament['EPS next 5Y'] # returns a percentage

    negative_growth = False
    if growth_rate_prct == '-': # use inflation rate when there's a dash
        negative_growth = True # use for ltr if statement
        filler_growth_rate = 0.0328
    else:
        # Remove the '%' sign and convert the string to a float
        growth_rate_1to5 = float(growth_rate_prct.strip('%')) / 100
        # print(f'growth rate years 1 to 5 is: {growth_rate_1to5}')
        growth_rate_6to10 = growth_rate_1to5 / 2 # half original growth rate
        # print(f'growth rate years 6 to 10 is: {growth_rate_6to10}')
        growth_rate_11to20 = 0.0328   # US average long term rate of inflation

    # 3. get discount rate to find discount factor
    '''
    get beta from finviz
    compare to below:

    beta        discount rate
    b<0.8       5%
    0.8<=b<1.0  6%
    1.0<=b<1.1  6.5%
    1.1<=b<1.2  7%
    1.2<=b<1.3  7.5%
    1.3<=b<1.5  8%
    1.5<=b<1.6  8.5%
    b>1.6       9%
    '''

    # format a full if statement with above conditions ^

    # get beta from finviz
    beta_string = stock_fundament['Beta'] # returns a string

    if beta_string == '-':
        beta = 1.7
    else:
        # convert the string to a float
        beta = float(beta_string)
        # print(f'beta is: {beta}')

    if beta<0.8:
        discount_rate = 0.05
    elif 0.8<=beta<1.0:
        discount_rate = 0.06
    elif 1.0<=beta<1.1:
        discount_rate = 0.065
    elif 1.1<=beta<1.2:
        discount_rate = 0.07
    elif 1.2<=beta<1.3:
        discount_rate = 0.075
    elif 1.3<=beta<1.5:
        discount_rate = 0.08
    elif 1.5<=beta<1.6:
        discount_rate = 0.085
    elif beta>=1.6:
        discount_rate = 0.09

    discount_factor = 1/(1+discount_rate)
    # print(f'discount rate is: {discount_rate}')
    #print(f'discount factor is: {discount_factor}')


    # 4. find 20 year discounted cashflow model (DCF)
    if negative_growth == True:
        final_dcf = 0
        for i in range(1, 21):
            annual_dcf = free_cashflow * ((1 + filler_growth_rate) ** i) * ((discount_factor) ** i)
            final_dcf += annual_dcf
    else:
        final_dcf = 0
        for i in range (1,21):
            if i < 5:
                annual_dcf = free_cashflow * ((1 + growth_rate_1to5) ** i) * ((discount_factor) ** i)
                final_dcf += annual_dcf
            elif i == 5:
                annual_dcf = free_cashflow * ((1 + growth_rate_1to5) ** i) * ((discount_factor) ** i)
                cf_5 = free_cashflow * ((1 + growth_rate_1to5) ** i)
                final_dcf += annual_dcf
            elif 6 <= i < 10:
                annual_dcf = cf_5 * ((1 + growth_rate_6to10) ** (i - 5)) * ((discount_factor) ** i)
                final_dcf += annual_dcf
            elif i == 10:
                annual_dcf = cf_5 * ((1 + growth_rate_6to10) ** (i - 5)) * ((discount_factor) ** i)
                cf_10 = cf_5 * ((1 + growth_rate_6to10) ** (i - 5))
                final_dcf += annual_dcf
            elif 11 <= i < 21:
                annual_dcf = cf_10 * ((1 + growth_rate_11to20) ** (i - 10)) * ((discount_factor) ** i)
                final_dcf += annual_dcf

    #print(f'final dcf is: {final_dcf}')

    # 5. get cash and cash equivalents + short term investments from yf
    balance_sheet = stock.balance_sheet

    #if ticker_symbol == 'AXP':
     #   print(balance_sheet)

    try:
        total_cash = balance_sheet.loc['Cash Cash Equivalents And Short Term Investments', most_recent_date]
    except KeyError:
        try:
            total_cash = balance_sheet.loc["Cash And Cash Equivalents", most_recent_date]
        except KeyError:
            total_cash = None
            print('another key error')
    #total_cash = balance_sheet.loc['Cash Cash Equivalents And Short Term Investments', most_recent_date]
    #print(f'total cash is: {total_cash}')

    # 6. get total debt from yf
    total_debt = balance_sheet.loc['Total Debt', most_recent_date]
    #print(f'total debt is: {total_debt}')

    # 7. get number of shares outstanding
    shares_chart = stock.get_shares_full(start="2022-01-01", end=None)

    # Extract the shares outstanding from the last row
    last_row = shares_chart.iloc[-1]
    shares_outstanding = last_row  # no need to specify index bc it's not a df, it's a series
    #print(f'shares outstanding is: {shares_outstanding}')

    # 8. find intrinsic value
    intrinsic_value = (final_dcf + total_cash - total_debt) / shares_outstanding
    # print(intrinsic_value)

    return intrinsic_value