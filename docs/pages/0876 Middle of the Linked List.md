---
lang: 'en'
slug: '/838556'
---

Solved at: [2023-01-29](./../.././docs/journals/2023-01-29.md)

## Question

[0876 Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list)

## Solution

```swift
class Solution {
    func middleNode(_ head: ListNode?) -> ListNode? {
        print("start")
        var count = 0
        var headcopy = head

        while(headcopy != nil) {
            headcopy = headcopy!.next
            count += 1
        }

        var fin = count / 2

        headcopy = head

        for _ in 0..<fin {
            headcopy = headcopy!.next
        }

        return (headcopy)
    }
}
```

## Results

- Runtime 3 ms Beats 84.39%
- Memory 14.4 MB, Beats 13.82%

## Complexity Analysis

- $O(N)$
- $O(1)$

## Improved

```swift
class Solution {
    func middleNode(_ head: ListNode?) -> ListNode? {
        var fast = head
        var slow = head
        while (fast != nil && fast!.next != nil) {
            fast = fast!.next!.next
            slow = slow!.next
        }
        return slow
    }
}
```

- Runtime 6 ms Beats 54.85%
- Memory 14 MB, Beats 70.57%

<head>
  <html lang="en-US"/>
</head>
