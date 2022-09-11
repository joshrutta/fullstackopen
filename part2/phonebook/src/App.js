import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/person'

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [notificationInfo, setNotificationInfo] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(allPersonsResponse => {
        setPersons(allPersonsResponse)
      })
  }, [])

  const updateHandler = () => () => {

  }

  const deleteHandler = (person) => () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(
          () => {
            setPersons(persons.filter(p => p.id !== person.id))
          }
        )
    }
  }


  const [filterName, setFilterName] = useState('')
  // console.log("setPersons: ", setPersons)
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationInfo={notificationInfo} />
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <h2>Add a New Person to Phonebook</h2>
      <PersonForm persons={persons} setPersons={setPersons} setNotificationInfo={setNotificationInfo} updateHandler={updateHandler} />
      <h2>Numbers</h2>
      <Persons filterName={filterName} persons={persons} deleteHandler={deleteHandler} />
    </div>
  )
}

export default App