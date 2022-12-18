function getBiggestThree(grid: number[][]): number[] {
  const [m, n] = [grid.length, grid[0].length];
  let maxSize = Math.min(m, n);
  if (maxSize % 2 === 0) maxSize--;
  const maxArea = (maxSize - 1) / 2;
  const sums = new Set();
  for (let area = 0; area <= maxArea; area++) {
    for (let row = area; row < m - area; row++) {
      for (let col = 0; col < n - area * 2; col++) {
        console.log(area, row, col);
        sums.add(getSum(grid, row, col, area));
      }
    }
  }
  const arr = [...sums];
  arr.sort((a, b) => b - a);
  return arr.slice(0, 3);
}

function getSum(
  grid: number[][],
  startRow: number,
  startCol: number,
  area: number
): number {
  let [row, col] = [startRow, startCol];
  let sum = 0;
  if (area === 0) return grid[row][col];
  while (row > startRow - area) {
    sum += grid[row][col];
    col++;
    row--;
  }
  while (row < startRow) {
    sum += grid[row][col];
    col++;
    row++;
  }
  while (row < startRow + area) {
    sum += grid[row][col];
    col--;
    row++;
  }
  while (row > startRow) {
    sum += grid[row][col];
    col--;
    row--;
  }
  return sum;
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
