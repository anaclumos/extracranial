---
lang: 'en'
slug: '/B5FC98'
---

```
export NODE_OPTIONS="--max_old_space_size=8192"
```

If the above doesn't work,

```
export NODE_OPTIONS="--max-old-space-size=16384"
```

## Check Current Memory Limit

```
node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))'
```
