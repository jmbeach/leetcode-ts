function getCombos(
  i: number,
  digits: string,
  current: string,
  combos: string[]
): void {
  const lookup: Record<string, string[]> = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z'],
  };
  if (current.length === digits.length) {
    combos.push(current);
    return;
  }
  const possibilities = lookup[digits[i]];
  for (const letter of possibilities) {
    current += letter;
    getCombos(i + 1, digits, current, combos);
    current = current.substring(0, current.length - 1);
  }
}

function letterCombinations(digits: string): string[] {
  if (!digits.length) return [];
  const combos: string[] = [];
  getCombos(0, digits, '', combos);
  return combos;
}

const tests = [
  // {
  //   data: '23',
  //   expect: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'],
  // },
  {
    data: '426723',
    expect: [],
  },
];

for (const test of tests) {
  const result = letterCombinations(test.data);
  for (let r of result) {
    console.log(r);
  }
  if (result.join(',') !== test.expect.join(',')) {
    throw new Error(`${JSON.stringify(test)} - ${result}`);
  }
}
console.log('success');
