import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { stopGame } from './../actions/index'

class Controls extends React.Component {
  render() {
    return (
      <div>
        <p>Generations: {this.props.generations}</p>
        <button>Button 2</button>
        <button onClick={() => this.props.stopGame()}>Stop</button>
        <button>Button 3</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isRunning: state.isRunning,
    generations: state.generations
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({stopGame}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
