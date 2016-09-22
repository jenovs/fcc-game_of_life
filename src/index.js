import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
// import thunk from 'redux-thunk'

import App from 'App';
import './styles/index.scss';
import { clearBoard, getInitGrid, getNewBoard, seedGrid, startGame, saveIntervalID, setIntervalNull, isRunning, notRunning, step, resetCommand } from './actions/index'

const initialState = {
  command: false,
  generations: 0,
  grid: [],
  gridCount: 1,
  intervalID: undefined,
  isRunning: false,
  stop: false,
  start: false,
  clear: false,
  rows: 10,
  cells: 10
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_GRID':
      return {
        ...state, grid: action.payload.grid, generations: state.generations + 1, gridCount: action.payload.sum
      }
    case 'UPDATE_GRID_NOGEN':
      return {
        ...state, grid: action.payload.grid, gridCount: action.payload.sum
      }
    case 'CLEAR_BOARD':
      return {
        ...state, grid: action.payload.grid, generations: 0, gridCount: 0
        // , grid: action.payload, generations: 0, intervalID: undefined
      }
    case 'COMMAND_CLEAR_BOARD':
      return {
        ...state, command: true, clear: true, start: false, stop: false
      }
    case 'START_GAME':
      return {
        ...state, command: true, start: true, stop: false, clear: false
      }
    case 'STOP_GAME':
      return {
        ...state, command: true, stop: true, start: false, clear: false
      }
    case 'RESET_COMMAND':
      return {
        ...state, command: false, start: false, stop: false
      }
    case 'SAVE_INTERVAL_ID':
      return {
        ...state, intervalID: action.payload
      }
    case 'SET_INTERVAL_NULL':
      return {
        ...state, intervalID: undefined
      }
    case 'INIT_GRID':
      return {
        ...state, grid: action.payload.grid, generations: 1, gridCount: action.payload.sum
      }
    // case 'KICKSTART':
    //   return {
    //     ...state, intervalID: 1, stop: false, start: true
    //   }
    case 'IS_RUNNING':
      return {
        ...state, stop: false, start: false, isRunning: true
      }
    case 'NOT_RUNNING':
      return {
        ...state, stop: false, start: false, isRunning: false, intervalID: undefined
      }
    default:
      return state
  }
}

const store = createStore(reducers, (window.devToolsExtension ? window.devToolsExtension() : noop => noop));

// Get initial random grid
const state = store.getState();
store.dispatch(getInitGrid(state.rows, state.cells));

store.subscribe(() => {
  const state = store.getState();

  if (state.command) {

    if (state.start) {
      store.dispatch(resetCommand());
      store.dispatch(isRunning());
      let intervalID = setInterval(() => {
        const state = store.getState();
        store.dispatch(getNewBoard(state.grid, state.gridCount));
      }, 500)
      store.dispatch(saveIntervalID(intervalID));
    }

    if (state.stop) {
      store.dispatch(resetCommand());
      store.dispatch(notRunning());
      clearInterval(state.intervalID);
    }

    if (state.clear) {
      store.dispatch(resetCommand());
      store.dispatch(clearBoard(state.rows, state.cells));
    }
  }

  // if (!state.generations && state.start && !state.isRunning) {
  //   store.dispatch(getGrid(state.rows, state.cells));
  // }
  // if (state.gridCount === 0 && state.isRunning && state.generations !== 0) {
  //   console.log('first if');
  //   // ==========Temp brute force===========
  //   for (var i = 1; i < 99999; i++) {
  //     window.clearInterval(i);
  //   }
  //   //======================================
  //
  //   store.dispatch(notRunning())
  // }
  //
  // else if (state.start && !state.isRunning) {
  //   console.log('second if');
  //   store.dispatch(isRunning());
  //   let intervalID = setInterval(() => {
  //     const state = store.getState();
  //     store.dispatch(getNewBoard(state.grid));
  //   }, 200)
  //   store.dispatch(saveIntervalID(intervalID));
  //   // store.dispatch(getNewBoard(state.grid));
  // }
  //
  // else if (state.stop && state.isRunning) {
  //   console.log('third if');
  //   // clearInterval(state.intervalID);
  //
  //   // ==========Temp brute force===========
  //   for (var i = 1; i < 99999; i++) {
  //     window.clearInterval(i);
  //   }
  //   //======================================
  //
  //
  //   store.dispatch(notRunning())
  // }
})

// let intervalID = setInterval(() => {
//   const state = store.getState();
//   store.dispatch(getNewBoard(state.grid));
// }, 200)

//-------To be deleted------------
// setInterval(() => {
//   const state = store.getState();
//   store.dispatch(getNewBoard(state.grid))
// }, 1000)
//---------------------

// For testing
// setTimeout(() => {
//   const state = store.getState();
//   store.dispatch(getNewBoard(state.grid))
// }, 1000)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
