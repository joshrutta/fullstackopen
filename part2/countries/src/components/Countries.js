import CountryDetail from './CountryDetail'
import Country from './Country'
import { useState } from 'react'

const Countries = ({ searchQuery, countries }) => {

    const caseInsensitiveIncludes = (string, substring) =>
        string.toUpperCase().includes(substring.toUpperCase())

    const [shownCountry, setShownCountry] = useState([])
    const [show, setShow] = useState(false)

    const clickHandler = (country, show) => () => {
        setShow(!show)
        show ? setShownCountry([]) : setShownCountry([country])
    }

    if (searchQuery.length === 0) {
        return
    }
    const filteredCountries = countries.filter(country => caseInsensitiveIncludes(country.name.common, searchQuery))
    if (show) {
        return <CountryDetail key={shownCountry.cca3} country={shownCountry[0]} show={show} clickHandler={clickHandler} />
    } else if (filteredCountries.length === 1) {
        return <CountryDetail key={filteredCountries[0].cca3} country={filteredCountries[0]} show={show} clickHandler={clickHandler} />
    } else if (filteredCountries.length <= 10) {
        return (
            filteredCountries.map(country => {
                return <Country key={country.cca3} country={country} show={show} clickHandler={clickHandler} />
            })
        )
    } else {
        return <p> Too many matches, specify another filter</p>
    }
}

export default Countries