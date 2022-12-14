function getSum(
  grid: number[][],
  startRow: number,
  startCol: number,
  size: number
) {
  let sum = 0;
  let [row, col] = [startRow, startCol];
  if (size === 0) return grid[startRow][startCol];
  while (row > startRow - size && col < startCol + size) {
    sum += grid[row][col];
    row--;
    col++;
  }
  while (row < startRow && col < startCol + size * 2) {
    sum += grid[row][col];
    row++;
    col++;
  }
  while (row < startRow + size && col > startCol + size) {
    sum += grid[row][col];
    row++;
    col--;
  }
  while (row > startRow && col > startCol) {
    sum += grid[row][col];
    row--;
    col--;
  }
  return sum;
}
function getBiggestThree(grid: number[][]): number[] {
  const sums: Set<number> = new Set();
  const [m, n] = [grid.length, grid[0].length];
  let maxLength = Math.min(m, n);
  if (maxLength % 2 == 0) maxLength--;
  const maxSize = Math.floor(maxLength / 2);
  for (let rhombusSize = 0; rhombusSize <= maxSize; rhombusSize++) {
    for (let row = rhombusSize; row < m - rhombusSize; row++) {
      for (let col = 0; col + 2 * rhombusSize < n; col++) {
        sums.add(getSum(grid, row, col, rhombusSize));
      }
    }
  }
  const array = [...sums];
  array.sort((a, b) => b - a);
  return array.slice(0, 3);
}

const tests = [
  {
    data: [
      [3, 4, 5, 1, 3],
      [3, 3, 4, 2, 3],
      [20, 30, 200, 40, 10],
      [1, 5, 5, 4, 1],
      [4, 3, 2, 2, 5],
    ],
    expect: [228, 216, 211],
  },
  {
    data: [
      [20, 17, 9, 13, 5, 2, 9, 1, 5],
      [14, 9, 9, 9, 16, 18, 3, 4, 12],
      [18, 15, 10, 20, 19, 20, 15, 12, 11],
      [19, 16, 19, 18, 8, 13, 15, 14, 11],
      [4, 19, 5, 2, 19, 17, 7, 2, 2],
    ],
    expect: [107, 103, 102],
  },
  {
    data: [[7, 7, 7]],
    expect: [7],
  },
];

for (const test of tests) {
  const result = getBiggestThree(test.data);
  if (result.join(',') !== test.expect.join(',')) {
    throw new Error(`${JSON.stringify(test)} - ${result}`);
  }
}
console.log('success');
