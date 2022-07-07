function isAnagram(s: string, t: string): boolean {
  const trackerS: Record<string, number> = {};
  const trackerT: Record<string, number> = {};
  if (s.length !== t.length) return false;
  for (let i = 0; i < s.length; i++) {
    if (trackerS[s[i]]) {
      trackerS[s[i]]++
    } else {
      trackerS[s[i]] = 1
    }

    if (trackerT[t[i]]) {
      trackerT[t[i]]++
    } else {
      trackerT[t[i]] = 1
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