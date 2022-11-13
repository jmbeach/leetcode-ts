function isValidSudoku(board: string[][]): boolean {
  const rowSets: Set<string>[] = [...new Array(9)].map(() => new Set());
  const colSets: Set<string>[] = [...new Array(9)].map(() => new Set());
  const houseSets: Set<string>[] = [...new Array(9)].map(() => new Set());
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const current = board[row][col];
      const currentHouse = 3 * Math.floor(row / 3) + Math.floor(col / 3);
      if (current === '.') continue;
      if (
        rowSets[row].has(current) ||
        colSets[col].has(current) ||
        houseSets[currentHouse].has(current)
      ) {
        return false;
      }
      rowSets[row].add(current);
      colSets[col].add(current);
      houseSets[currentHouse].add(current);
    }
  }
  return true;
}

const tests = [
  {
    data: [
      ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
      ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
      ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
      ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
      ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
      ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
      ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
      ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
      ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
    ],
    expect: true,
  },
];

for (const test of tests) {
  const result = isValidSudoku(test.data);
  if (result !== test.expect) {
    throw new Error(`${JSON.stringify(test)} - ${result}`);
  }
}
console.log('success');
