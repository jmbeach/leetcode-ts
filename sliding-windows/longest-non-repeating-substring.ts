function lengthOfLongestSubstring(s: string): number {
  let low = 0;
  let high = 1;
  if (s.length < 2) return s.length;
  let longest = 0;
  const seen: Record<string, boolean> = {};
  while (low < s.length - 1 && s.length - low > longest) {
    const lowChar = s[low];
    let highChar = s[high];
    seen[lowChar] = true;
    while (highChar && !seen[highChar]) {
      seen[highChar] = true;
      high++;
      highChar = s[high];
    }
    if (Object.keys(seen).length > longest) longest = Object.keys(seen).length;
    // shrink window
    low++;
    if (low === high) high++
    delete seen[lowChar]
  }

  return longest;
}

const tests = [
  { data: 'abcabcbb', expect: 3 },
  { data: 'bbbbb', expect: 1 },
  { data: 'pwwkew', expect: 3 },
  { data: 'dvdf', expect: 3 },
  { data: 'anviaj', expect: 5 },
]

for (const test of tests) {
  const startTime = new Date();
  const result = lengthOfLongestSubstring(test.data);
  const endTime = new Date();
  if (result !== test.expect) {
    throw new Error(`${JSON.stringify(test)} - ${result}`)
  }
  const duration = endTime.getTime() - startTime.getTime();
  if (duration > 500) {
    throw new Error(`${JSON.stringify(test)} - took too long - ${duration}ms`)
  }
}

console.log('success')