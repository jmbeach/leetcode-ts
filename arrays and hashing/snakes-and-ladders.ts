function getCellAtPosition(n: number, position: number): [number, number] {
  if (position >= n * n) return [0, 0];
  const rowsFromBottom = Math.ceil(position / n);
  const row = n - rowsFromBottom;
  const col =
    rowsFromBottom % 2 === 0
      ? rowsFromBottom * n - position
      : (position - 1) % n;
  return [row, col];
}
function snakesAndLadders(board: number[][]): number {
  const seen: Set<number> = new Set();
  const n = board.length;
  const moves = [[1, 0]];
  seen.add(1);
  while (moves.length) {
    const [movePosition, moveDepth] = moves.shift()!;
    for (let i = 1; i <= 6; i++) {
      let next = movePosition + i;
      const [row, col] = getCellAtPosition(n, next);
      console.log(movePosition, moveDepth, next, row, col);
      const val = board[row][col];
      if (val !== -1) {
        next = val;
      }
      if (next >= n * n) {
        return moveDepth + 1;
      }
      if (seen.has(next)) continue;
      seen.add(next);
      moves.push([next, moveDepth + 1]);
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
