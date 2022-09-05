import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = (props) => {
  const [persons, setPersons] = useState([])

  const db_address = 'http://localhost:3001/persons'
  useEffect(() => {
    axios
      .get(db_address)
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const [filterName, setFilterName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <h2>Add a New Person to Phonebook</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons filterName={filterName} persons={persons} />
    </div>
  )
}

export default App