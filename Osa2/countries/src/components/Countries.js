import Country from './Country'

const Countries = ({ countries, search }) => {
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search))
    const result = filteredCountries.map(c => (<Country key={c.name.common} country={c} />))

    return (
        <>
            {filteredCountries.length > 10 && <p>Liian monta vaihtoehtoa! Rajaa tarkemmin</p>}
            {filteredCountries.length <= 10 && filteredCountries.length > 1 && 
            filteredCountries.map(country => (<div key={country.name.common}> {country.name.common} </div>))}
            {filteredCountries.length === 1 && (<div>{result}</div>) }
        </>)
}

export default Countries