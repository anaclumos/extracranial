---
lang: 'en'
slug: '/3A1093'
---

Solved at: [[2022-09-04]]

## Question

Given an array of integers `nums` sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.

You must write an algorithm with `O(log n)` runtime complexity.

## Solution

```python
class Solution:
    def _search(self, nums: List[int], target:int, start:int, end:int) -> int:
        mid = (end + start) // 2
        # print(start, end, target, mid, nums[mid])
        if nums[mid] == target:
            return mid
        elif nums[mid] != target and end <= start:
            return -1
        elif nums[mid] > target:
            return self._search(nums, target, start, mid-1)
        elif nums[mid] < target:
            return self._search(nums, target, mid+1, end)
        else:
            return -1

    def search(self, nums: List[int], target: int) -> int:
        return self._search(nums, target, 0, len(nums)-1)
```

- [[Binary Search]]

## Results

### Runtime

- 542 ms, faster than 6.00% of Python3 online submissions for Binary Search.

### Memory Usage

- 15.5 MB, less than 73.17% of Python3 online submissions for Binary Search.

## Complexity Analysis

### Time

$O(n)$

### Space

$O(1)$
