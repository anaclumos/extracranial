---
lang: 'en'
slug: '/F74684'
---

Solved at: [[2022-08-30]]

## Question

You are given an array of integers `stones` where `stones[i]` is the weight of the `ith` stone.

We are playing a game with the stones. On each turn, we choose the **heaviest two stones** and smash them together. Suppose the heaviest two stones have weights `x` and `y` with `x <= y`. The result of this smash is:

- If `x == y`, both stones are destroyed, and
- If `x != y`, the stone of weight `x` is destroyed, and the stone of weight `y` has new weight `y - x`.

At the end of the game, there is **at most one** stone left.

Return _the weight of the last remaining stone_. If there are no stones left, return `0`.

## Solution

```python
class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        while(len(stones) > 1):
            greatest = max(stones)
            stones.remove(greatest)
            second = max(stones)
            stones.remove(second)
            if greatest - second > 0:
                stones.append(greatest - second)
        if stones:
            return stones[0]
        return 0
```

- Time: $O(n^2)$
- Space: $O(1)$

## Improved

```python
class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        for idx, val in enumerate(stones):
            stones[idx] = -1 * val
        heapq.heapify(stones)
        while(len(stones) > 1):
            first = heapq.heappop(stones)
            second = heapq.heappop(stones)
            if first - second < 0:
                heapq.heappush(stones, first - second)
        return -1 * heapq.heappop(stones) if len(stones) else 0
```

- `heapq.heapify()` is $O(n)$.
- Time: $O(n \log n)$.
- Space: $O(1)$ in [[Python]]

## Results

### Runtime

75 ms, faster than 5.53% of Python3 online submissions for Last Stone Weight.

### Memory Usage

14 MB, less than 14.37% of Python3 online submissions for Last Stone Weight.
