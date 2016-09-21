import React from 'react';
import { connect } from 'react-redux';

import Row from 'Row';

class Grid extends React.Component {

  getRows() {
    let grid = [];
    for (let i = 0; i < this.props.rows; i++) {
      grid.push(<Row key={i} row={i}/>);
    }
    return grid;
  }

  render() {
    return (
      <div className='grid-div'>
        {this.getRows()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    rows: state.rows
  }
}

export default connect(mapStateToProps)(Grid);
