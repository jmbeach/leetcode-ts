/* Given matrix board[][] of dimensions m1 x m2 and pattern
 * pattern[][] of dimensions n1 x n2, the task is to check whether a pattern
 * exists in the matrix or not, and if yes then print the top most indices
 * of the pattern[][] in board[][]. It is assumed that m1, m2 ≥ n1, n2
 * 
 * If any of the elements of pattern are letters, then every element of the submatrix
 * that corresponds to that letter, must be the same. Also, every other letter must correspond
 * to a different value. 
 * 
 * If the element in pattern, is a number,
 * then the element of the submatrix must match the number exactly */

/* Example 1
 * board:
 *     0 1 2 3 4
 *   [
 * 0   1 5 8 2 9
 * 1   1 2 4 8 2
 * 2   4 4 7 6 3
 *   ]
 * 
 * pattern:
 * [
 *   a 2
 *   4 b
 * ]
 * 
 * output:
 * [ 1, 0 ]
 * 
 * */

function checkPattern(board: number[][], pattern: string[][], startRow: number, startCol: number): boolean {
  const patternMap: Record<string, number> = {};
  const duplicateMap: Record<number, string> = {};
  for (let patternRow = 0; patternRow < pattern.length; patternRow++) {
    for (let patternCol = 0; patternCol < pattern[0].length; patternCol++) {
      const patternDigit = pattern[patternRow][patternCol];
      const boardDigit = board[startRow + patternRow][startCol + patternCol];
      if (patternDigit >= '0' && patternDigit <= '9') {
        if (parseInt(patternDigit, 10) !== boardDigit) return false;
      } else if (typeof patternMap[patternDigit] === 'undefined') {
        if (typeof duplicateMap[boardDigit] !== 'undefined') return false;
        patternMap[patternDigit] = boardDigit;
        duplicateMap[boardDigit] = patternDigit;
      } else {
        if (patternMap[patternDigit] !== boardDigit) return false;
      }
    }
  }
  return true;
}

function findPattern(board: number[][], pattern: string[][]): number[] {
  for (let row = 0; row <= board.length - pattern.length; row++) {
    for (let col = 0; col <= board[0].length - pattern[0].length; col++) {
      if (checkPattern(board, pattern, row, col)) return [row, col];
    }
  }
  return [];
}

const tests = [
  {
    data: {
      board: [
        [1, 5, 8, 2, 9],
        [1, 2, 0, 1, 2],
        [4, 4, 1, 0, 3]
      ],
      pattern: [ ['0', '1'], ['1', '0']]
    },
    expect: [1, 2]
  },
  {
    data: {
      board: [
        [1, 5, 8, 2, 9],
        [1, 2, 4, 8, 2],
        [4, 4, 7, 6, 3]
      ],
      pattern: [ ['a', '2'], ['4', 'b']]
    },
    expect: [1, 0]
  }
]

for (const test of tests) {
  const result = findPattern(test.data.board, test.data.pattern);
  if (result.join(',') !== test.expect.join(',')) {
    throw new Error(`${JSON.stringify(test)}`)
  }
}
console.log('success')