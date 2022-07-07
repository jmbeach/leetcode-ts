function twoSum(nums: number[], target: number): number[] {
  let low = 0;
  let high = nums.length - 1;
  while (low < high) {
    const sum = nums[low] + nums[high];
    if (sum > target) {
      high--;
    } else if (sum < target) {
      low++;
    } else {
      return [low + 1, high +1]
    }
  }
  return [];
}
