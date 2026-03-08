---
lang: 'ko'
slug: '/829DE7'
last_modified: 2025-05-11
---

```dataview
LIST
WHERE file.day.month = date(this.file.name).month
  AND file.day.day = date(this.file.name).day
  AND file.path != this.file.path
SORT file.day DESC
```
