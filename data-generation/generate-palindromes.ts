// generate data
const datasetSizes = [10, 100, 1000, 10000, 100000, 199999];
function isAlphaNumeric(s: string): boolean {
  const isAlpha = s >= 'a' && s <= 'z';
  const isNumeric = s >= '0' && s <= '9';
  return isAlpha || isNumeric;
}
function isPalindrome(s: string): boolean {
  let [left, right] = [0, s.length - 1];
  s = s.toLowerCase();
  while (left < right) {
    if (!isAlphaNumeric(s[left])) {
      left++;
      continue;
    }
    if (!isAlphaNumeric(s[right])) {
      right--;
      continue;
    }
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}

function makeNonPalindrome(length: number, isOddLength: boolean) {
  const chars = [...new Array(Math.floor(length / 2))].map(() => {
    const randomNumber = 32 + Math.floor(Math.random() * 94);
    return String.fromCharCode(randomNumber);
  });
  // scramble up to a quarter of the letters
  const charsToScramble =
    1 + Math.floor(Math.random() * Math.floor(length * 0.25));
  const randomNumber = 32 + Math.floor(Math.random() * 94);
  const extraChar = String.fromCharCode(randomNumber);
  const fullString = [
    ...`${chars.join('')}${isOddLength ? extraChar : ''}${chars
      .reverse()
      .join('')}`,
  ];
  for (let i = 0; i < charsToScramble; i++) {
    const randomIndex = Math.floor(Math.random() * length);
    const randomNumber = 32 + Math.floor(Math.random() * 94);
    const scrambled = String.fromCharCode(randomNumber);
    fullString[randomIndex] = scrambled;
  }
  return fullString.join('');
}

function makePalindrome(length: number, isOddLength: boolean) {
  const chars = [...new Array(Math.floor(length / 2))].map(() => {
    const randomNumber = 32 + Math.floor(Math.random() * 94);
    return String.fromCharCode(randomNumber);
  });
  const randomNumber = 32 + Math.floor(Math.random() * 94);
  const extraChar = String.fromCharCode(randomNumber);
  const fullString = [
    ...`${chars.join('')}${isOddLength ? extraChar : ''}${chars
      .reverse()
      .join('')}`,
  ];
  return fullString.join('');
}

for (const dataset of datasetSizes) {
  const oddNonPalindrome = makeNonPalindrome(dataset, true);
  const evenNonPalindrome = makeNonPalindrome(dataset, false);
  const oddPalindrome = makePalindrome(dataset, true);
  const evenPalindrome = makePalindrome(dataset, false);
  const inFileNameOddNon = `input${dataset}43.txt`;
  const inFileNameEvenNon = `input${dataset}33.txt`;
  const inFileNameOdd = `input${dataset}4.txt`;
  const inFileNameEven = `input${dataset}3.txt`;
  const outFileNameOddNon = `output${dataset}43.txt`;
  const outFileNameEvenNon = `output${dataset}33.txt`;
  const outFileNameOdd = `output${dataset}4.txt`;
  const outFileNameEven = `output${dataset}3.txt`;
  Deno.writeTextFileSync(inFileNameOddNon, oddNonPalindrome);
  Deno.writeTextFileSync(
    outFileNameOddNon,
    isPalindrome(oddNonPalindrome) ? '1' : '0'
  );
  Deno.writeTextFileSync(inFileNameEvenNon, evenNonPalindrome);
  Deno.writeTextFileSync(
    outFileNameEvenNon,
    isPalindrome(evenNonPalindrome) ? '1' : '0'
  );
  Deno.writeTextFileSync(inFileNameOdd, oddPalindrome);
  Deno.writeTextFileSync(
    outFileNameOdd,
    isPalindrome(oddPalindrome) ? '1' : '0'
  );
  Deno.writeTextFileSync(inFileNameEven, evenPalindrome);
  Deno.writeTextFileSync(
    outFileNameEven,
    isPalindrome(evenPalindrome) ? '1' : '0'
  );
}
