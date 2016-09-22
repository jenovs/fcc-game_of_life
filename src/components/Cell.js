import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleCell } from './../actions/index';

class Cell extends React.Component {

  handleClick() {
    const { arr, row, cell} = this.props;
    this.props.toggleCell(arr, row, cell);
  }

  render() {
    const { fill } = this.props;
    let style = fill ? 'cell-div full' : 'cell-div';

    return (
      <div onClick={this.handleClick.bind(this)} className={style}>
      </div>
    );
  }

}

function mapStateToProps(state, ownProps) {
  return {
    arr: state.grid,
    fill: state.grid[ownProps.row][ownProps.cell]
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({toggleCell}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
