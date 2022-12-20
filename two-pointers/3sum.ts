function threeSum(nums: number[]): number[][] {
  const result: number[][] = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i - 1] === nums[i]) continue;
    let [left, right] = [i + 1, nums.length - 1];
    const first = nums[i];
    const target = -first;
    while (left < right) {
      if (left > i + 1 && nums[left - 1] === nums[left]) {
        left++;
        continue;
      }
      if (right < nums.length - 1 && nums[right + 1] === nums[right]) {
        right--;
        continue;
      }
      const sum = nums[left] + nums[right];
      if (sum < target) {
        left++;
      } else if (sum > target) {
        right--;
      } else {
        result.push([first, nums[left], nums[right]]);
        left++;
      }
    }
  }
  return result;
}

const tests = [
  {
    data: [-1, 0, 1, 2, -1, -4],
    expect: [
      [-1, -1, 2],
      [-1, 0, 1],
    ],
  },
  {
    data: [0, 0, 0],
    expect: [[0, 0, 0]],
  },
];

for (const test of tests) {
  const result = threeSum(test.data);
  if (JSON.stringify(test.expect) !== JSON.stringify(result)) {
    throw new Error(JSON.stringify(test) + ' - ' + JSON.stringify(result));
  }
}
