// expects a single character string
function isAlphaNumeric(s: string): boolean {
  const minNumAscii = '0'.charCodeAt(0);
  const maxNumAscii = minNumAscii + 9;
  const minAlphaAscii = 'a'.charCodeAt(0);
  const maxAlphaAscii = minAlphaAscii + 25;
  const ascii = s.charCodeAt(0);
  return (ascii >= minNumAscii && ascii <= maxNumAscii)
    || (ascii >= minAlphaAscii && ascii <= maxAlphaAscii);
}

function isPalindrome(s: string): boolean {
  let lo = 0;
  let hi = s.length - 1;
  while (lo <= hi) {
    let loChar = s[lo].toLowerCase();
    let hiChar = s[hi].toLowerCase();
    while (!isAlphaNumeric(loChar) && lo < s.length - 1) {
      lo++;
      loChar = s[lo].toLowerCase();
    }
    while (!isAlphaNumeric(hiChar) && hi > 0) {
      hi--;
      hiChar = s[hi].toLowerCase();
    }
    if (lo > hi) {
      break;
    }

    if (loChar !== hiChar) {
      return false;
    }
    lo++;
    hi--;
  }

  return true;
}

const tests = [
  { data: 'A man, a plan, a canal: Panama', expect: true },
  { data: 'race a car', expect: false },
  { data: 'race car', expect: true },
  { data: 'r', expect: true },
  { data: '', expect: true },
  { data: 'rar', expect: true },
  { data: 'rat', expect: false },
  { data: 'a.', expect: true },
  { data: '0P', expect: false },
]

for (const test of tests) {
  const result = isPalindrome(test.data);
  if (result !== test.expect) {
    throw new Error(`${JSON.stringify(test)} - ${result}`)
  }
}

console.log('success')