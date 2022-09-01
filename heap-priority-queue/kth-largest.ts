class MinHeap {
  data: number[] = []
  get length() {
    return this.data.length;
  }
  getRightChildIndex(i: number) {
    return 2 * i + 2;
  }
  getLeftChildIndex(i: number) {
    return 2 * i + 1
  }
  getParentIndex(i: number) {
    return Math.floor((i - 1)/2)
  }
  insert(value: number) {
    let currentIndex = this.data.length;
    this.data.push(value);
    while (currentIndex > 0) {
      const parentIndex = this.getParentIndex(currentIndex);
      const parentValue = this.data[parentIndex];
      if (parentValue > value) {
        this.data[parentIndex] = value;
        this.data[currentIndex] = parentValue;
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }
  peek() {
    return this.data[0];
  }
  minHeapify(index: number) {
    const leftIndex = this.getLeftChildIndex(index);
    const rightIndex = this.getRightChildIndex(index);
    let smallest = index;
    if (leftIndex < this.length && this.data[leftIndex] < this.data[smallest]) {
      smallest = leftIndex
    }
    if (rightIndex < this.length && this.data[rightIndex] < this.data[smallest]) {
      smallest = rightIndex;
    }
    if (index !== smallest) {
      const temp = this.data[index];
      this.data[index] = this.data[smallest];
      this.data[smallest] = temp;
      this.minHeapify(smallest)
    }
  }
  pop() {
    const result = this.data[0];
    const newRoot = this.data.splice(this.data.length - 1, 1)[0];
    this.data[0] = newRoot;
    this.minHeapify(0);
    return result;
  }
}

class KthLargest {
  minHeap = new MinHeap();
  size: number;
  constructor(k: number, nums: number[]) {
    this.size = k;
    for (const num of nums) {
      this.minHeap.insert(num);
    }
    while (this.minHeap.length > this.size) {
      this.minHeap.pop();
    }
  }

  add(val: number): number {
    this.minHeap.insert(val);
    while (this.minHeap.length > this.size) {
      this.minHeap.pop();
    }
    return this.minHeap.peek();
  }
}

const tests = [
  { data: { k: 3, nums: [4, 5, 8, 2], adds: [3, 5, 10, 9, 4] }, expect: [4, 5, 5, 8, 8] },
  { data: { k: 7, nums: [-10,1,3,1,4,10,3,9,4,5,1], adds: [3,2,3,1,2,4,5,5,6,7,7,8,2,3,1,1,1,10,11,5,6,2,4,7,8,5,6] }, expect: [3,3,3,3,3,3,4,4,4,5,5,5,5,5,5,5,5,6,7,7,7,7,7,7,7,7,7] },
]

for (const test of tests) {
  const instance = new KthLargest(test.data.k, test.data.nums);
  const result = [];
  for (let i = 0; i < test.data.adds.length; i++) {
    result.push(instance.add(test.data.adds[i]));
  }
  if (result.toString() !== test.expect.toString()) {
    throw new Error(`${JSON.stringify(test)} - ${result}`)
  }
}

console.log('success')