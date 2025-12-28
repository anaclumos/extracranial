---
lang: 'en'
slug: '/2103F2'
---

Solved at: [[2022-08-27]]

## Question

Given a binary tree `root`, a node _X_ in the tree is named **good** if in the path from the root to _X_ there are no nodes with a value _greater than_ X.

Return the number of **good** nodes in the binary tree.

## Solution

```python
class Solution:
    def countGoodNodes(self, node: TreeNode, maxVal: int) -> int:
        if not node:
            return 0
        count = 0
        if not maxVal > node.val:
            count += 1
        if node.val > maxVal:
            maxVal = node.val
        count = count + self.countGoodNodes(node.left, maxVal) + self.countGoodNodes(node.right, maxVal)
        return count

    def goodNodes(self, root: TreeNode) -> int:
        return self.countGoodNodes(root, root.val)
```

## Results

### Runtime

436 ms, faster than 36.72% of Python3 online submissions for Count Good Nodes in Binary Tree.

### Memory Usage

32.6 MB, less than 45.65% of Python3 online submissions for Count Good Nodes in Binary Tree.
