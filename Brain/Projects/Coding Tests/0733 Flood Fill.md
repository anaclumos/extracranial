---
lang: 'en'
slug: '/18ED1C'
---

Solved at: [[2022-09-05]]

## Question

An image is represented by an `m x n` integer grid `image` where `image[i][j]` represents the pixel value of the image.

You are also given three integers `sr`, `sc`, and `color`. You should perform a **flood fill** on the image starting from the pixel `image[sr][sc]`.

To perform a **flood fill**, consider the starting pixel, plus any pixels connected **4-directionally** to the starting pixel of the same color as the starting pixel, plus any pixels connected **4-directionally** to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with `color`.

Return _the modified image after performing the flood fill_.

## Solution

```python
class Solution:
    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        original = image[sr][sc]
        visited = [[0 for i in image[0]] for j in image]
        queue = []
        queue.append([sr, sc])
        while queue:
            [r, c] = queue.pop(0)
            if visited[r][c]:
                continue
            if image[r][c] != original:
                continue
            image[r][c] = color
            visited[r][c] = True
            if r > 0:
                queue.append([r-1, c])
            if r < len(image) - 1:
                queue.append([r+1, c])
            if c > 0:
                queue.append([r, c-1])
            if c < len(image[0]) - 1:
                queue.append([r, c+1])
        return image
```

I did [[BFS]], but it seems possible to do this in recursion too.

## Results

- Runtime: 125 ms, faster than 43.36% of Python3 online submissions for Flood Fill.
- Memory Usage: 14 MB, less than 89.56% of Python3 online submissions for Flood Fill.

## Complexity Analysis

- Time Complexity: $O(N)$, where N is the number of pixels in the image
- Space Complexity: $O(N)$, the size of the implicit call queue
