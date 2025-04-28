---
lang: 'en'
slug: '/FC43CC'
---

```python
from concurrent.futures import wait, ProcessPoolExecutor

def mproc():
	with ProcessPoolExecutor() as pool:
		futures = [pool.submit(fn) for num in range(3)]
		wait(futures)
```
