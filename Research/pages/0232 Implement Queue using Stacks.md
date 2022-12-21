---
lang: 'en'
slug: '/4C8DAE'
---

Solved at: [[2022-11-28]]

- [Link](https://leetcode.com/problems/implement-queue-using-stacks)

## Question

Implement a first in, first out (FIFO) queue using only two stacks. The implemented queue should support a regular queue's functions (`push`, `peek`, `pop`, and `empty`).

- Implement the `MyQueue` class:
  - `void push(int x)` Pushes element x to the back of the queue.
  - `int pop()` Removes the element from the front of the queue and returns it.
  - `int peek()` Returns the element at the front of the queue.
  - `boolean empty()` Returns `true` if the queue is empty, `false` otherwise.
- You must use **only** standard operations of a stack, which means only `push to top`, `peek/pop from top`, `size`, and `is empty` operations are valid.
- Depending on your language, the stack may not be supported natively. Using only a stack's standard operations, you may simulate a stack using a list or deque (double-ended queue).

## Solution

```python
class MyQueue:
    front = []
    back = []

    def __init__(self):
        self.front = []
        self.back = []

    def push(self, x: int) -> None:
        self.back.append(x) # push to top

    def pop(self) -> int:
        if not self.front:
            while self.back:
                self.front.append(self.back.pop())
        return self.front.pop()

    def peek(self) -> int:
        if not self.front:
            while self.back:
                self.front.append(self.back.pop())
        return self.front[-1]

    def empty(self) -> bool:
        return not self.front and not self.back

```

## Results

- Runtime: 46 ms, Beats 72.73%
- Memory, 14 MB Beats 76.5%

Accepted on the first try? Let's go!

![[3A6F7A.png]]

## Complexity Analysis

- Push - $O(1)$ per operation,
- Pop - Amortized $O(1)$ per operation.
- Space: $O(n)$

Depending on the policy of moving elements in the queue, either moving ahead of time or just in time, the time complexity can vary from $O(1)$ to $O(n)$.
