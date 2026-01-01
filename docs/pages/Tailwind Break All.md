---
lang: 'en'
slug: '/68C1FD'
---

Tailwind's `break-word` actually corresponds to `overflow-wrap: break-word` in CSS, which prevents underscore breaks. Therefore, add custom CSS `[word-break: break-word]` (breaks if overflow, still prioritizing breakable words) for description list elements used in table-like grids

```
h1,
h2,
h3,
h4,
h5,
h6,
dt,
dd,
dl,
pre,
.word-break-all {
  word-break: break-word;
}

```
