function containsDuplicate(nums: number[]): boolean {
  const tracker = new Set<number>();
  for (const num of nums) {
    if (!tracker.has(num)) {
      tracker.add(num)
    } else {
      return true;
    }
  }
  return false;
}