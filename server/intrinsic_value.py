
# calculate intrinsic value

'''
Intrinsic value=(DCF + cash/short term investments - total debt)/# outstanding shares

All the things we need to collect for each individual stock:

Present free cash flow (yahoo finance)
Current Cash and short term investments (yahoo finance)
Total debt (long term debt + short term debt) (yahoo finance)
Growth rate (years 1 to 5) (EPS next 5 years from Finviz?)
Growth rate (years 6 to 10) (#4 but cut in half)
Growth rate (years 11 to 20) (~4% or 0.04, slight above inflation)
Discount rate (get Beta from Finviz, and correlate it to table)
Discount Factor, DF (1/(1+discount rate))
Number of shares outstanding (Finviz)

'''


# hard coded all values from Apple. it works!

# 1. get free cash flow from TTM (trailing 12 months
# would use yf
free_cashflow = 71706000000

# 2. get growth rates from finviz
# look at finviz api

# be more conservative as growth rates continue
growth_rate_1to5 = 0.1246   # 12.46%
growth_rate_6to10 = growth_rate_1to5/2 # half original growth rate
growth_rate_11to20 = 0.04   # inflation rate


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
beta = 1.32 # would get this value from finviz
if 1.3<=beta<1.5:
    discount_rate = 0.08

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
print(final_dcf)

'''
hard code testing 

dcf_1 = free_cashflow * (1+growth_rate_1to5) * (discount_factor)
print(f'dcf 1 is: {dcf_1}')

dcf_2 = free_cashflow * ((1+growth_rate_1to5)**2) * (discount_factor**2)
print(f'dcf 2 is: {dcf_2}')

dcf_3 = free_cashflow * ((1+growth_rate_1to5)**3) * (discount_factor**3)
print(f'dcf 3 is: {dcf_3}')

dcf_4 = free_cashflow * ((1+growth_rate_1to5)**4) * (discount_factor**4)
print(f'dcf 4 is: {dcf_4}')

dcf_5 = free_cashflow * ((1+growth_rate_1to5)**5) * (discount_factor**5)
cf_5 = free_cashflow * ((1+growth_rate_1to5)**5)
print(f'dcf 5 is: {dcf_5}')

dcf_6 = cf_5 * ((1+growth_rate_6to10)**1) * (discount_factor**6)
print(f'dcf 6 is: {dcf_6}')

dcf_7 = cf_5 * ((1+growth_rate_6to10)**2) * (discount_factor**7)

dcf_8 = cf_5 * ((1+growth_rate_6to10)**3) * (discount_factor**8)

dcf_9 = cf_5 * ((1+growth_rate_6to10)**4) * (discount_factor**9)

dcf_10 = cf_5 * ((1+growth_rate_6to10)**5) * (discount_factor**10)
cf_10 = cf_5 * ((1+growth_rate_6to10)**5)

dcf_11 = cf_10 * ((1+growth_rate_11to20)**1) * (discount_factor**11)
dcf_12 = cf_10 * ((1+growth_rate_11to20)**2) * (discount_factor**12)
dcf_13 = cf_10 * ((1+growth_rate_11to20)**3) * (discount_factor**13)
dcf_14 = cf_10 * ((1+growth_rate_11to20)**4) * (discount_factor**14)
dcf_15 = cf_10 * ((1+growth_rate_11to20)**5) * (discount_factor**15)
dcf_16 = cf_10 * ((1+growth_rate_11to20)**6) * (discount_factor**16)
dcf_17 = cf_10 * ((1+growth_rate_11to20)**7) * (discount_factor**17)
dcf_18 = cf_10 * ((1+growth_rate_11to20)**8) * (discount_factor**18)
dcf_19 = cf_10 * ((1+growth_rate_11to20)**9) * (discount_factor**19)
dcf_20 = cf_10 * ((1+growth_rate_11to20)**10) * (discount_factor**20)
print(f'dcf 20 is: {dcf_20}')

total_dcf = dcf_1 + dcf_2 + dcf_3 + dcf_4 + dcf_5 + dcf_6 + dcf_7 + dcf_8 + dcf_9 + dcf_10 + dcf_11 + dcf_12 + dcf_13 + dcf_14 + dcf_15 + dcf_16 + dcf_17 + dcf_18 + dcf_19 + dcf_20
print(f'total dcf is: {total_dcf}')
'''

# 5. get cash and cash equivalents + short term investments from yf
total_cash = 93025000000

# 6. get total debt from yf
total_debt = 112723000000

# 7. get number of shares outstanding
shares_outstanding = 17250000000

# 8. find intrinsic value
intrinsic_value = (final_dcf + total_cash - total_debt) / shares_outstanding
print(intrinsic_value)

