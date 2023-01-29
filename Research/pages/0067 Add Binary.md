---
lang: 'en'
slug: '/F39D63'
---

Solved at: [[2023-01-28]]
[Add Binary](https://leetcode.com/problems/add-binary)

## Question

Given two binary strings `a` and `b`, return *their sum as a binary string*.

## Solution

```swift
class Solution {
    func addBinary(_ a: String, _ b: String) -> String {
        return String((Int(a, radix: 2)!) + (Int(b, radix: 2)!), radix: 2)
    }
}
```

## Improved

```swift
class Solution {
    func addBinary(_ a: String, _ b: String) -> String {
        print(a)
        print(b)
        let na = String(a.reversed())
        let nb = String(b.reversed())

        var itr = 0
        var carry = 0
        var answer = ""
        while (itr < na.count || itr < nb.count) {

            var naitr = 0
            var nbitr = 0

            if (itr < na.count) {
                naitr = Int(String(na[String.Index(encodedOffset:itr)])) ?? 0
            }

            if (itr < nb.count) {
                nbitr = Int(String(nb[String.Index(encodedOffset:itr)])) ?? 0
            }

            answer += String((naitr + nbitr + carry) % 2)
            carry = (naitr + nbitr + carry) / 2
            itr+=1
        }
        if carry != 0 {
            answer += String(carry)
        }

        return String(answer.reversed())
    }
}
```

lol

## Results

- Runtime 24 ms, Beats 21.68%
- Memory 14.2 MB, Beats 85.40%

## Complexity Analysis

$O(n)$ for both
