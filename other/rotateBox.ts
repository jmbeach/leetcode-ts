function applyGravity(box: string[][]): string[][] {
  for (let row = 0; row < box.length; row++) {
      let movePosition = box[row].length - 1;
      for (let col = box[row].length - 1; col >= 0; col--) {
          if (box[row][col] === '*') {
              movePosition = col - 1;
          } else if (box[row][col] === '#') {
              const temp = box[row][col];
              box[row][col] = box[row][movePosition];
              box[row][movePosition] = temp;
              movePosition--;
          }
      }
  }
  return box;
}

function rotate(box: string[][]): string[][] {
  const result = [...new Array(box[0].length)].map(() => []);
  for (let row = 0; row < box.length; row++) {
      for (let col = 0; col < box[row].length; col++) {
          result[col][row] = box[box.length - 1 - row][col]
      }
  }
  return result;
}

function rotateTheBox(box: string[][]): string[][] {
  const afterGravity = applyGravity(box);
  const rotated = rotate(afterGravity);
  return rotated;
};

const tests = [
  {
    data: [["#",".","#"]],
    expect: [["."],
    ["#"],
    ["#"]]
  }
]
for (const test of tests) {
  const result = rotateTheBox(test.data);
  for (let i = 0; i < test.data.length; i++) {
    for (let j = 0; j < test.data[i].length; j++) {
      if (result[i][j] !== test.expect[i][j]) {
        throw new Error(`${JSON.stringify(test)}`)
      }
    }
  }
}
console.log('success')