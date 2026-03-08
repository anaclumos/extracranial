---
lang: 'en'
slug: '/FC43CC'
last_modified: 2025-05-11
---

```python
from concurrent.futures import wait, ProcessPoolExecutor

def mproc():
    with ProcessPoolExecutor() as pool:
        futures = [pool.submit(fn) for num in range(3)]
        wait(futures)
```
