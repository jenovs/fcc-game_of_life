import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import App from 'App';
import './styles/index.scss';
import { clearBoard, getInitGrid, getNewBoard, startGame, saveIntervalID, isRunning, notRunning, resetCommand, incSpeed, decSpeed } from './actions/index'

const initialState = {
  command: false,
  generations: 0,
  grid: [],
  gridCount: 0,
  intervalID: undefined,
  isRunning: false,
  stop: false,
  start: false,
  time: 250,
  clear: false,
  incSpeed: false,
  decSpeed: false,
  random: false,
  rows: 60,
  cells: 80
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
        ...state, command: false, start: false, stop: false, clear: false, incSpeed: false, decSpeed: false, stepOne: false, random: false
      }
    case 'COMMAND_INC_SPEED':
      return {
        ...state, command: true, incSpeed: true
      }
    case 'COMMAND_DEC_SPEED':
      return {
        ...state, command: true, decSpeed: true
      }
    case 'COMMAND_STEP_ONE':
      return {
        ...state, command: true, stepOne: true
      }
    case 'COMMAND_RANDOM':
      return {
        ...state, command: true, random: true
      }
    case 'SET_SPEED':
      return {
        ...state, time: action.payload.time
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

const state = store.getState();

// Get initial random grid
store.dispatch(getInitGrid(state.rows, state.cells));

store.subscribe(() => {
  const state = store.getState();
  // commands
  if (state.command) {
    // start
    if (state.start) {
      store.dispatch(resetCommand());
      store.dispatch(isRunning());
      let intervalID = setInterval(() => {
        const state = store.getState();
        store.dispatch(getNewBoard(state.grid, state.gridCount));
      }, state.time)
      store.dispatch(saveIntervalID(intervalID));
    }
    // stop
    else if (state.stop) {
      store.dispatch(resetCommand());
      store.dispatch(notRunning());
      clearInterval(state.intervalID);
    }
    // clear
    else if (state.clear) {
      store.dispatch(resetCommand());
      store.dispatch(clearBoard(state.rows, state.cells));
    }
    // increase speed
    else if (state.incSpeed) {
      const wasRunning = state.isRunning;
      store.dispatch(resetCommand());
      store.dispatch(notRunning());
      clearInterval(state.intervalID);
      store.dispatch(incSpeed(state.time));
      if (wasRunning) {
        store.dispatch(startGame());
      }
    }
    // decrease speed
    else if (state.decSpeed) {
      const wasRunning = state.isRunning;
      store.dispatch(resetCommand());
      store.dispatch(notRunning());
      clearInterval(state.intervalID);
      store.dispatch(decSpeed(state.time));
      if (wasRunning) {
        store.dispatch(startGame());
      }
    }
    // step
    else if (state.stepOne) {
      store.dispatch(resetCommand());
      store.dispatch(getNewBoard(state.grid, state.gridCount));
    }
    // random board
    else if (state.random) {
      store.dispatch(resetCommand());
      store.dispatch(getInitGrid(state.rows, state.cells));
    }
  }
})

// start the game
store.dispatch(startGame());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
