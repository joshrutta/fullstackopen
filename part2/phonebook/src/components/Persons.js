import React from 'react'
import Person from './Person'

const Persons = ({ filterName, persons }) => {

    const caseInsensitiveStartsWith = (string, substring) =>
        string.toUpperCase().startsWith(substring.toUpperCase())

    return persons.filter(person => caseInsensitiveStartsWith(person.name, filterName))
        .map(person => < Person key={person.id} person={person} />)

}

export default Persons