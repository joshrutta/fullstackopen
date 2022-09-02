import { React, useState } from 'react'

const isValidPhoneNumberString = (candidatePhoneString) => {
    const phoneNumPattern = /^[0-9-]+$/
    return phoneNumPattern.test(candidatePhoneString)
}

const PersonForm = ({ persons, setPersons }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')


    const handleNewName = (event) => setNewName(event.target.value)
    const handleNewNumber = (event) => setNewNumber(event.target.value)

    const personInPhoneBook = (personObject) => {
        const names = persons.map(person => person.name)
        return names.includes(personObject.name)
    }

    const addPerson = (event) => {
        console.log('add person called')
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