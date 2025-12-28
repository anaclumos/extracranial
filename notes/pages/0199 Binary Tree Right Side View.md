---
lang: 'en'
slug: '/3AEAEA'
---

Solved at: [[2022-08-27]]

## Question

Given the `root` of a binary tree, imagine yourself standing on the **right side** of it, and return _the values of the nodes you can see ordered from top to bottom_.

## Solution

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        answer = []
        queue = []
        if root:
            queue.append(root)
        while queue:
            answer.append(queue[-1].val)
            n = len(queue)
            for _ in range(n):
                node = queue.pop(0)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
        return answer
```

## Results

### Runtime

50 ms, faster than 56.24% of Python3 online submissions for Binary Tree Right Side View.

### Memory Usage

13.9 MB, less than 70.69% of Python3 online submissions for Binary Tree Right Side View.
