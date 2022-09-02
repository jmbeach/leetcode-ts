function isPalindrome(s: string): boolean {
  let low = 0;
  const sLower = s.toLocaleLowerCase();
  let high = sLower.length - 1;
  const isAlphanumeric = (str: string) => {
      const isAlpha = (str > 'a' && str < 'z') || (str > 'A' && str < 'Z')
      const isNumeric = str > '0' && str < '9'
      return isAlpha || isNumeric
  }
  while (low < high) {
      while (low < high && !isAlphanumeric(sLower[low])) { low++ }
      while (low < high && !isAlphanumeric(sLower[high])) { high-- }
      if (sLower[low] !== sLower[high]) return false;
      low++;
      high--;
  }
  return true;
};

const tests = [
  { data: "A man, a plan, a canal: Panama", expect: true },
  // { data: "nope", expect: false },
]

for (const test of tests) {
  const result = isPalindrome(test.data)
  if (result !== test.expect) {
    throw new Error(`${JSON.stringify(test)} - ${result}`)
  }
}