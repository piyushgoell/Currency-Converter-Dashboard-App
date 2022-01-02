import { useState } from "react"
import ExchangeRate from "./ExchangeRate"
import axios from 'axios'

const CurrencyConverter = () => {
    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']
    const [getChoosenPrimaryCurrency, setChoosenPrimaryCurrency] = useState('BTC')
    const [getChoosenSecondaryCurrency, setChoosenSecondaryCurrency] = useState('BTC')
    
    const [getExchangedData, setExchangedData] = useState({
        primaryCurrency : 'BTC',
        secondaryCurrency : 'BTC',
        excahngeRate: 0
    })

    const [getAmount, setAmount] = useState(1)
    const [getResult, setResult] = useState(0)

    const convert = () => {

        const options = {
            method: 'GET',
            url: 'http://localhost:8000/convert',
            params: { 
                from_currency: getChoosenPrimaryCurrency,
                to_currency: getChoosenSecondaryCurrency, 
                 }
        };

        axios.request(options).then((response) => {
//            console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            //setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            setResult(response.data * getAmount)
            setExchangedData({
                primaryCurrency : getChoosenPrimaryCurrency,
                secondaryCurrency : getChoosenSecondaryCurrency,
                exchangeRate : response.data

            })
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
                ExchangedData={getExchangedData}
     //           ChoosenPrimaryCurrency={getChoosenPrimaryCurrency}
     //           ChoosenSecondaryCurrency={getChoosenSecondaryCurrency}
            />
        </div>

    )
}

export default CurrencyConverter