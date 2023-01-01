import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    content: null
}

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        showNotification(state, action) {
            const content = action.payload
            state = { content } 
            setTimeout(state = { content: null }, 5 * 1000)
        }
    }
})

// export const { showNotification } = notificationSlice.actions
// export default notificationSlice.reducer