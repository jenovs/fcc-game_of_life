import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearBoard, getNextGen, stopGame, startGame, comClearBoard } from './../actions/index'

class Controls extends React.Component {


  render() {
    const { generations, grid, gridCount, comClearBoard, isRunning, getNextGen, stopGame, startGame } = this.props;

    function renderStartStop() {
      if (isRunning) {
        return (
          <div>
            <button onClick={() => stopGame()}>Stop</button>
          </div>
        )
      } else return (
        <div>
          <button onClick={() => startGame()}>Start</button>
          <button onClick={() => comClearBoard(grid.length, grid[0].length)}>Clear</button>
        </div>

      )
    //   else if (generations) {
    //     return (
    //       <div>
    //         <button onClick={() => startGame()}>Start</button>
    //         {/* <button onClick={() => getNextGen(grid, gridCount)}>Step</button> */}
    //         <button onClick={() => clearBoard(grid.length, grid[0].length)}>Clear</button>
    //       </div>
    //     )
    //   } else {
    //     return (
    //       <div>
    //         <button onClick={() => startGame()}>Start</button>
    //         {/* <button onClick={() => getNextGen(grid, gridCount)}>Step</button> */}
    //         <button onClick={() => clearBoard(grid.length, grid[0].length)}>Clear</button>
    //       </div>
    //     )
    //   }
    }

    return (
      <div>
        <p>Generations: {this.props.generations}</p>
        {renderStartStop()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isRunning: state.isRunning,
    generations: state.generations,
    grid: state.grid,
    gridCount: state.gridCount
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({comClearBoard, stopGame, startGame, getNextGen}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
