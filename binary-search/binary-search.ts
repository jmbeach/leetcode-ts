function search(nums: number[], target: number): number {
  let l = 0;
  let r = nums.length - 1;
  while (l <= r) {
    const midpoint = Math.floor((l + r) / 2);
    const midVal = nums[midpoint];
    if (midVal < target) {
      l = midpoint + 1;
    } else if (midVal > target) {
      r = midpoint - 1;
    } else {
      return midpoint;
    }
  }
  return -1;
}

const tests = [
  { data: { nums: [-1,0,3,5,9,12], target: 9 }, expect: 4 },
]

for (const test of tests) {
  const startTime = new Date();
  const result = search(test.data.nums, test.data.target);
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