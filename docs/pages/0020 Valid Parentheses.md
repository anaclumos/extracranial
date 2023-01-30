---
lang: 'en'
slug: '/F5650C'
---

Solved at: [2022-07-10](./../.././docs/journals/2022-07-10.md)

## Question

- [Valid Parentheses - LeetCode](https://leetcode.com/problems/valid-parentheses/)

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:

1.  Open brackets must be closed by the same type of brackets.
2.  Open brackets must be closed in the correct order.

## Solution

This is a classic stack problem.

I missed some details:

- Remember `pop()` doesn't take any argument.
- Remember to check the final condition. When the list is not empty at the end, then return `False`.

```python
class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        opening = ["(", "{", "["]
        closing = [")", "}", "]"]

        for _, c in enumerate(s):
            if c in opening:
                stack.append(c)
                continue
            if not stack:
                return False
            e = stack.pop()
            if opening.index(e) != closing.index(c):
                return False
        if not stack:
            return True
        return False

```

## Results

### Runtime

- 67 ms, faster than 11.18% of Python3 online submissions for Valid Parentheses.

### Memory Usage

- 13.9 MB, less than 24.23% of Python3 online submissions for Valid Parentheses.

## Other Answers Online

- All of the other solutions I found had similar approaches.
- This is funny.

```java
public boolean isValid(String s) {
  while (s.indexOf("{}") != -1 || s.indexOf("[]") != -1 ||
         s.indexOf("()") != -1) {
    s = s.replace("()", "");
    s = s.replace("[]", "");
    s = s.replace("{}", "");
  }
  return s.isEmpty();
}
```

<head>
  <html lang="en-US"/>
</head>
