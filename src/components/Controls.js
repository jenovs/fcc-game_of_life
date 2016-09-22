import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearBoard, getNextGen, stopGame, startGame, comClearBoard, comIncSpeed, comDecSpeed, comStepOne, comRandomBoard } from './../actions/index'

class Controls extends React.Component {


  render() {
    const { generations, grid, time, gridCount, comClearBoard, isRunning, getNextGen, stopGame, startGame, comIncSpeed, comDecSpeed, comStepOne, comRandomBoard } = this.props;
    const disablePlus = time === 50 ? true : false;
    const disableMinus = time === 450 ? true : false;

    function renderStartStop() {
      if (isRunning) {
        return (
            <button className='btn btn-danger' onClick={() => stopGame()}>Stop</button>
        )
      } else return (
          <button className='btn btn-primary' onClick={() => startGame()}>Start</button>
      )
    }

    return (
      <div className='controls-div'>
        <p>Generations: {generations}</p>
        <p>Population: {gridCount}</p>
        <div className='speed-div'>
          <button className='btn' disabled={disableMinus} onClick={() => comDecSpeed()}>Speed <i className='i-font'>-</i></button>
          <div className='title-speed'>{10 - time / 50}</div>
          <button className='btn' disabled={disablePlus} onClick={() => comIncSpeed()}>Speed <i className='i-font'>+</i></button>
        </div>
        <div className='buttons-div'>
          {renderStartStop()}
          <button className='btn' disabled={isRunning} onClick={() => comStepOne()}>Step &#9197;</button>
          <button className='btn btn-danger' disabled={isRunning} onClick={() => comClearBoard(grid.length, grid[0].length)}>Clear</button>
          <button className='btn' disabled={isRunning} onClick={() => comRandomBoard()}>Random</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isRunning: state.isRunning,
    generations: state.generations,
    grid: state.grid,
    gridCount: state.gridCount,
    time: state.time
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({comClearBoard, comIncSpeed, comDecSpeed, stopGame, startGame, getNextGen, comStepOne, comRandomBoard}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
