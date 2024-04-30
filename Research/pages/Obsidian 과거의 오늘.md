---
lang: 'en'
slug: '/829DE7'
---

```dataview
LIST
WHERE file.day.month = date(this.file.name).month
  AND file.day.day = date(this.file.name).day
  AND file.path != this.file.path
SORT file.day DESC
```
