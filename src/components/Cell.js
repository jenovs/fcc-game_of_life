import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleCell } from './../actions/index';

class Cell extends React.Component {

  constructor() {
    super();
    this.state = {
      age: 1
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.fill) {
      this.setState({
        age: this.state.age + 1
      })
    } else {
      this.setState({
        age: 0
      })
    }
  }

  // shouldComponentUpdate(newProps) {
  //   return newProps.fill !== this.props.fill;
  // }

  handleClick() {
    const { arr, row, cell} = this.props;
    this.props.toggleCell(arr, row, cell);
  }

  render() {
    const { fill } = this.props;
    const { age } = this.state

    // let style = fill ? 'cell-div full' : 'cell-div';
    let style = 'cell-div'

    if (fill) {
      switch (age) {
        case 0:
        case 1:
          style += ' age1'
          break;
        case 2:
          style += ' age2'
          break;
        case 3:
          style += ' age3'
          break;
        default:
          style += ' age4'
      }
    }

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
