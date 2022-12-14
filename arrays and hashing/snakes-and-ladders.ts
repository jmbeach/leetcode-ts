function numberToRowCol(number: number, boardSize: number): [number, number] {
  const row = boardSize - Math.ceil(number / boardSize);
  if (number >= boardSize * boardSize) return [0, 0];
  if (row % 2 === 0) {
    const col =
      (Math.ceil(number / boardSize) * boardSize - number) % boardSize;
    return [row, col];
  } else {
    return [row, (number - 1) % boardSize];
  }
}
function snakesAndLadders(board: number[][]): number {
  const boardSize = Math.pow(board.length, 2);
  const visited: Set<number> = new Set();
  const q: [number, number][] = [];
  q.push([1, 0]);
  while (q.length) {
    const [space, moves] = q.splice(0, 1)[0];
    for (let roll = 1; roll < 7; roll++) {
      let next = space + roll;
      const [row, col] = numberToRowCol(next, board.length);
      if (board[row][col] !== -1) {
        next = board[row][col];
      }
      if (next >= boardSize) {
        return moves + 1;
      }
      if (!visited.has(next)) {
        visited.add(next);
        q.push([next, moves + 1]);
      }
    }
  }
  return -1;
}

const tests = [
  // {
  //   data: [
  //     [-1, -1, -1, -1, -1, -1],
  //     [-1, -1, -1, -1, -1, -1],
  //     [-1, -1, -1, -1, -1, -1],
  //     [-1, 35, -1, -1, 13, -1],
  //     [-1, -1, -1, -1, -1, -1],
  //     [-1, 15, -1, -1, -1, -1],
  //   ],
  //   expect: 4,
  // },
  {
    data: [
      [1, 1, -1],
      [1, 1, 1],
      [-1, 1, 1],
    ],
    expect: 1,
  },
];

for (const test of tests) {
  const result = snakesAndLadders(test.data);
  if (result !== test.expect) {
    throw new Error(`${JSON.stringify(test)} - ${result}`);
  }
}

console.log('success');
