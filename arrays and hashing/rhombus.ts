function getBiggestThree(grid: number[][]): number[] {
  const maxRhombus = Math.min(
    grid.length % 2 === 0 ? grid.length - 1 : grid.length,
    grid[0].length % 2 === 0 ? grid[0].length - 1 : grid[0].length
  );
  const rhombusSums: number[] = [];
  for (let rhombusSize = 1; rhombusSize <= maxRhombus; rhombusSize += 2) {
    for (let row = 0; row <= grid.length - rhombusSize; row++) {
      for (let col = Math.floor(rhombusSize / 2); col < grid[0].length; col++) {
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
        const endRow = row + rhombusSize - 1;
        for (let i = endRow; i > row + Math.floor(rhombusSize / 2); i--) {
          for (
            let j = col - (i - endRow);
            j <= col - (i - row) + (i - row) * 2;
            j += Math.max(1, (i - row) * 2)
          ) {
            sum += grid[i][j];
          }
        }
        rhombusSums.push(sum);
      }
    }
  }
  rhombusSums.sort((a, b) => b - a);
  return rhombusSums.slice(0, 3);
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
];

for (const test of tests) {
  const result = getBiggestThree(test.data);
  if (result.join(',') !== test.expect.join(',')) {
    throw new Error(`${JSON.stringify(test)} - ${result}`);
  }
}
console.log('success');
