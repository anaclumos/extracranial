---
lang: 'en'
slug: '/291111'
---

Solved at: [2022-09-25](./../.././docs/journals/2022-09-25.md)

## Question

Given `head` which is a reference node to a singly-linked list. The value of each node in the linked list is either `0` or `1`. The linked list holds the binary representation of a number.

Return the _decimal value_ of the number in the linked list.

The **most significant bit** is at the head of the linked list.

## Solution

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def getDecimalValue(self, head: ListNode) -> int:
        value = head.val
        while head.next:
            value *= 2
            head = head.next
            value += head.val
        return value
```

## Results

### Runtime

- 60 ms, faster than 28.54% of Python3 online submissions for Convert Binary Number in a Linked List to Integer.

### Memory Usage

- 13.9 MB, less than 9.10% of Python3 online submissions for Convert Binary Number in a Linked List to Integer.

## Complexity Analysis

- Time complexity: $O(n)$
- Space complexity: $O(1)$

<head>
  <html lang="en-US"/>
</head>
