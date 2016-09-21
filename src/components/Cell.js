import React from 'react';
import { connect } from 'react-redux';

class Cell extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.arr[this.props.row][this.props.cell] !== this.props.arr[this.props.row][this.props.cell]
  }

  render() {
    const { arr, row, cell } = this.props;
    let oldFill;
    const fill = arr[row][cell];

    let style = fill === 1 ? 'cell-div full' : 'cell-div';

    return (
      <div className={style}>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    arr: state.grid,
  }
}
export default connect(mapStateToProps)(Cell);
