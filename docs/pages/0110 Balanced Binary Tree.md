---
lang: 'en'
slug: '/908740'
---

Solved at: [2022-09-25](./../.././docs/journals/2022-09-25.md)

## Question

Given a binary tree, determine if it is height-balanced.

For this problem, a height-balanced binary tree is defined as:

> a binary tree in which the left and right subtrees of _every_ node differ in height by no more than 1.

## Solution

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:

    def getHeight(self, node):
        if node == None:
            return 0
        l = node.left
        r = node.right
        return max(self.getHeight(l), self.getHeight(r)) + 1

    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        if root == None:
            return True
        l = root.left
        r = root.right
        lh = self.getHeight(l)
        rh = self.getHeight(r)
        return abs(lh - rh) <= 1 and self.isBalanced(l) and self.isBalanced(r)

```

## Results

### Runtime

- 123 ms, faster than14.05%ofPython3online submissions forBalanced Binary Tree.

### Memory Usage

- 18.6 MB, less than90.53%ofPython3online submissions forBalanced Binary Tree.

## Complexity Analysis

### Time

- $O(n \log n)$ because worst case, we might need to travel all nodes while counting their height with $O(n)$

### Space

- $O(n)$ because we require a stack to contain all nodes, worst case.

## Other Answers Online

<head>
  <html lang="en-US"/>
</head>
