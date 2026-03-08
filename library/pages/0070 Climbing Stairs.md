---
lang: 'en'
slug: '/7D9C1D'
---

Solved at: [[2023-01-28]]

https://leetcode.com/problems/climbing-stairs

## Question

You are climbing a staircase. It takes `n` steps to reach the top.

Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?

## Solution

```swift
class Solution {
    func climbStairs(_ n: Int) -> Int {
        var map = [0: 1, 1: 1]
        if map.keys.contains(n) {
            return map[n]!
        }
        for i in 2...n {
            map[i] = map[i-1]! + map[i-2]!
        }
        return map[n]!
    }
}
```

## Results

- Runtime 0 ms, Beats 100%
- Memory 13.7 MB, Beats 67.32%

## Complexity Analysis

$O(n)$ for both

## Takeaways

Using Fibonacci will give $O(1)$ space complexity.
