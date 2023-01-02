import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'


const Filter = () => {
  const filter = useSelector(state => state.filter.filter)
  const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    event.preventDefault()
    dispatch(setFilter(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
      <div style={style}>filter <input value={filter} onChange={handleFilterChange}/></div>
  )
}

export default Filter
