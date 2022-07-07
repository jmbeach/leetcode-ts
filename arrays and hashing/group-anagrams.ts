function letterCounts(word: string): number[] {
  const result = new Array(26).fill(0);
  for (const letter of word) {
    const ascii = letter.charCodeAt(0) - 'a'.charCodeAt(0);
    result[ascii]++;
  }
  return result;
}

function groupAnagrams(strs: string[]): string[][] {
  const result: Record<string, string[]> = {};
  for (const word of strs) {
    const letters = letterCounts(word);
    const key = letters.join(',');
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(word);
  }
  return Object.values(result);
}
