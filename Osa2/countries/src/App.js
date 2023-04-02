//Versio 2.18
import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Countries from './components/Countries'

const App = () => {
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')

    //useEffect-hookin avulla haetaan dataa
    useEffect(() => {
        countryService
          .getAll()
            .then(initialCountries => {
            setCountries(initialCountries)
          })
      }, [])
    console.log('render', countries.length, 'countries')

    const handleFilterChange = (event) => {
      setSearch(event.target.value)
  }

    return (
        <div className="body">
            <p>find countries</p><input value={search} onChange={handleFilterChange}/>
            <Countries countries={countries} search={search} /> 
        </div>
    )

}

export default App
