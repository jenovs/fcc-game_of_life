import React from 'react';
import { connect } from 'react-redux';

import Cell from 'Cell';

class Row extends React.Component {

  getCells() {
    let row = [];
    for (let i = 0; i < this.props.cells; i++) {
      row.push(<Cell key={i} row={this.props.row} cell={i}/>)
    }
    return row
  }
  render() {
    return (
      <div className='row-div'>
        {this.getCells()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cells: state.cells
  }
}

export default connect(mapStateToProps)(Row);
