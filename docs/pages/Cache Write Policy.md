---
lang: 'en'
slug: '/BCCDC0'
---

In practice, use **Write Back**.

## Write Through

- Update current and next level. Propagate changes to slower caches. L1 → L2 → L3.
- Pros: Always Coherent!
- Cons: Slow!

## Write Back

- Only update the fastest cache. Propagate changes to slower caches when we need space (i.e., when eviction happens.)
- Pros: Fast!
- Cons: Concurrency issues when other cores try to read from L3 Shared Cache. It could be slow if a few isolated writes happen (because the whole block should be written back)

<head>
  <html lang="en-US"/>
</head>
