function snakesAndLadders(board: number[][]): number {
  const n = board.length;
  const moves = [[1, 0]];
  const seen: Set<number> = new Set();
  seen.add(1);
  while (moves.length) {
    const [position, depth] = moves.shift()!;
    for (let roll = 1; roll <= 6; roll++) {
      let next = position + roll;
      const [row, col] = cellAtPosition(n, next);
      const val = board[row][col];
      if (val !== -1) {
        next = val;
      }
      if (next >= n * n) {
        return depth + 1;
      }
      if (!seen.has(next)) {
        seen.add(next);
        moves.push([next, depth + 1]);
      }
    }
  }
  return -1;
}

function cellAtPosition(n: number, position: number): [number, number] {
  if (position >= n * n) return [0, 0];
  const rowsFromBottom = Math.ceil(position / n);
  const row = n - rowsFromBottom;
  const col =
    rowsFromBottom % 2 === 0
      ? rowsFromBottom * n - position
      : (position - 1) % n;
  return [row, col];
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
