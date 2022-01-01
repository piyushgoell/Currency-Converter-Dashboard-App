import { useState } from "react"
import ExchangeRate from "./ExchangeRate"
import axios from 'axios'

const CurrencyConverter = () => {
    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']
    const [getChoosenPrimaryCurrency, setChoosenPrimaryCurrency] = useState('BTC')
    const [getChoosenSecondaryCurrency, setChoosenSecondaryCurrency] = useState('BTC')
    const [getAmount, setAmount] = useState(1)
    const [getExchangeRate, setExchangeRate] = useState(0)
    const [getResult, setResult] = useState(0)
    //console.log(getAmount)

    const convert = () => {

        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: { 
                from_currency: getChoosenPrimaryCurrency,
                to_currency: getChoosenSecondaryCurrency, 
                function: 'CURRENCY_EXCHANGE_RATE', 
                 },
            headers: {
                'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
            }
        };

        axios.request(options).then((response) => {
//            console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']* getAmount)
        }).catch((error)=> {
            console.error(error);
        });
    }

    return (
        <div className="currency-converter">
            <h2>Currency Converter</h2>
            <div className="input-box">
                <table>
                    <tbody>
                        <tr>
                            <td>Primary Currency:</td>
                            <td>
                                <input
                                    type="number"
                                    name="currency-convertor"
                                    value={getAmount}
                                    onChange={(event) => setAmount(event.target.value)}
                                />
                            </td>
                            <td>
                                <select
                                    value={getChoosenPrimaryCurrency}
                                    name="currency-option-1"
                                    className="currency-options"
                                    onChange={(event) => setChoosenPrimaryCurrency(event.target.value)}
                                >
                                    {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Secondary Currency:</td>
                            <td>
                                <input 
                                type="number"
                                 name="currency-convertor" 
                                 value={getResult} 
                                 disabled={true}
                                 />
                            </td>
                            <td>
                                <select
                                    value={getChoosenSecondaryCurrency}
                                    name="currency-option-2"
                                    className="currency-options"
                                    onChange={(event) => setChoosenSecondaryCurrency(event.target.value)}
                                >
                                    {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button id="convert-button" onClick={convert}>Convert</button>
            </div>
            <ExchangeRate 
                ExchangeRate={getExchangeRate}
                ChoosenPrimaryCurrency={getChoosenPrimaryCurrency}
                ChoosenSecondaryCurrency={getChoosenSecondaryCurrency}
            />
        </div>

    )
}

export default CurrencyConverter