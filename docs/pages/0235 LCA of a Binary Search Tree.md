---
lang: 'en'
slug: '/AEDE1B'
---

Solved at: [2022-09-25](./../.././docs/journals/2022-09-25.md). Took **17m 09s**

## Question

Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the[definition of LCA on Wikipedia](https://en.wikipedia.org/wiki/Lowest_common_ancestor): "The lowest common ancestor is defined between two nodes`p`and`q`as the lowest node in`T`that has both`p`and`q`as descendants (where we allow**a node to be a descendant of itself**)."

## Solution

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':

        found_p = False
        found_q = False

        queue = [root]

        ancestor = {}

        while((not found_p or not found_q) and queue):
            current = queue.pop()
            if not current:
                continue
            left = current.left
            right = current.right
            if left:
                ancestor[left] = current
                if p.val == left.val:
                    found_p = True
                if q.val == left.val:
                    found_q = True
            if right:
                ancestor[right] = current
                if p.val == right.val:
                    found_p = True
                if q.val == right.val:
                    found_q = True
            queue.append(left)
            queue.append(right)

        current = p
        p_path = [current]

        while current != root:
            current = ancestor[current]
            p_path.append(current)

        current = q
        q_path = [current]

        while current != root:
            current = ancestor[current]
            q_path.append(current)

        lca = root

        for i in p_path:
            print(i.val, "<-", end=" ")
        print()
        for i in q_path:
            print(i.val, "<-", end=" ")

        for i in range(-1, -1 * min(len(q_path), len(p_path)) - 1, -1):
            if q_path[i] == p_path[i]:
                lca = p_path[i]
            elif q_path[i] != p_path[i]:
                break

        return lca
```

I misunderstood LCA as being the minimum in value.

## Results

### Runtime

- 89 ms, faster than86.27%ofPython3online submissions forLowest Common Ancestor of a Binary Search Tree.

### Memory Usage

- 18.9 MB, less than23.33%ofPython3online submissions forLowest Common Ancestor of a Binary Search Tree.

## Improvements

I ignored that this is a Binary Search Tree, not just **Binary Tree**. Therefore one can binary search to reduce the search scope.

## Complexity Analysis

For this, It will be $O(N)$ where $N$ is the count of the nodes.
Space complexity will be $O(N)$ for constructing lists and dictionaries.

If we use the above improvement, space complexity will reduce to $O(1)$. However, time complexity will not change.

<head>
  <html lang="en-US"/>
</head>
