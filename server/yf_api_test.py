
# calculate intrinsic value

'''
Intrinsic value=(DCF + cash/short term investments - total debt)/# outstanding shares

All the things we need to collect for each individual stock:

Present free cash flow (yfinance)
Current Cash and short term investments (yfinance)
Total debt (long term debt + short term debt) (yfinance)
Growth rate (years 1 to 5) (EPS next 5 years from Finviz?)
Growth rate (years 6 to 10) (#4 but cut in half)
Growth rate (years 11 to 20) (~4% or 0.04, slight above inflation)
Discount rate (get Beta from Finviz, and correlate it to table)
Discount Factor, DF (1/(1+discount rate))
Number of shares outstanding (Finviz)

'''

# imports
import yfinance as yf
from finvizfinance.quote import finvizfinance

# hard coded all values from Apple. it works!
# should be 106.01768821207243

# 1. get free cash flow from last report
free_cashflow = 111443000000

# 2. get growth rates (EPS next 5 years) from finviz
# look at finviz api

# be more conservative as growth rates continue
growth_rate_1to5 = 0.0637   # 6.37
growth_rate_6to10 = growth_rate_1to5 / 2 # half original growth rate
growth_rate_11to20 = 0.0328   # inflation rate

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

# convert the string to a float
beta = 1.28

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

# 4. find 20 year discounted cashflow model (DCF)

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

# 5. get cash and cash equivalents + short term investments from yf
# TEST total_cash = 93025000000
total_cash = 48304000000

# 6. get total debt from yf
# total_debt = 112723000000
total_debt = 120069000000

# 7. get number of shares outstanding

shares_outstanding = 15630000000

# 8. find intrinsic value
intrinsic_value = (final_dcf + total_cash - total_debt) / shares_outstanding
print(f'intrinsic value is: {intrinsic_value}')

