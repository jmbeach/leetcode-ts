// returns the closest difference to the target
function twoSumClosest(nums: number[], target: number): number {
  nums.sort((a, b) => a - b);
  let [left, right] = [0, nums.length - 1];
  let minDiff = Infinity;
  while (left < right) {
    const sum = nums[left] + nums[right];
    const diff = Math.abs(sum - target);
    if (diff === 0) return 0;
    minDiff = Math.min(minDiff, diff);
    if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return minDiff;
}

const tests = [
  {
    data: [-1, 2, 1, -4],
    target: 4,
    expect: 1,
  },
  {
    data: [0, 2, 4, -4],
    target: 4,
    expect: 0,
  },
];

for (const test of tests) {
  const result = twoSumClosest(test.data, test.target);
  if (result !== test.expect) {
    throw new Error(JSON.stringify(test) + ' - ' + result);
  }
}
console.log('success');
