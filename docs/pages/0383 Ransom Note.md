---
lang: 'en'
slug: '/99EDAB'
---

Solved at: [2023-01-28](./../.././docs/journals/2023-01-28.md)

[Ransom Note](https://leetcode.com/problems/ransom-note)

## Question

Given two strings `ransomNote` and `magazine`, return `true` _if_ `ransomNote` _can be constructed by using the letters from_ `magazine` _and_ `false` _otherwise_.

Each letter in `magazine` can only be used once in `ransomNote`.

## Solution

```swift
class Solution {
    func canConstruct(_ ransomNote: String, _ magazine: String) -> Bool {
        var map = [Character: Int]()
        for (_, char) in magazine.enumerated() {
            if map.keys.contains(char) {
                print("\(char) is in map")
                map[char]! += 1
            }
            else {
                print("\(char) is not in map")
                map[char] = 1
            }
        }

        for (_, char) in ransomNote.enumerated() {
            if map.keys.contains(char) {
                if map[char]! == 0 {
                    return false
                } else {
                    map[char]! -= 1
                }
            } else {
                return false
            }
        }
        return true
    }
}
```

## Results

- Runtime 511 ms. Beats 5.8%
- Memory 14.5 MB. Beats 61.68%

## Complexity Analysis

Time: $O(n)$
Space: $O(n)$ -- we can say this $O(1)$ because there are only 26 possible keys

## Takeaways

Dictionary with finite set of key possible is $O(1)$

<head>
  <html lang="en-US"/>
</head>
