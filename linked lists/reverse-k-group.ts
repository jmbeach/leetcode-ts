class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  const dummy: ListNode = { val: 0, next: head };
  let groupPrev = dummy;
  while (true) {
    const kth = getKthElement(groupPrev, k);
    if (!kth) break;
    const groupNext = kth.next;
    let prev = kth.next;
    let current = groupPrev.next;
    while (current && current !== groupNext) {
      const temp = current.next;
      current.next = prev;
      prev = current;
      current = temp;
    }

    const temp = groupPrev.next;
    groupPrev.next = kth;
    groupPrev = temp!;
  }
  return dummy.next;
}

function getKthElement(node: ListNode, k: number): ListNode | null {
  let next: ListNode | null = node;
  for (let i = 0; i < k && next; i++) {
    next = next.next;
  }
  return next;
}

const tests = [
  {
    data: [1, 2, 3, 4, 5],
    size: 2,
    expect: [2, 1, 4, 3, 5],
  },
];

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
  const result = reverseKGroup(headTest, test.size);
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
