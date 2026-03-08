---
lang: 'en'
slug: '/2990CC'
last_modified: 2022-12-04
---

- a file descriptor, used in Unix/Linux, is simply an integer
- it is an index of an array in the [[OS]] (file descriptor table)
- for example,
  - 0 is `stdin` (keyboard)
  - 1 is `stdout` (display)
  - 2 is `stderr` (display)
- `cin`, `cout`, and `cerr` are wrappers of these default FDs.
