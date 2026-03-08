---
lang: 'en'
slug: '/5F2988'
---

Solved at: [[2022-07-13]]

## Question

You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists in a one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return _the head of the merged linked list_.

## Solution

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        start = []
        while True:
            if not list1 and not list2:
                break
            if not list1:
                start.append(list2)
                list2 = list2.next
                continue
            if not list2:
                start.append(list1)
                list1 = list1.next
                continue
            if list1.val <= list2.val:
                start.append(list1)
                list1 = list1.next
                continue
            else:
                start.append(list2)
                list2 = list2.next
                continue
        prev = None
        for el in start:
            if prev:
                prev.next = el
            prev = el
        if not start:
            return None
        else:
            return start[0]


```

I misunderstood the question, thinking list1 is type `list` instead of Node.

- Time Complexity: $O(n)$
- Space Complexity: $O(n)$

## Results

### Runtime

- 33 ms, faster than 98.24% of Python3 online submissions for Merge Two Sorted Lists.

### Memory Usage

- 14 MB, less than 32.33% of Python3 online submissions for Merge Two Sorted Lists.

## Other Answers Online

```python
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        cur = dummy = ListNode()
        while list1 and list2:
            if list1.val < list2.val:
                cur.next = list1
                list1, cur = list1.next, list1
            else:
                cur.next = list2
                list2, cur = list2.next, list2

        if list1 or list2:
            cur.next = list1 if list1 else list2

        return dummy.next
```

- Time Complexity: $O(n)$
- Space Complexity: $O(1)$

The above solution looks a lot cleaner and Pythonic.
