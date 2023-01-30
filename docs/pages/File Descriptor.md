---
lang: 'en'
slug: '/2990CC'
---

- a file descriptor, used in Unix/Linux, is simply an integer
- it is an index of an array in the [OS](./../.././docs/pages/OS.md) (file descriptor table)
- for example,
  - 0 is `stdin` (keyboard)
  - 1 is `stdout` (display)
  - 2 is `stderr` (display)
- `cin`, `cout`, and `cerr` are wrappers of these default FDs.

<head>
  <html lang="en-US"/>
</head>
