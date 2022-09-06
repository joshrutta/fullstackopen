import { useState, useEffect } from 'react';
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {

  const [searchQuery, setSearchQuery] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(
        response => {
          setCountries(response.data)
        }
      )
  }, [])

  const handleSearchQuery = (event) => setSearchQuery(event.target.value);

  return (
    <div>
      <div>
        find countries: <input onChange={handleSearchQuery} />
      </div>
      <Countries searchQuery={searchQuery} countries={countries} />
    </div>
  );
}

export default App;
