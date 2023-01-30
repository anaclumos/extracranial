---
lang: 'en'
slug: '/6BE74D'
---

Solved at: [[2023-01-28]]
[Reverse Linked List](https://leetcode.com/problems/reverse-linked-list)

## Question

Given the `head` of a singly linked list, reverse the list, and return _the reversed list_.

## Solution

```swift
class Solution {
    func reverseList(_ head: ListNode?) -> ListNode? {
        var itr: ListNode? = head
        guard itr != nil else { return nil }
        var prev : ListNode = itr!
        while (itr != nil) {
            var next : ListNode? = itr!.next
            itr!.next = prev
            prev = itr!
            itr = next
        }
    }
}
```

causes time limit exceeded

## Improved

i was like -- what -- why?

then I figured it was because the last two elements, previously `head`, had an infinite loop. therefore, the printing answer part caused the error.

```swift
class Solution {
    func reverseList(_ head: ListNode?) -> ListNode? {
        var itr: ListNode? = head
        guard itr != nil else { return nil }
        var prev : ListNode? = nil // ← this
        while (itr != nil) {
            var next : ListNode? = itr!.next
            itr!.next = prev
            prev = itr
            itr = next
        }
        return prev
    }
}
```

## Results

- Runtime 12 ms, Beats 81.49%
- Memory 15 MB, Beats 45.31%

## Complexity Analysis

Time $O(n)$ Space $O(1)$

## Other Answers Online

Recursive approach

```swift
class Solution {
    func reverseList(_ head: ListNode?) -> ListNode? {
        guard head != nil else { return nil }
        guard head!.next != nil else { return head }
        var next : ListNode? = head!.next
        var reversed : ListNode? = reverseList(next);
        head!.next!.next = head
        head!.next = nil
        return reversed
    }
}
```

- Runtime 12 ms, Beats 81.49%
- Memory 14.6 MB, Beats 91.58%
