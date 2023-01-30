---
lang: 'en'
slug: '/322CE5'
---

Solved at: [2022-07-10](./../.././docs/journals/2022-07-10.md)

## Question

- [Two Sum - LeetCode](https://leetcode.com/problems/two-sum/)

Given an array of integers `nums` and an integer `target`, return _indices of the two numbers such that they add up to `target`_.
You may assume that each input would have **_exactly_ one solution**, and you may not use the _same_ element twice.
You can return the answer in any order.

## Solution

So the first obvious answer is to iterate twice.
This finishes calculations in $O(n^2)$ time.

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        for idx1, val1 in enumerate(nums):
            for idx2, val2 in enumerate(nums):
                if idx1 == idx2:
                    continue
                if val1 + val2 == target:
                    return [idx1, idx2]
```

However, this gives a timeout.

## Improved

I used [Python](./../.././docs/pages/Python.md) Dictionary to store complementing values. [Python](./../.././docs/pages/Python.md) Dictionary will have $O(1)$ access time for most cases. This solution will run in $O(n)$ time.

- One caveat: depending on the hash function, it can go as bad as $O(n^2)$.

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:

        # map for complementing elements: complementary-idx
        complementing_map = {}

        for idx, val in enumerate(nums):
            if val in complementing_map:
                return [complementing_map[val], idx]
            complementing_map[target - val] = idx
```

## Results

### Runtime

- 60 ms, faster than 97.16% of Python3 online submissions for Two Sum.

### Memory Usage

- 15.4 MB, less than 14.24% of Python3 online submissions for Two Sum.

## Other Answers Online

- Sort first, $O(n \log n)$
- For all elements, $O(n)$
  - Perform binary search $O(\log n)$
- In total: $O(n \log n)$

<head>
  <html lang="en-US"/>
</head>
