ShellHacks!! 2023

IntrinsIQ calculates the intrinsic value of stocks within the S&P500 using a discounted cash flow model. 
Essentially, we are projecting the company’s future cash flows and discounting them to the present value.

intrinsic value = (dcf + cash and short term investments - total debt) / shares outstanding

- A 20 year time horizon
- Growth rate years 1-5 calculation from Finviz (“EPS next 5Y”)
- Growth rate years 6-10 being half of years 1-5 (conservative)
- Growth rate years 11-20 being following inflation
- An average long term US inflation rate of 3.28%

We also suffered from other limitations, including the occasional occurrence of incomplete or uncleanable data. 
In these few cases, we developed conservative approximations or simply omitted the data point.

Disclaimer: IntrinsIQ is not a financial advisor, nor is this meant to resemble any form of financial advice. 
Please consult a certified financial advisor before making any investment decisions and carry out your own thorough due diligence.