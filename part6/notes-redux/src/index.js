import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { Provider } from 'react-redux'
import noteReducer, { setNotes } from './reducers/noteReducer';
import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './reducers/filterReducer';
import noteService from './services/notes'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

noteService.getAll().then(notes => store.dispatch(setNotes(notes)))

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => root.render(
  <Provider store={store}>
    <App />
  </Provider>
  // <div />
)

// store.subscribe(() => console.log(store.getState()))
// store.dispatch(filterChange('IMPORTANT'))
// store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

renderApp()
store.subscribe(renderApp)