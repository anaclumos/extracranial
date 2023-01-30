---
lang: 'en'
slug: '/B950DD'
---

Solved at: [2022-08-26](./../.././docs/journals/2022-08-26.md)

## Question

Given an `m x n` grid of characters `board` and a string `word`, return `true` _if_ `word` _exists in the grid_.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

## Solution

```python
class Solution:
    def __init__(self):
    def neighbors(self, board, visited, point):
        [row, col] = point
        neighbor = []
        if row > 0 and not visited[row - 1][col]:
            neighbor.append([row-1, col])
        if row < len(board) - 1  and not visited[row+1][col]:
            neighbor.append([row+1, col])
        if col > 0 and not visited[row][col-1]:
            neighbor.append([row, col-1])
        if col < len(board[row]) - 1 and not visited[row][col+1]:
            neighbor.append([row, col+1])
        return neighbor

    def dfs(self, board, visited, word, current, candidates):
        [current_row, current_col] = current
        visited[current_row][current_col] = True
        if not word:
            return True
        for candidate in candidates:
            [x, y] = candidate
            if not visited[x][y] and word[0] == board[x][y]:
                visited[x][y] = True
                neighbor = self.neighbors(board, visited, candidate)
                if not self.dfs(board, visited, word[1:], candidate, neighbor):
                    continue
                return True
        visited[current_row][current_col] = False
        return False

    def exist(self, board: List[List[str]], word: str) -> bool:
        rows = len(board)
        cols = len(board[0])

        graphCount = dict()
        wordCount = collections.Counter(word)
        for i in range(rows):
            for j in range(cols):
                graphCount[board[i][j]] = graphCount.get(board[i][j], 0) + 1

        for key,val in wordCount.items():
            if key not in graphCount:
                return False

            if val > graphCount[key]:
                return False

        starting_points = []
        for x, vx in enumerate(board):
            for y, vy in enumerate(board[x]):
                if board[x][y] == word[0]:
                    starting_points.append([x, y])

        for starting_point in starting_points:
            visited = [[False for i in range(cols)] for j in range(rows)]
            neighbor = self.neighbors(board, visited, starting_point)
            if self.dfs(board, deepcopy(visited), word[1:], starting_point, neighbor):
                return True
            else:
                continue
        return False
```

## Improved

```python
rows = len(board)
cols = len(board[0])
graphCount = dict()
wordCount = collections.Counter(word)
for i in range(rows):
    for j in range(cols):
    graphCount[board[i][j]] = graphCount.get(board[i][j], 0) + 1
    for key,val in wordCount.items():
        if key not in graphCount:
            return False
        if val > graphCount[key]:
            return False
```

## Results

### Runtime

- 1978 ms, faster than 96.41% of Python3 online submissions for Word Search.

### Memory Usage

- 14.1 MB, less than 12.63% of Python3 online submissions for Word Search.

<head>
  <html lang="en-US"/>
</head>
