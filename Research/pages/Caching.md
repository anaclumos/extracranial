---
lang: 'en'
slug: '{{hex}}'
---

- [[Computer Systems]]
- When the processor reads or writes, it will check if the cache contains the desired data.
- [[Principles of Locality]]
  - **Spacial Locality**. Entire blocks are transferred from the memory.
  - **Temporal Locality**. Leave data that is likely to be reaccessed. Least-recently-used blocks are evicted.
- Cache Miss: Umm, we cannot find what we want in the cache.
- Cache Hit: Yes, we found a copy of what we want in the cache!

## Write Policy

**Write Through**. Update current and next level. Propagate changes to slower caches. L1 → L2 → L3.

- Pros: Always Coherent!
- Cons: Slow!

**Write Back**. Only update the fastest cache. Propagate changes to slower caches when we need space (i.e., when eviction happens.)

- Pros: Fast!
- Cons: Concurrency issues when other cores try to read from L3 Shared Cache. It could be slow if a few isolated writes happen (because the whole block should be written back)

In practice, use **Write Back**.

## Evictions

Eviction happens when the cache is full, and we need to store a new block from memory.

### Implementations

- FIFO: First-in, First-out (oldest block replaced)
- LRU: Least Recently Used (usually best, hard to implement)
- Random: Performs pretty well
