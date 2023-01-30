---
lang: 'en'
slug: '/C2CD47'
---

Solved at: [2023-01-29](./../.././docs/journals/2023-01-29.md)

## Question

Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.

## Solution

```swift
class Solution {
    func containsDuplicate(_ nums: [Int]) -> Bool {
        var set = Set<Int>()
        for num in nums {
            if set.contains(num) {
                return true
            }
            else {
                set.insert(num)
            }
        }
        return false
    }
}
```

## Results

- Runtime 642 ms Beats 44.57%
- Memory 19 MB Beats 10.85%

## Complexity Analysis

Both $O(N)$

## Takeaways

Using sorting can sacrifice time to $O(N \log N)$ and pull down space into $O(1)$

<head>
  <html lang="en-US"/>
</head>
