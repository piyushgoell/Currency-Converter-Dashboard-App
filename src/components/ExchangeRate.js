const ExchangeRate = ({ExchangedData}) =>{
    return (
        <div className="exchange-rate">
            <h3>Exchange Rate</h3>
            <h1>{ExchangedData.exchangeRate}</h1>
            <p>{ExchangedData.primaryCurrency} to {ExchangedData.secondaryCurrency}</p>
        </div>

    )
}

export default ExchangeRate