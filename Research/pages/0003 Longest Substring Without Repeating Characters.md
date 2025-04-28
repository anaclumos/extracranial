---
lang: 'en'
slug: '/AAD203'
---

Solved at: [[2023-01-30]]
[Longest Substring Without Repeating Characters - LeetCode](https://leetcode.com/problems/longest-substring-without-repeating-characters/description/)

## Question

Given a string `s`, find the length of the **longest substring** without repeating characters.

## Solution

```swift
class Solution {
    func lengthOfLongestSubstring(_ s: String) -> Int {
        var maxLength = 0
        var substring = ""
        for (idx, char) in s.enumerated() {
            var candidate = substring + String(char)
            while candidate.count != Set(candidate).count {
                candidate = String(candidate[String.Index(encodedOffset: 1)...])
            }
            if candidate.count > maxLength {
                maxLength = candidate.count
            }
            substring = candidate
        }
        return maxLength
    }
}
```

## Results

- Time taken: 6 m 48 s
- Runtime 645 ms, Beats 9.21%
- Memory 14.8 MB, Beats 43.95%

## Complexity Analysis

We can use an array to make this $O(N^2)$

We can replace `candidate.count != Set(candidate).count` to using Sets to check in $O(N)$ time, given at one given point `substring` must have distinct characters.

## Takeaways

Using constant array with alphabets as an index can also replace set.
