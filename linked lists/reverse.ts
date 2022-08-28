class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function reverseList(head: ListNode | null): ListNode | null {
  const nodes = [];
  let next = head;
  if (head == null) return null;
  while (next !== null) {
    nodes.push(next);
    next = next.next;
  }
  const result: ListNode = {
    next: null,
    val: nodes[nodes.length - 1].val
  };
  next = result;
  for (let i = nodes.length - 2; i >= 0; i--) {
    next.next = {
      next: null,
      val: nodes[i].val
    }
    next = next?.next;
  }
  return result;
};