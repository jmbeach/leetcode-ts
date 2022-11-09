function getBiggestThree(grid: number[][]): number[] {
  let maxRhombus = Math.min(grid.length, grid[0].length);
  if (maxRhombus % 2 === 0) maxRhombus--;
  const rhombusSums: Set<number> = new Set();
  for (let rhombusSize = 1; rhombusSize <= maxRhombus; rhombusSize += 2) {
    for (let row = 0; row <= grid.length - rhombusSize; row++) {
      const endRow = row + rhombusSize - 1;
      for (
        let col = Math.floor(rhombusSize / 2);
        col < grid[0].length - Math.floor(rhombusSize / 2);
        col++
      ) {
        let sum = 0;
        for (let i = row; i <= row + Math.floor(rhombusSize / 2); i++) {
          for (
            let j = col - (i - row);
            j <= col - (i - row) + (i - row) * 2;
            j += Math.max(1, (i - row) * 2)
          ) {
            sum += grid[i][j];
          }
        }
        for (let i = endRow; i > row + Math.floor(rhombusSize / 2); i--) {
          for (
            let j = col - (endRow - i);
            j <= col - (endRow - i) + (endRow - i) * 2;
            j += Math.max(1, (endRow - i) * 2)
          ) {
            sum += grid[i][j];
          }
        }
        rhombusSums.add(sum);
      }
    }
  }
  return [...rhombusSums].sort((a, b) => b - a).slice(0, 3);
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
];

for (const test of tests) {
  const result = getBiggestThree(test.data);
  if (result.join(',') !== test.expect.join(',')) {
    throw new Error(`${JSON.stringify(test)} - ${result}`);
  }
}
console.log('success');
