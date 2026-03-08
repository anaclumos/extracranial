---
lang: 'en'
slug: '/E61CEF'
---

Solved at: [[2023-01-28]]

[First Bad Version - LeetCode](https://leetcode.com/problems/first-bad-version/)

## Question

You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have `n` versions `[1, 2, ..., n]` and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an [[API]] `bool isBadVersion(version)` which returns whether `version` is bad. Implement a function to find the first bad version. You should minimize the number of calls to the [[API]].

## Solution

```swift
class Solution : VersionControl {
    func firstBadVersion(_ n: Int) -> Int {
        var high : Int = n
        var low  : Int = 0
        while(low < high - 1) {
            let midpoint = (high + low) / 2
            if isBadVersion(midpoint) {
                high = midpoint
            } else {
                low = midpoint
            }
        }
        if isBadVersion(low) {
            return low
        }
        return high
    }
}
```

## Results

- Runtime 0 ms, Beats 100%
- Memory 13.8 MB, Beats 32.28%

## Complexity Analysis

Runtime: $log_2 n$ given `isBadVersion` is $O(1)$
Space Complexity: $O(n)$

## Takeaways

When using [[binary search]], we must consider the case where `low < high` but when `low = high - 1` and thus never exiting the loop.
