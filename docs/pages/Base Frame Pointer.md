---
lang: 'en'
slug: '/81AD46'
---

- [Computer Systems](./../.././docs/pages/Computer%20Systems.md)
- The base frame pointer `%rbp` will start at a known, stable location.
- It will be a "landmark" for other constants.
- Each function calls need a separate base frame pointer.
  - preamble: save the old `%rbp` and sets up its own.
  - postamble: restore the old `%rbp` and exit.

<head>
  <html lang="en-US"/>
</head>
