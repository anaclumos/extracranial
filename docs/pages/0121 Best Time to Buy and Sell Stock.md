---
lang: 'en'
slug: '/22C295'
---

Solved at: [2022-07-13](./../.././docs/journals/2022-07-13.md)

## Question

You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return _the maximum profit you can achieve from this transaction_. If you cannot achieve any profit, return `0`.

## Solution

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        if not prices:
            return 0
        minv = prices[0]
        profit = 0
        for i, price in enumerate(prices):
            if price < minv:
                minv = price
            else:
                if profit < prices[i] - minv:
                    profit = prices[i] - minv
        return profit
```

I had to get a hint to keep the minimum value so far.

- Time Complexity: $O(n)$
- Space Complexity: $O(1)$

## Results

### Runtime

- 1698 ms, faster than 38.38% of Python3 online submissions for Best Time to Buy and Sell Stock.

### Memory Usage

- 25 MB, less than 37.97% of Python3 online submissions for Best Time to Buy and Sell Stock.

<head>
  <html lang="en-US"/>
</head>
