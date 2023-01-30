---
lang: 'en'
slug: '/2CCD0C'
---

Solved at: [2023-01-28](./../.././docs/journals/2023-01-28.md)

[Longest Palindrome](https://leetcode.com/problems/longest-palindrome)

## Question

Given a string `s` which consists of lowercase or uppercase letters, return \*the length of the **longest palindrome\*** that can be built with those letters.

Letters are **case sensitive**, for example, `"Aa"` is not considered a palindrome here.

## Solution

```swift
class Solution {
    func longestPalindrome(_ s: String) -> Int {
       var map = [Character: Int]()
       for (_, char) in s.enumerated() {
           if map.keys.contains(char) {
               map[char]! += 1
           } else {
               map[char] = 1
           }
       }

       var oddCountFound = false;
       var answer = 0;
       for (idx, (key, val)) in map.enumerated() {
           if val % 2 == 1 {
               oddCountFound = true;
               answer += val - 1
           } else {
               answer += val
           }
       }
       if oddCountFound {
           return answer + 1
       } else {
           return answer
       }
    }
}
```

## Results

- 3m 42s
- Runtime 9 ms, Beats 52.8%
- Memory 14.5 MB Beats 33.21%

## Complexity Analysis

Time: $O(n)$
Space: $O(1)$ since technically there's a cap for combinations

<head>
  <html lang="en-US"/>
</head>
