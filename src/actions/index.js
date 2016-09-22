export const getInitGrid = (rows, cells) => {
  console.log('getInitGrid');
  const grid = generateGrid(rows, cells);
  const sum = reduceNestedArray(grid);
  return {
    type: 'INIT_GRID',
    payload: { grid, sum }
  }
}

export const startGame = () => {
  return {
    type: 'START_GAME',
  }
}

export const resetCommand = () => {
  return {
    type: 'RESET_COMMAND'
  }
}

// export const kickStart = () => {
//   return {
//     type: 'KICKSTART'
//   }
// }

export const stopGame = () => {
  return {
    type: 'STOP_GAME'
  }
}

export const saveIntervalID = (id) => {
  return {
    type: 'SAVE_INTERVAL_ID',
    payload: id
  }
}

export const setIntervalNull = () => {
  return {
    type: 'SET_INTERVAL_NULL'
  }
}

export const toggleCell = (grid, row, cell) => {
  const currentCell = grid[row][cell];
  grid[row][cell] ? grid[row][cell] = 0 : grid[row][cell] = 1
  const sum = reduceNestedArray(grid);
  return {
    type: 'UPDATE_GRID_NOGEN',
    payload: { grid, sum }
  }
}

export const reduceNestedArray = (arr) => {
  const rows = arr.length;
  const cols = arr[0].length;
  let sum = 0;

  for (let i = 0; i < rows; i++) {
    sum += arr[i].reduce((a, b) => a + b, 0)
  }
  console.log(sum);
  return sum;
}

export function generateGrid(rows, cells) {
  let randArray = [];

  for (let i = 0; i < rows; i++) {
    let randRow = [];
    for (let j = 0; j < cells; j++) {
      let fill;
      const rand = Math.random();
      rand > 0.8 ? fill = 1 : fill = 0;
      randRow.push(fill);
    }
    randArray.push(randRow);
  }
  return randArray;
}

export const comClearBoard = () => {
  return {
    type: 'COMMAND_CLEAR_BOARD'
  }
}

export const getNewBoard = (arr, gridCount) => {
  if (gridCount === 0) {
    return {
      type: 'STOP_GAME'
    }
  }
  const grid = calcNextGen(arr)
  const sum = reduceNestedArray(grid)
  return {
    type: 'UPDATE_GRID',
    payload: { grid, sum }
    }
}

export const clearBoard = (rows, cells) => {
  let grid = [];

  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cells; j++) {
      row.push(0);
    }
    grid.push(row)
  }

  return {
    type: 'CLEAR_BOARD',
    payload: { grid }
  }
}

export const isRunning = () => {
  return {
    type: 'IS_RUNNING'
  }
}

export const notRunning = () => {
  return {
    type: 'NOT_RUNNING'
  }
}


/////////////////
// For testing
// Delete later
export const seedGrid = (rows, cells) => {
  const grid = getSeedGrid(rows, cells);
  return {
    type: 'UPDATE_GRID',
    payload: grid
  }
}

export const getSeedGrid = (rows, cells) => {
  let randArray = [];

  for (let i = 0; i < rows; i++) {
    let randRow = [];
    for (let j = 0; j < cells; j++) {
      let fill = 0;
      const rand = Math.random();
      randRow.push(fill);
    }
    randArray.push(randRow);
  }
  randArray[1][1] = 1;
  randArray[1][2] = 1;
  randArray[1][3] = 1;
  return randArray;
}

// End of testing
//////////////////

export function calcNextGen(grid) {
  const rows = grid.length;
  const cells = grid[0].length;
  let newGrid = [];
  // let sum = 0;
  for (let i = 0; i < rows; i++) {
    let newRow = [];
    for (let j = 0; j < cells; j++) {
      newRow.push(newCell(grid, i, j));
    }
    // sum += newRow.reduce((a, b) => a + b, 0)
    newGrid.push(newRow);
  }
  return newGrid;
}

function newCell(array, row, cell) {
  const maxRow = array.length - 1;
  const maxCell = array[0].length - 1;
  let upRow = row - 1;
  let downRow = row + 1;
  let leftCell = cell - 1;
  let rightCell = cell + 1;

  // edge cases, literally
  if (upRow < 0) upRow = maxRow;
  if (downRow > maxRow) downRow = 0;
  if (leftCell < 0) leftCell = maxCell;
  if (rightCell > maxCell) rightCell = 0;

  let tempArr = [];
  let neighbours = 0;

  neighbours += array[upRow][leftCell]
  neighbours += array[upRow][cell]
  neighbours += array[upRow][rightCell]

  neighbours += array[row][leftCell]
  neighbours += array[row][rightCell]

  neighbours += array[downRow][leftCell]
  neighbours += array[downRow][cell]
  neighbours += array[downRow][rightCell]

  const currentCell = array[row][cell];
  let newCell = 0;
  if (currentCell) {
    if (neighbours === 2 || neighbours === 3) newCell = 1;
  } else {
    if (neighbours === 3) newCell = 1;
  }

  return newCell;
}
