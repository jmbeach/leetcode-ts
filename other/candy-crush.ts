function flagColumns(startRow: number, col: number, board: number[][]) {
  if (startRow + 2 >= board.length) {
      return false;
  }
  const val = Math.abs(board[startRow][col]);
  if (Math.abs(board[startRow + 1][col]) === val
    && Math.abs(board[startRow + 2][col]) === val) {
      board[startRow][col] = -val;
      board[startRow + 1][col] = -val;
      board[startRow + 2][col] = -val;
      return true;
  }
  return false;
}

function flagRows(row: number, startCol: number, board: number[][]) {
  if (startCol + 2 >= board[row].length) {
      return false;
  }
  const val = Math.abs(board[row][startCol]);
  if (Math.abs(board[row][startCol + 1]) === val
    && Math.abs(board[row][startCol + 2]) === val) {
      board[row][startCol] = -val;
      board[row][startCol + 1] = -val;
      board[row][startCol + 2] = -val;
      return true;
  }
  return false;
}

// returns true if any candies crushed
function crush(board: number[][]): boolean {
  let didCrush = false;
  for (let i = 0; i < board.length; i++) {
      const row = board[i];
      for (let j = 0; j < row.length; j++) {
          if (board[i][j] === 0) continue;
          didCrush = flagColumns(i, j, board) || didCrush;
          didCrush = flagRows(i, j, board) || didCrush;
      }
  }

  return didCrush;
}

function applyGravity(board: number[][]) {
  for (let col = 0; col < board[0].length; col++) {
      let writeRow = board.length - 1;
      for (let row = board.length - 1; row >= 0; row--) {
          if (board[row][col] > 0) {
              board[writeRow][col] = board[row][col];
              writeRow--;
          }
      }
      while (writeRow >= 0) {
          board[writeRow][col] = 0;
          writeRow--;
      }
  }
}

function candyCrush(board: number[][]): number[][] {
  while (crush(board)) {
      console.log(...board)
      applyGravity(board);
  }
  return board;
};

const tests = [
  {
    data: [[110,5,112,113,114],[210,211,5,213,214],[310,311,3,313,314],[410,411,412,5,414],[5,1,512,3,3],[610,4,1,613,614],[710,1,2,713,714],[810,1,2,1,1],[1,1,2,2,2],[4,1,4,4,1014]],
    expect: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[110,0,0,0,114],[210,0,0,0,214],[310,0,0,113,314],[410,0,0,213,414],[610,211,112,313,614],[710,311,412,613,714],[810,411,512,713,1014]]
  }
]
for (const test of tests) {
  const result = candyCrush(test.data);
  for (let i = 0; i < test.data.length; i++) {
    for (let j = 0; j < test.data[i].length; j++) {
      if (result[i][j] !== test.expect[i][j]) {
        throw new Error(`${JSON.stringify(test)}`)
      }
    }
  }
}
console.log('success')