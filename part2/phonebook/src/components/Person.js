import React from 'react'

const Person = ({ person, deleteHandler }) => {

    console.log('person.id: ', person.id);

    return (
        <p>
            {person.name} {person.number} <button onClick={deleteHandler(person)}>delete</button>
        </p>
    )
}

export default Person
