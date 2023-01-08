import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'


const Filter = (props) => {

  const handleFilterChange = (event) => {
    event.preventDefault()
    props.setFilter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
      <div style={style}>filter <input value={props.filter} onChange={handleFilterChange}/></div>
  )
}

const mapStateToProps = (state) => {
  return { filter: state.filter.filter }
}

const mapDispatchToProps = {
  setFilter
}

export default connect(mapStateToProps, mapDispatchToProps )(Filter)
