---
lang: 'en'
slug: '/E50E42'
---

Solved at: [[2022-10-23]]

## Question

Given `head`, the head of a linked list, determine if the linked list has a cycle.

There is a cycle in a linked list if some node in the list can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that the tail's `next` pointer is connected to. **Note that `pos` is not passed as a parameter**.

Return `true` _if there is a cycle in the linked list_. Otherwise, return `false`.

## Solution

```python
class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        seen = {}
        while True:
            if head == None:
                break
            if head not in seen:
                seen[head] = True
            else:
                return True
            head = head.next
        return False
```

## Results

### Runtime

- 141 ms, faster than 9.68% of Python3 online submissions for the Linked List Cycle.

### Memory Usage

- 17.9 MB, less than 10.44% of Python3 online submissions for the Linked List Cycle.

## Improved

- [[Floyd Cycle Finding Algorithm]]
- Bloom Filter?

```python
class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        slow = head
        fast = head
        while fast != None and fast.next != None:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True
        return False
```

## Results

### Runtime

- 137 ms, faster than 12.14% of Python3 online submissions for the Linked List Cycle.

### Memory Usage

- 17.6 MB, less than 67.24% of Python3 online submissions for the Linked List Cycle.

## Complexity Analysis

- Time: $O(n)$
- Space: $O(1)$

import YouTube from '@site/src/components/YouTube'

<YouTube id="pKO9UjSeLew"/>
