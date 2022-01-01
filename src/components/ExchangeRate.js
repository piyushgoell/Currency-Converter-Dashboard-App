const ExchangeRate = ({ExchangeRate, ChoosenPrimaryCurrency, ChoosenSecondaryCurrency}) =>{
    return (
        <div className="exchange-rate">
            <h3>Exchange Rate</h3>
            <h1>{ExchangeRate}</h1>
            <p>{ChoosenPrimaryCurrency} to {ChoosenSecondaryCurrency}</p>
        </div>

    )
}

export default ExchangeRate