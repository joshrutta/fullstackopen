import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filter: ''
}

const filterReducer = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
        const filter = action.payload
        return { filter }
    }
  }
});

export const { setFilter } = filterReducer.actions

export default filterReducer.reducer