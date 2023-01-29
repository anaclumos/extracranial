---
lang: 'en'
slug: '/7FEEF7'
---

Solved at: [[2023-01-29]]
[Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree)

## Question

Given the `root` of a binary tree, return *the length of the **diameter** of the tree*.

The **diameter** of a binary tree is the **length** of the longest path between any two nodes in a tree. This path may or may not pass through the `root`.

The **length** of a path between two nodes is represented by the number of edges between them.

## Solution

```swift
class Solution {

    func getHeight(_ root: TreeNode?) -> Int {
        guard root != nil else { return 0 }
        return max(getHeight(root!.left), getHeight(root!.right)) + 1
    }

    func diameterOfBinaryTree(_ root: TreeNode?) -> Int {
        guard root != nil else { return 0 }
        return getHeight(root!.left) + getHeight(root!.right)
    }
}
```

## Improved

```swift
class Solution {

    func getHeight(_ root: TreeNode?) -> Int {
        guard root != nil else { return 0 }
        return max(getHeight(root!.left), getHeight(root!.right)) + 1
    }

    func diameterOfBinaryTree(_ root: TreeNode?) -> Int {
        guard root != nil else { return 0 }
        let this = getHeight(root!.left) + getHeight(root!.right)
        let left = diameterOfBinaryTree(root!.left)
        let right = diameterOfBinaryTree(root!.right)
        return max(this, left, right)
    }
}
```

## Results

- Runtime 118 ms, Beats 9.43%
- Memory 14.6 MB, Beats 68.40%

## Complexity Analysis

Time: $O(n)$
Space: $O(n)$
