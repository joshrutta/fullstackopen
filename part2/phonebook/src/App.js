import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '111-111-1111', id: 1 }
  ])

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