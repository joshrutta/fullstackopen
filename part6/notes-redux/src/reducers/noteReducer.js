import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'

// const initialState = [
//     {
//         content: 'reducer defines how redux store works',
//         important: true,
//         id: 1,
//     },
//     {
//         content: 'state of store can contain any data',
//         important: false,
//         id: 2,
//     },
// ]

const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        appendNote(state, action) {
            state.push(action.payload)
        },
        toggleImportanceOf(state, action) {
            const id = action.payload
            const noteToChange = state.find(n => n.id === id)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            return state.map(note => note.id === id ? changedNote : note)
        },
        setNotes(state,action) {
            return action.payload
        }
    }
})

// const noteReducer = (state = [], action) => {
//     switch(action.type) {
//         case 'NEW_NOTE':
//             return [...state, action.data]
//         case 'TOGGLE_IMPORTANCE': {
//             const id = action.data.id 
//             const noteToChange = state.find(n => n.id === id)
//             const changedNote = {
//                 ...noteToChange,
//                 important: !noteToChange.important
//             }
//             return state.map(note => note.id === id ? changedNote : note)
//         }
//         default: 
//             return state
//     }
// }

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

export const initializeNotes = () => {
    return async dispatch => {
        const notes = await noteService.getAll()
        dispatch(setNotes(notes))
    }
}

export const createNote = content => {
    return async dispatch => {
        const newNote = await noteService.createNew(content)
        dispatch(appendNote(newNote))
    }
}

export default noteSlice.reducer