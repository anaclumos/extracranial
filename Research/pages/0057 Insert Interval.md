---
lang: 'en'
slug: '/F2D0A8'
---

Solved at: [[2023-01-28]]
[Insert Interval](https://leetcode.com/problems/insert-interval)

## Question

You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [starti, endi]` represent the start and the end of the `ith` interval and `intervals` is sorted in ascending order by `starti`. You are also given an interval `newInterval = [start, end]` that represents the start and end of another interval.

Insert `newInterval` into `intervals` such that `intervals` is still sorted in ascending order by `starti` and `intervals` still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return `intervals` *after the insertion*.

## Solution

```swift
class Solution {
    func overlaps(_ interval1: [Int], _ interval2: [Int]) -> Bool {
        if interval2[0] > interval1[0] {
            return interval2[0] <= interval1[1]
        }
        else {
            return interval1[0] <= interval2[1]
        }
    }

    func merge(_ interval1: [Int], _ interval2: [Int]) -> [Int] {
        if !overlaps(interval1, interval2) { fatalError("does not overlap") }
        var low = min(interval1[0], interval2[0])
        var high = max(interval1[1], interval2[1])
        print("merging", interval1, interval2, [low, high])
        return [low, high]
    }

    func insert(_ intervals: [[Int]], _ newInterval: [Int]) -> [[Int]] {
        var intervalsCopy = intervals
        var overlapped = false;
        for (idx, interval) in intervalsCopy.enumerated() {
            if overlaps(interval, newInterval) {
                intervalsCopy.remove(at: idx)
                intervalsCopy.insert(merge(interval, newInterval), at: idx)
                overlapped = true
                break;
            }
        }
        if !overlapped {
            intervalsCopy.append(newInterval)
        }
        intervalsCopy = intervalsCopy.sorted {$0[0] < $1[0]}
        var idx = 0
        while idx < intervalsCopy.count - 1 {
            if overlaps(intervalsCopy[idx], intervalsCopy[idx+1]) {
                var intervals1 = intervalsCopy.remove(at: idx)
                var intervals2 = intervalsCopy.remove(at: idx)
                intervalsCopy.insert(merge(intervals1, intervals2), at: idx)
                idx -= 1
                idx = max(0, idx)
            } else {
                idx += 1
            }
        }
        return intervalsCopy
    }
}
```

## Results

- Runtime 159 ms, Beats 8.5%
- Memory 15 MB, Beats 28.83%

## Complexity

Time: $O(N)$

Space: $O(1)$ but in this case the problem gave the original array immutable, so $O(N)$
