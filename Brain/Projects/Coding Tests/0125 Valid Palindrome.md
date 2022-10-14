---
lang: 'en'
slug: '/646F3A'
---

Solved at: [[2022-07-14]] and [[2022-07-26]]

## Question

A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string `s`, return `true` _if it is a **palindrome**, or_ `false` _otherwise_.

## Solution

This is a simple recursion problem.

```python
class Solution:

    def prune(self, s: str) -> str:
        answer = ""
        for c in s:
            lc = c.lower()
            if ord(lc) >= ord("a") and ord(lc) <= ord("z"):
                answer += lc
            if ord(lc) >= ord("0") and ord(lc) <= ord("9"):
                answer += lc
        return answer

    def palindromeCore(self, s: str) -> bool:
        if len(s) <= 1:
            return True
        else:
            return (s[0] == s[-1]) and self.palindromeCore(s[1:-1])

    def isPalindrome(self, s: str) -> bool:
        s = self.prune(s)
        print(s)
        if len(s) <= 1:
            return True
        return self.palindromeCore(s)
```

But I got **Memory Limit Exceeded**.

## Improved

So I fixed it with a loop-based solution.

```python
class Solution:
    def prune(self, s: str) -> str:
        answer = ""
        for c in s:
            lc = c.lower()
            if ord(lc) >= ord("a") and ord(lc) <= ord("z"):
                answer += lc
            if ord(lc) >= ord("0") and ord(lc) <= ord("9"):
                answer += lc
        return answer

    def isPalindrome(self, s: str) -> bool:
        s = self.prune(s)
        if len(s) <= 1:
            return True
        for idx, c in enumerate(s):
            if s[idx] != s[len(s) - idx - 1]:
                return False
            if idx >= len(s)//2:
                return True
        return True
```

## Results

### Runtime

- 120 ms, faster than 10.41% of Python3 online submissions for Valid Palindrome.

### Memory Usage

- 14.7 MB, less than 42.81% of Python3 online submissions for Valid Palindrome.

## Other Answers Online

```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        n = s.replace(' ','').lower()
        s = ''.join(c for c in n if c.isalnum())
        p = 0
        q = len(s) - 1
        while p < q:
            if s[p] != s[q]:
                return False
            else:
                p += 1
                q -= 1
        return True
```

- Didn't know there was `c.isalnum()`.
