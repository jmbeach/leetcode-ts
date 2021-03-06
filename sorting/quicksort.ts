function partition(nums: number[], start: number, end: number) {
  const pivotIndex = Math.floor((start + end) / 2);
  const pivot = nums[pivotIndex];
  let low = start;
  let high = end;
  while (true) {
    while (nums[low] < pivot) {
      low++;
    }
    while (nums[high] > pivot) {
      high--;
    }
    if (low >= high) return high;
    const temp = nums[low];
    nums[low] = nums[high];
    nums[high] = temp;
    low++;
    high--;
  }
}

function quickSortRecurse(nums: number[], start: number, end: number) {
  if (start < 0 || end < 0 || end <= start) return;
  const pivot = partition(nums, start, end);
  quickSortRecurse(nums, start, pivot);
  quickSortRecurse(nums, pivot + 1, end);
}

function quickSort(nums: number[]) {
  const result = [...nums];
  quickSortRecurse(result, 0, result.length - 1);
  return result;
}

const testData = [
  { data: [5, 4, 3, 2, 1], expected: [1, 2, 3, 4, 5] },
  { data: [3, 0, 5, 7, 2, 9, 3, 4], expected: [0, 2, 3, 3, 4, 5, 7, 9] },
  { data: [0, 1, 9, 37, 5, 6, 5, 8, 3, 3, 9, 1, -1, 9, 3, 8, 4, 5, 7, 7], expected: [-1, 0, 1, 1, 3, 3, 3, 4, 5, 5, 5, 6, 7, 7, 8, 8, 9, 9, 9, 37] },
  { data: [], expected: [] },
  { data: [1], expected: [1] },
];
const dataFiles = [...Deno.readDirSync('../data-generation')].map(x => x.name).filter(x => x.endsWith('json'));
for (const file of dataFiles) {
  testData.push(JSON.parse(Deno.readTextFileSync(`../data-generation/${file}`)))
}

for (const data of testData) {
  const startTime = new Date();
  const result = quickSort(data.data);
  const endTime = new Date();
  const elapsed = endTime.getTime() - startTime.getTime();
  if (result.join(',') !== data.expected.join(',')) {
    throw new Error(`${JSON.stringify(data)} - ${result}`)
  }
  if (elapsed > 500) {
    throw new Error(`${JSON.stringify(data)} - took ${elapsed}ms`)
  }
}

console.log('success')