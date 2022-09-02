import React from 'react'


const Filter = ({ filterName, setFilterName }) => {
    const handlefilterName = (event) => setFilterName(event.target.value)

    return <div> filter by name: <input value={filterName} onChange={handlefilterName} /> </div >
}

export default Filter