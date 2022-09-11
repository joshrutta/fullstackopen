import { useState } from 'react'
import personService from '../services/person'
import NotificationType from '../NotificationType'

const isValidPhoneNumberString = (candidatePhoneString) => {
    const phoneNumPattern = /^[0-9-]+$/
    return phoneNumPattern.test(candidatePhoneString)
}

const PersonForm = ({ persons, setPersons, setNotificationInfo }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')


    const handleNewName = (event) => setNewName(event.target.value)
    const handleNewNumber = (event) => setNewNumber(event.target.value)

    const personInPhoneBook = (personObject) => {
        const names = persons.map(person => person.name)
        return names.includes(personObject.name)
    }

    const dupPersonId = (personObject) => {
        const names = persons.map(person => person.name)
        const idx = names.indexOf(personObject.name)
        return persons[idx].id;
    }

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
        }
        if (personInPhoneBook(personObject)) {
            if (
                window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)
            ) {
                const id = dupPersonId(personObject)
                personService
                    .update(id, personObject)
                    .then(returnedPerson => {
                        setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
                    })
                    .catch(error => {
                        const message = `Information of ${personObject.name}
                                         has already been removed from the server`;
                        setNotificationInfo({
                            message: message,
                            notificationType: NotificationType.Error
                        })
                        setTimeout(() => {
                            setNotificationInfo(null)
                        }, 5000)
                    })
            }
        } else if (!isValidPhoneNumberString(newNumber)) {
            alert(`${newNumber} is invalid phone string`)
        } else {
            personService
                .create(personObject)
                .then(
                    returnedPerson => {
                        setPersons(persons.concat(returnedPerson))
                        setNewName('')
                        setNewNumber('')
                        setNotificationInfo({
                            message: `Added ${returnedPerson.name}`,
                            notificationType: NotificationType.Success
                        })
                        setTimeout(() => {
                            setNotificationInfo(null)
                        }, 5000)
                    }
                )
        }
    }

    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNewName} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNewNumber} />
            </div>
            <button type="submit">add</button>
        </form>
    )
}

export default PersonForm