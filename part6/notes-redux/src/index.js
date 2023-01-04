import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { Provider } from 'react-redux'
import noteReducer from './reducers/noteReducer';
import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './reducers/filterReducer';

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

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