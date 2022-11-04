---
lang: 'en'
slug: '{{hex}}'
---

- Arrays are row-major in C
- Consider an `arr[i][j]` type of 2D array...
- Then `for (j=0;j<N;j++) for (i=0;i<M;i++)` will be much slower than `for (i=0;i<N;i++) for (j=0;j<M;j++)` due to the way of caching
- Metrics show that it can be up to 35x slower
