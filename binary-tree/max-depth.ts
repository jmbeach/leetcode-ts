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

function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  let subDepth = 0;
  if (root?.left) {
    subDepth = maxDepth(root.left);
  }
  if (root?.right) {
    const rightDepth = maxDepth(root.right);
    if (rightDepth > subDepth) {
      subDepth = rightDepth;
    }
  }
  return 1 + subDepth;
}