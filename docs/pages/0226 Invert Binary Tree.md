---
lang: 'en'
slug: '/5E3636'
---

Solved at: [2022-07-26](./../.././docs/journals/2022-07-26.md)

## Question

Given the `root` of a binary tree, invert the tree, and return _its root_.

## Solution

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return
        root.left, root.right = root.right, root.left
        if root.left:
            self.invertTree(root.left)
        if root.right:
            self.invertTree(root.right)
        return root
```

That was simple...

## Results

### Runtime

- 30 ms, faster than 95.71% of Python3 online submissions for Invert Binary Tree.

### Memory Usage

- 13.9 MB, less than 11.66% of Python3 online submissions for Invert Binary Tree.

## Other Answers Online

<head>
  <html lang="en-US"/>
</head>
