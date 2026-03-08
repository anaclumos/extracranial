---
lang: 'en'
slug: '/B5FC98'
last_modified: 2023-07-23
---

```bash
export NODE_OPTIONS="--max_old_space_size=8192"
```

If the above doesn't work,

```bash
export NODE_OPTIONS="--max-old-space-size=16384"
```

## Check Current Memory Limit

```bash
node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))'
```
