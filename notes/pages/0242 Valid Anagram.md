---
lang: 'en'
slug: '/C1FF2B'
---

Solved at: [[2022-09-04]]

## Question

Given two strings `s` and `t`, return `true` _if_ `t` _is an anagram of_ `s`_, and_ `false` _otherwise_.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

## Solution

```python
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        return sorted(s) == sorted(t)
```

## Results

### Runtime

- 129 ms, faster than 6.44% of Python3 online submissions for Valid Anagram.

### Memory Usage

- 15.1 MB, less than 11.95% of Python3 online submissions for Valid Anagram.

## Complexity Analysis

- Time: $O(n \log n)$
- Space: $O(1)$

## Other Answers Online

- Frequency Counter Map `alphabet → count`
  - Time: $O(n)$
  - Space: $O(1)$ because the map's size is constant.
