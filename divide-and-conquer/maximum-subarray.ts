function maxSubArrayWithIndices(nums: number[]) {
  let best = nums[0];
  let current = nums[0];
  let low = 0;
  let high = 0;
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];
    if (num > num + current) {      
      current = num;
      if (current > best) {
        best = current;
        low = i;
        high = i;
      }
    } else {
      current += num;
      if (current > best) {
        best = current;
        high = i;
      }
    }
  }
  return [low, high, best];
}
function maxSubArray(nums: number[]): number {
  return maxSubArrayWithIndices(nums)[2]
};

const tests = [
  { data: [-2,1,-3,4,-1,2,1,-5,4], expect: [3, 6, 6] },
  { data: [-1,-2], expect: [0, 0, -1]}
]

for (const test of tests) {
  const result = maxSubArrayWithIndices(test.data);
  if (result.join(',') !== test.expect.join(',')) {
    throw new Error(`${JSON.stringify(test)} - ${result}`)
  }
}

console.log('success')