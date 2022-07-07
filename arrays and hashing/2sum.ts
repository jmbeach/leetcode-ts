function twoSum(nums: number[], target: number): number[] {
  const differences: Record<number, number> = {};
  for (let i = 0; i < nums.length; i++) {
    if (typeof differences[nums[i]] !== 'undefined') {
      return [differences[nums[i]], i];
    } else {
      differences[target - nums[i]] = i;
    }
  }
  return [];
};

const testData = [
  { nums: [1, 2, 3], target: 3, expect: [0, 1] },
  { nums: [1, 1, 3], target: 2, expect: [0, 1] },
  { nums: [1, 3, 1], target: 2, expect: [0, 2] },
  { nums: [3, 1, 1], target: 2, expect: [1, 2] },
  { nums: [1, 1], target: 2, expect: [0, 1] },
  { nums: [1, 2, 3, 4], target: 3, expect: [0, 1] },
  { nums: [4, 3, 2, 1], target: 3, expect: [2, 3] },
];

for (const test of testData) {
  const result = twoSum(test.nums, test.target);
  if (result[0] !== test.expect[0] || result[1] !== test.expect[1]) {
    throw new Error(`${JSON.stringify(test)} - ${result}`)
  }
}

console.log('success')
