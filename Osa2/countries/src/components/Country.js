const Country = ({ country }) => {
    return (
        <>
            <div className='header'>
                <h1>{country.name.common}</h1>
                <p>Pääkaupunki: {country.capital}</p>
                <p>Aluekoodi: {country.area}</p>
            </div>
            <div className="languages">
                <h1>Kielet: </h1>
                <ul>
                    {Object.values(country.languages).map(lang => (<li key={lang}>{lang}</li>))}
                </ul>
            </div>
            <div className="flag">
                <h1>Lippu: </h1>
                <img src={country.flags.png} alt={country.flags.alt} />
            </div>
        </>
    )
}

export default Country