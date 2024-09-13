# IntrinsIQ
#### A full-stack web application that calculates intrinsic values of S&P 500 stocks for informed investing

## Table of Contents
- [Description](#description)
- [Installation and Usage](#installation-and-usage)
  * [Client Setup](#client-setup)
  * [Server Setup](#server-setup)
- [Rest API Documentation](#rest-api-documentation)
- [Credits](#credits)
- [License](#license)
- [Disclaimer](#disclaimer)

## Description
Originally a hackathon project at Shellhacks 2023, IntrinsIQ is a web app built in Next.js and Flask
that functions as an initial screener for S&P 500 stock selections. It leverages the Yahoo Finance API to calculate intrinsic values.

Only after the hackathon was IntrinsIQ's utility fully realized, with our portfolio of top 10 recommendations outperforming the S&P 500 market with 11% higher annualized returns. Because of this success, we decided to refine and deploy IntrinsIQ.

### Intrinsic Value Calculation
IntrinsIQ calculates the intrinsic value of stocks within the S&P500 using a discounted cash flow model.
Essentially, we are projecting the company’s future cash flows and discounting them to the present value.

``` intrinsic value ``` = ```(dcf + cash and short term investments - total debt) / shares outstanding```

This calculation is useful for finding potentially undervalued stocks that will perform well in the future in the face of temporary market conditions.
That said, it is paramount to recognize that this valuation method has its limitations due to its sensitivity to a large number of assumptions and forecasts.
Some of them include:

- A 20 year time horizon
- Growth rate years 1-5 calculation from Finviz (“EPS next 5Y”)
- Growth rate years 6-10 being half of years 1-5 (conservative)
- Growth rate years 11-20 being following inflation
- An average long term US inflation rate of 3.28%

One limitation of this calculation involves few companies missing due to incomplete or uncleanable data.

### Video Demonstration
[Demo and Explanation Video](https://www.youtube.com/watch?v=M4zhRTAnLeE)

## Installation and Usage
### Client Setup
Pre-requisite: Node.js must be installed.
1. Navigate to the client directory: ```cd client```
2. Install dependencies:
```
npm install
```
3. In `/client`, create a file called `.env.local`. This file must contain:
```
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
```
4. Run client in development mode:
```
npm run dev
```

#### Client Deployment
This project is deployed on Vercel. To deploy on Vercel, simply push the code to a GitHub repository and connect it to Vercel. The deployment will be automatic.

### Server Setup
Pre-requisite: Python and Docker must be installed.
1. Navigate to the server directory: ```cd server```
2. Install dependencies:
```
pip install -r requirements.txt
```
3. In `/server`, include a valid `serviceAccount.json` that can be generated within the Google Cloud project's `IAM Service Accounts`. This is for the database (Firestore) connection and deployment.
4. In `/server`, create a file called `.env`. This file must contain:
```
ENVIRONMENT=dev
```

5. Run server in development mode:
```
python app.py
```

#### Server Deployment
This project is deployed using Docker and Google Cloud Run.

## Rest API Documentation
### GET ```/```
- Description: Used to wake up the server when it is in a cold state upon loading the client home page.
- Response:
  * ```200 OK```: Returns a string IntrinsIQ API.

### GET ```/historical/<company>```
- Description: Fetch historical stock data for a specific company.
- Path Parameters:
  * ```company```: The company symbol or name to fetch the historical stock data for.
- Response:
  * ```200 OK```: Returns a JSON array of stock data for the specified company.
    ```
    [
        {
            "company": "AAPL",
            "date": "2024-09-01",
            "price": 180.12,
            ...
        },
        ...
    ]
    ```

  * ```404 Not Found```: If no data is available for the given company.

### GET ```/rankings```
- Description: Fetch the latest 500 stock records, ordered by ```date``` in descending order and by ```rank``` in ascending order.
- Response:
  * ```200 OK```: Returns a JSON array of ranked stock data.
    ```
    [
        {
            "company": "AAPL",
            "date": "2024-09-13",
            "rank": 1,
            ...
        },
        ...
    ]
    ```

### POST ```/update```
- Description: Updates the stock data in the database. Used by a weekly cron job.
- Headers:
  * ```AUTH```: The authorization key, should match the ```AUTH_KEY``` environment variable.
- Response:
  * ```200 OK```: Returns a message indicating the update process is finished.
  * ```401 Unauthorized```: If the ```AUTH``` header is missing or incorrect.

### POST ```/rerank```
- Description: Reranks the stocks in the database. Used by a weekly cron job.
- Headers:
  * ```AUTH```: The authorization key, should match the ```AUTH_KEY``` environment variable.
- Response:
  * ```200 OK```: Returns a message indicating the re-rank process is finished.
  * ```401 Unauthorized```: If the ```AUTH``` header is missing or incorrect.

## Credits
- [Daniel Wildsmith](https://github.com/danielwildsmith)
- [Joey Cabezas](https://github.com/josephcabezas)
- [Anton Salvador](https://github.com/AntonCSalvador)
- [Mathew Alangadan](https://github.com/malangadan)

## License
This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.

## Disclaimer
_IntrinsIQ is not a financial advisor, nor is this meant to resemble any form of financial advice.
Please consult a certified financial advisor before making any investment decisions and carry out your own due diligence._
