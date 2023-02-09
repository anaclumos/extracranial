---
lang: 'en'
slug: '/486916'
---

Solved at: [[2023-02-09]]

## Question

Given a positive integer `n`, generate an `n x n` `matrix` filled with elements from `1` to `n2` in spiral order.

## Solution

```python
class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:
        row = 0
        col = 0
        incrementing = True
        changingRow = False
        grid = [[-1 for _ in range(n)] for _ in range(n)]
        for i in range(n ** 2):
            # print(i, grid)
            # print(row, col, incrementing, changingRow)
            if row >= n or row < 0 or col >= n or col < 0:
                continue
            grid[row][col] = i + 1

            if changingRow and incrementing:
                if row + 1 >= n or grid[row + 1][col] != -1:
                    changingRow = False
                    incrementing = False
            elif changingRow and not incrementing:
                if row - 1 < 0 or grid[row - 1][col] != -1:
                    changingRow = False
                    incrementing = True
            elif not changingRow and incrementing:
                if col + 1 >= n or grid[row][col + 1] != -1:
                    changingRow = True
            elif not changingRow and not incrementing:
                if col - 1 < 0 or grid[row][col - 1] != -1:
                    changingRow = True
                    incrementing = False

            if changingRow and incrementing:
                row += 1
            elif changingRow and not incrementing:
                row -= 1
            elif not changingRow and incrementing:
                col += 1
            elif not changingRow and not incrementing:
                col -= 1
        return grid
```

## Results

- Runtime 25 ms, Beats 97.6%
- Memory 14 MB, Beats 32.65%

## Complexity Analysis

Time $O(N^2)$ Space $O(1)$
