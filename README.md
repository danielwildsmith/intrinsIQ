# IntrinsIQ
Originally a hackathon project at Shellhacks 2023, IntrinsIQ is a web app that functions as an initial screener for
S&P 500 stock selections, calculating intrinsic values through the Yahoo Finance API for informed investing.

6 months after the hackathon, IntrinsIQ's utility was fully realized, with our portfolio of top 10 recommendations outperforming the S&P 500 market with 6 percent higher annualized returns. Because of this success, we decided to refine and deploy IntrinsIQ. 

Here is a [video](https://www.youtube.com/watch?v=M4zhRTAnLeE) demonstration of our hackathon project. 

## Installation and Usage
See README.md within client and server folders.

## Intrinsic Value Calculation
IntrinsIQ calculates the intrinsic value of stocks within the S&P500 using a discounted cash flow model. 
Essentially, we are projecting the company’s future cash flows and discounting them to the present value.

intrinsic value = (dcf + cash and short term investments - total debt) / shares outstanding

This calculation is useful for finding potentially undervalued stocks that will perform well in the future in the face of temporary market conditions. 
That said, it is paramount to recognize that this valuation method has its limitations due to its sensitivity to a large number of assumptions and forecasts. 
Some of them include:

- A 20 year time horizon
- Growth rate years 1-5 calculation from Finviz (“EPS next 5Y”)
- Growth rate years 6-10 being half of years 1-5 (conservative)
- Growth rate years 11-20 being following inflation
- An average long term US inflation rate of 3.28%

One limitation of this calculation involves few companies missing due to incomplete or uncleanable data. 

## Disclaimer
_IntrinsIQ is not a financial advisor, nor is this meant to resemble any form of financial advice. 
Please consult a certified financial advisor before making any investment decisions and carry out your own due diligence._
