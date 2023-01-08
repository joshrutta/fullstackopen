import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    content: null
}

let timeoutId = null

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotification(state, action) {
            const content = action.payload
            return { content } 
        }
    }
})

export const { setNotification } = notificationSlice.actions

export const notify = (content, seconds) => {
    return async dispatch => {
        dispatch(setNotification(content))
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => dispatch(setNotification('')), seconds * 1000)
    }
}

export default notificationSlice.reducer