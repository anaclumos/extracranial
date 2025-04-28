---
lang: 'en'
slug: '/692460'
---

:::tip
Special thanks to [Ishu Agrawal](https://github.com/ishuagrawal)
:::

## Heap

> Heaps are complete binary trees where the value of each node must be no greater than (or less than) the value of its child nodes.

![[EC7EEF.png]]

- Python **only** supports Min Heaps
- `import heapq`
- `heapq.heapify(arr)`
- `heapq.heappop(arr)`
- `heapq.heappush(arr, x)`
- `heapq.nsmallest(k, arr, key=func)` returns a list with the `k` smallest elements in the iterable `arr` based on a comparator function `func`
  - Runtime: $O(N \log k)$
- `heapq.nlargest(k, arr, key=func)`returns a list with the `k` largest elements in the iterable `arr` based on a comparator function `func`
  - Runtime: $O(N \log k)$

| Operation     | Runtime     |
| ------------- | ----------- |
| Find min/max  | $O(1)$      |
| Search        | $O(n)$      |
| Insert        | $O(\log n)$ |
| Remove        | $O(\log n)$ |
| Heapify Array | $O(n)$      |

## List Offsetting

You can offset with [[Python]]'s `enumerate` function with list splitting.

```python
enumerate(nums[offset::])
```

## Dictionary

- [[Python]] Dictionary is a [[hash map]].
- Lookup time: $O(n)$ worst when there are many collisions.

## Alphanumeric Testing

- `c.isalnum()`

## Making 2d Arrays

- using `visited = [[False] * len(image[0])] * len(image)` **will not work**
  - the rows will share the same memory and change in one will reflect on the others
- use `arr = [[0 for i in range(cols)] for j in range(rows)]`
