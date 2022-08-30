import { useState } from 'react'
import Person from './components/Person'

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '111-111-1111', id: 1 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (personInPhoneBook(personObject)) {
      alert(`${newName} is already added to phonebook`)
    } else if (!isValidPhoneNumberString(newNumber)) {
      alert(`${newNumber} is invalid phone string`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const personInPhoneBook = (personObject) => {
    const names = persons.map(person => person.name)
    return names.includes(personObject.name)
  }

  const isValidPhoneNumberString = (candidatePhoneString) => {
    const phoneNumPattern = /^[0-9-]+$/
    return phoneNumPattern.test(candidatePhoneString)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.id} person={person} />)}
    </div>
  )
}

export default App