class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  let stack: (TreeNode | null)[] = [root];
  while (stack.length) {
    const next = stack.splice(0, 1)[0];
    if (!next) continue;
    const temp = next.left;
    next.left = next.right;
    next.right = temp;
    stack.push(next.left);
    stack.push(next.right);
  }
  return root;
}