
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()
app.use(cors())

app.get('/convert', (req, res) => {
    const toCurrency = req.query.to_currency
    const fromCurrency = req.query.from_currency
 
    console.log(req.query)
    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: { 
            from_currency: fromCurrency,
            to_currency: toCurrency, 
            function: 'CURRENCY_EXCHANGE_RATE', 
             },
        headers: {
            'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
    };

    axios.request(options).then((response) => {
        res.json(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
        //setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
        //setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']* getAmount)
    }).catch((error)=> {
        console.error(error);
    });
})

app.get('/news', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://crypto-news-live.p.rapidapi.com/news',
        headers: {
            'x-rapidapi-host': 'crypto-news-live.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
    };

    axios.request(options).then((response) => {
        res.json(response.data)
    }).catch((error) => {
        console.error(error);
    });
})
app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`))

