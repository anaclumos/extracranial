---
lang: 'en'
slug: '/A06B20'
---

Solved at: [2022-09-05](./../.././docs/journals/2022-09-05.md)

## Question

Given an integer array `nums`, find the contiguous subarray (containing at least one number) with the largest sum and return _its sum_.

A **subarray** is a **contiguous** part of an array.

## Solution

```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        current = 0
        largest = -inf
        for i in nums:
            current += i
            if current > largest:
                largest = current
            if current < 0:
                current = 0
        return largest
```

- try to see if keeping the previous "part" is worth it.
- if it is worth it, that means the part before is positive.

## Results

### Runtime

- 1192 ms, faster than 42.26% of Python3 online submissions for Maximum Subarray.

### Memory Usage

- 27.7 MB, less than 97.93% of Python3 online submissions for Maximum Subarray.

## Complexity Analysis

### Time

$O(N)$

### Space

$O(1)$

## Other Answers Online

- Divide and Conquer

<head>
  <html lang="en-US"/>
</head>
