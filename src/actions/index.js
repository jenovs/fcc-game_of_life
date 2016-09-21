export const getGrid = (rows, cells) => {
  const grid = generateGrid(rows, cells);
  return {
    type: 'UPDATE_GRID',
    payload: grid
  }
}

export const startGame = () => {
  return {
    type: 'START_GAME'
  }
}

export const stopGame = () => {
  return {
    type: 'STOP_GAME'
  }
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

export const getNextGen = (grid) => {
  const newGrid = calcNextGen(grid);
  return {
    type: 'UPDATE_GRID',
    payload: newGrid
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
  for (let i = 0; i < rows; i++) {
    let newRow = [];
    for (let j = 0; j < cells; j++) {
      newRow.push(newCell(grid, i, j));
    }
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
