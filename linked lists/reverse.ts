class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  let [prev, node] = [null, head];
  if (!head) return null;
  while (true) {
    const next = node.next;
    node.next = prev;
    prev = node;
    if (!next) return node;
    node = next;
  }
}

const tests = [{ data: [1, 2, 3, 4, 5], expect: [5, 4, 3, 2, 1] }];

for (const test of tests) {
  const headTest = new ListNode(test.data[0]);
  let next = headTest;
  for (const x of test.data.slice(1)) {
    const newNext = new ListNode(x);
    next.next = newNext;
    next = newNext;
  }

  const headExpect = new ListNode(test.expect[0]);
  next = headExpect;
  for (const x of test.expect.slice(1)) {
    const newNext = new ListNode(x);
    next.next = newNext;
    next = newNext;
  }

  const startTime = new Date();
  const result = reverseList(headTest);
  const endTime = new Date();
  const resultAsArray = [];
  let current = result;
  while (current) {
    resultAsArray.push(current.val);
    current = current.next;
  }

  if (resultAsArray.toString() !== test.expect.toString()) {
    throw new Error(`${JSON.stringify(test)} - ${resultAsArray}`);
  }
  const duration = endTime.getTime() - startTime.getTime();
  if (duration > 500) {
    throw new Error(`${JSON.stringify(test)} - took too long - ${duration}ms`);
  }
}

console.log('success');
