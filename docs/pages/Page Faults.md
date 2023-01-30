---
lang: 'en'
slug: '/BEE2D2'
---

- when page is not present
- hardware records the address and raises a page fault
- operating system will
  - pick an empty frame or a page to evict
  - write back if dirty
  - load the page and update the page table
  - restart the instruction
  - make sure page table and translation look-aside buffers are updated
- when evicting...
  - write back any changes
  - invalidate ($V=0$)
- if TLB is modified, apply that to page table
  - invalidate the translation
- Similarly, we have LRU, FIFO, Random approach like [Cache Evictions](./../.././docs/pages/Cache%20Evictions.md)
  - use pseudo-LRU algorithm
- Reference: H & P, "Computer Organizations," 3rd, Ed.

| Translation Look-aside Buffers | Virtual Memory | Cache | Possible?                                                       |
| ------------------------------ | -------------- | ----- | --------------------------------------------------------------- |
| Hit                            | Hit            | Hit   | Possible. Best Case!                                            |
| Hit                            | Hit            | Miss  | Possible. TLB Hits. VM Hit is implied. Cache Miss.              |
| Miss                           | Hit            | Hit   | TLB Misses, then hits in page table, then cache hits.           |
| Miss                           | Hit            | Miss  | TLB Misses, then hits in page table, then cache misses.         |
| Miss                           | Miss           | Miss  | TLB Misses, then page fault, then cache misses.                 |
| Hit                            | Miss           | Miss  | Impossible. Cannot hit in TLB if page is not present.           |
| Hit                            | Miss           | Hit   | Impossible. Cannot hit in TLB if page is not present.           |
| Miss                           | Miss           | Hit   | Impossible. Data cannot be in cache if the page is not present. |

<head>
  <html lang="en-US"/>
</head>
