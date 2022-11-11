// generate data
const datasetSizes = [100, 1000, 10000, 199999];
function isAnagram(s: string, t: string): boolean {
  const trackerS: Record<string, number> = {};
  const trackerT: Record<string, number> = {};
  if (s.length !== t.length) return false;
  for (let i = 0; i < s.length; i++) {
    if (trackerS[s[i]]) {
      trackerS[s[i]]++;
    } else {
      trackerS[s[i]] = 1;
    }

    if (trackerT[t[i]]) {
      trackerT[t[i]]++;
    } else {
      trackerT[t[i]] = 1;
    }
  }

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (trackerS[char] !== trackerT[char]) {
      return false;
    }
  }

  return true;
}

function makeNonAnagram(length: number, isDifferentLength: boolean): string[] {
  const chars = [...new Array(length)].map(() => {
    const randomNumber = 97 + Math.floor(Math.random() * 25);
    return String.fromCharCode(randomNumber);
  });
  // scramble up to a quarter of the letters
  const charsToScramble =
    1 + Math.floor(Math.random() * Math.floor(length * 0.25));
  const charsToRearrange =
    1 + Math.floor(Math.random() * Math.floor(length * 0.25));
  const randomNumber = 97 + Math.floor(Math.random() * 25);
  const extraChar = String.fromCharCode(randomNumber);
  const str1 = [...chars];
  if (isDifferentLength) {
    str1.push(extraChar);
  }
  const str2 = [...chars];
  for (let i = 0; i < charsToRearrange; i++) {
    const randomIndex = Math.floor(Math.random() * length);
    const randomIndex2 = Math.floor(Math.random() * length);
    const temp = str1[randomIndex];
    str1[randomIndex] = str1[randomIndex2];
    str1[randomIndex2] = temp;
  }
  for (let i = 0; i < charsToScramble; i++) {
    const randomIndex = Math.floor(Math.random() * length);
    const randomNumber = 97 + Math.floor(Math.random() * 25);
    const scrambled = String.fromCharCode(randomNumber);
    str1[randomIndex] = scrambled;
  }

  return [str1.join(''), str2.join('')];
}

function makeAnagram(length: number, isDifferentLength: boolean): string[] {
  const chars = [...new Array(length)].map(() => {
    const randomNumber = 97 + Math.floor(Math.random() * 25);
    return String.fromCharCode(randomNumber);
  });
  // scramble up to a quarter of the letters
  const charsToRearrange =
    1 + Math.floor(Math.random() * Math.floor(length * 0.25));
  const randomNumber = 97 + Math.floor(Math.random() * 25);
  const extraChar = String.fromCharCode(randomNumber);
  const str1 = [...chars];
  if (isDifferentLength) {
    str1.push(extraChar);
  }
  const str2 = [...chars];
  for (let i = 0; i < charsToRearrange; i++) {
    const randomIndex = Math.floor(Math.random() * length);
    const randomIndex2 = Math.floor(Math.random() * length);
    const temp = str1[randomIndex];
    str1[randomIndex] = str1[randomIndex2];
    str1[randomIndex2] = temp;
  }
  return [str1.join(''), str2.join('')];
}

for (const dataset of datasetSizes) {
  const oddNonAnagram = makeNonAnagram(dataset, true);
  const evenNonAnagram = makeNonAnagram(dataset, false);
  const oddAnagram = makeAnagram(dataset, true);
  const evenAnagram = makeAnagram(dataset, false);

  const inFileNameOddNon = `input${dataset}43.txt`;
  const inFileNameEvenNon = `input${dataset}33.txt`;
  const inFileNameOdd = `input${dataset}4.txt`;
  const inFileNameEven = `input${dataset}3.txt`;
  const outFileNameOddNon = `output${dataset}43.txt`;
  const outFileNameEvenNon = `output${dataset}33.txt`;
  const outFileNameOdd = `output${dataset}4.txt`;
  const outFileNameEven = `output${dataset}3.txt`;
  Deno.writeTextFileSync(inFileNameOddNon, oddNonAnagram.join('\n'));
  Deno.writeTextFileSync(
    outFileNameOddNon,
    isAnagram(oddNonAnagram[0], oddNonAnagram[1]) ? '1' : '0'
  );
  Deno.writeTextFileSync(inFileNameEvenNon, evenNonAnagram.join('\n'));
  Deno.writeTextFileSync(
    outFileNameEvenNon,
    isAnagram(evenNonAnagram[0], evenNonAnagram[1]) ? '1' : '0'
  );
  Deno.writeTextFileSync(inFileNameOdd, oddAnagram.join('\n'));
  Deno.writeTextFileSync(
    outFileNameOdd,
    isAnagram(oddAnagram[0], oddAnagram[1]) ? '1' : '0'
  );
  Deno.writeTextFileSync(inFileNameEven, evenAnagram.join('\n'));
  Deno.writeTextFileSync(
    outFileNameEven,
    isAnagram(evenAnagram[0], evenAnagram[1]) ? '1' : '0'
  );
}
