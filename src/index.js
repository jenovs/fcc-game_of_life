import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
// import thunk from 'redux-thunk'

import App from 'App';
import './styles/index.scss';
import { getGrid, getNextGen, seedGrid } from './actions/index'

const initialState = {
  grid: [],
  rows: 50,
  cells: 70
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_GRID':
      return {
        ...state, grid: action.payload
      }
    default:
      return state
  }
}

const store = createStore(reducers, (window.devToolsExtension ? window.devToolsExtension() : noop => noop));

// Get initial random grid
const state = store.getState();
store.dispatch(getGrid(state.rows, state.cells));
// store.dispatch(seedGrid(state.rows, state.cells))


setInterval(() => {
  const state = store.getState();
  store.dispatch(getNextGen(state.grid));
}, 200)

//-------To be deleted------------
// setInterval(() => {
//   const state = store.getState();
//   store.dispatch(getNextGen(state.grid))
// }, 1000)
//---------------------

// For testing
// setTimeout(() => {
//   const state = store.getState();
//   store.dispatch(getNextGen(state.grid))
// }, 1000)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
