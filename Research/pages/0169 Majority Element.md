---
lang: 'en'
slug: '/53B653'
---

Solved at: [[2023-01-28]]

[Majority Element](https://leetcode.com/problems/majority-element)

## Question

Given an array `nums` of size `n`, return _the majority element_.

The majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.

## Solution

```swift
class Solution {
    func majorityElement(_ nums: [Int]) -> Int {
        var map = [Int: Int]()
        for num in nums {
            if map.keys.contains(num) {
                map[num]! += 1
            }
            else {
                map[num] = 1
            }
        }
        var maxVal = 0
        var maxKey = 0
        for (idx, (key, val)) in map.enumerated() {
            if val > maxVal {
                maxVal = val
                maxKey = key
            }
        }
        return maxKey
    }
}
```

## Results

- Runtime 102 ms, Beats 76.95%
- Memory 15.8 MB, Beats 65.42%

## Complexity Analysis

$O(n)$ for both

## Improved

### Boyer-Moore Voting Algorithm

using you cannot discard the majority item

```swift
class Solution {
    func majorityElement(_ nums: [Int]) -> Int {
        var count : Int = 0
        var candidate: Int? = nil

        for num in nums {
            if count == 0 {
                candidate = num
            }
            if candidate == num {
                count += 1
            } else {
                count -= 1
            }
        }
        return candidate!
    }
}
```

This gives space complexity $O(1)$
