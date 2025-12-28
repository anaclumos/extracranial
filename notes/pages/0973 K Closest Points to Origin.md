---
lang: 'en'
slug: '/B693C4'
---

Solved at: [[2023-01-30]]
[K Closest Points to Origin - LeetCode](https://leetcode.com/problems/k-closest-points-to-origin/description/)

## Question

Given an array of `points` where `points[i] = [xi, yi]` represents a point on the **X-Y** plane and an integer `k`, return the `k` closest points to the origin `(0, 0)`.

The distance between two points on the **X-Y** plane is the Euclidean distance (i.e., `√(x1 - x2)2 + (y1 - y2)2`).

You may return the answer in **any order**. The answer is **guaranteed** to be **unique** (except for the order that it is in).

## Solution

```swift
class Solution {
    func kClosest(_ points: [[Int]], _ k: Int) -> [[Int]] {
        var coordinates = points
        coordinates.sort {
            $0[0] * $0[0] + $0[1] * $0[1] < $1[0] * $1[0] + $1[1] * $1[1]
        }
        return Array(coordinates[...(k-1)])
    }
}
```

## Results

- Time taken: 10 m 7 s
- Runtime 861 ms, Beats 81.63%
- Memory 16.1 MB, Beats 84.69%

## Complexity Analysis

- Time $O(n \log n)$
- Space $O(n)$

## Other Answers Online
