---
lang: 'en'
slug: '/3FCE0F'
---

Solved at: [[2023-01-29]]

## Question

[Maximum Depth of Binary Tree - LeetCode](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

Given the `root` of a binary tree, return _its maximum depth_.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.

## Solution

```swift
class Solution {
    func maxDepth(_ root: TreeNode?) -> Int {
        guard root != nil else {return 0}
        return max(maxDepth(root!.right), maxDepth(root!.left)) + 1
    }
}
```

## Results

- Runtime 26 ms Beats 73.36%
- Memory 14.7 MB Beats 58.61%

## Complexity Analysis

- Time: $O(N)$
- Space: $O(N)$

## Takeaways

We can also use BFS to traverse the tree
