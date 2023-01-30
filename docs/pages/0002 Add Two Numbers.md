---
lang: 'en'
slug: '/E3498A'
---

Solved at: [2022-08-27](./../.././docs/journals/2022-08-27.md)

## Question

You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each node contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero except the number 0 itself.

## Solution

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def _add(self, l1, l2, answer, carry: int) -> Optional[ListNode]:
        if not l1 and not l2 and carry == 0:
            return answer
        answer.val += l1.val if l1 else 0
        answer.val += l2.val if l2 else 0
        answer.val += carry
        carry = 0
        if answer.val >= 10:
            answer.val -= 10
            carry = 1
        l1next = l1.next if l1 else None
        l2next = l2.next if l2 else None
        if l1next or l2next or carry != 0:
            # print(l1next.val if l1next else 0, l2next.val if l2next else 0, carry)
            n = ListNode()
            answer.next = n
        else:
            n = None
        self._add(l1next, l2next, n, carry)

    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        answer = ListNode()
        self._add(l1, l2, answer, 0)
        return answer
```

## Results

### Runtime

113 ms, faster than 43.74% of Python3 online submissions for Add Two Numbers.

### Memory Usage

13.9 MB, less than 44.03% of Python3 online submissions for Add Two Numbers.

<head>
  <html lang="en-US"/>
</head>
