class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  let l = list1;
  let r = list2;
  const mergedHead: ListNode = {
    next: null,
    val: -1
  };
  let mergedNext = mergedHead;
  while (true) {
    if (l === null) {
      mergedNext.next = r;
      break;
    }
    if (r === null) {
      mergedNext.next = l;
      break;
    }
    if (l.val < r.val) {
      mergedNext.next = l;
      mergedNext = mergedNext.next;
      l = l.next;
    } else {
      mergedNext.next = r;
      mergedNext = mergedNext.next;
      r = r.next;
    }
  }
  return mergedHead.next;
}

const tests = [
  { data: { list1: [1,2,3], list2: [1,2,3] }, expect: [1,1,2,2,3,3] }
]

const arrayToList = (arr: number[]) => {
  const result = new ListNode(arr[0])
  let next = result
  for (const x of arr.slice(1)) {
    const newNext = new ListNode(x)
    next.next = newNext
    next = newNext
  }
  return result;
}

for (const test of tests) {
  const headTest = arrayToList(test.data.list1);
  const headTest2 = arrayToList(test.data.list2);

  const startTime = new Date();
  const result = mergeTwoLists(headTest, headTest2);
  const endTime = new Date();
  const resultAsArray = []
  let current = result;
  while (current) {
    resultAsArray.push(current.val)
    current = current.next
  }

  if (resultAsArray.toString() !== test.expect.toString()) {
    throw new Error(`${JSON.stringify(test)} - ${resultAsArray}`)
  }
  const duration = endTime.getTime() - startTime.getTime();
  if (duration > 500) {
    throw new Error(`${JSON.stringify(test)} - took too long - ${duration}ms`)
  }
}

console.log('success')