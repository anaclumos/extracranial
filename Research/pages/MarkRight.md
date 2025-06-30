---
lang: 'en'
slug: '/7E6CDB'
---

```
Ergonomic for Humans, Affordable for LLMs
```

A spiritual superset of Markdown.

- No Dangling Tokens
  - For example, `![` is one token when printing a image
  - Markdown separator having `|----|----|----|` has 9 extra tokens.
  - It's super hard to type for humans as well.
- h1 shouldn't be the shortest token. It's used only once.
- Inline Footnotes
- Interlinking native support
  - Etymo? Maybe this should be handled in the compiler level not the syntax level.
- Highlight native support

## Todo Check box

```
[] todo (saves one token)
[ ] todo (compatibility)
[x] done (compatibility)
[~] doing
[!] attention needed
[/] not planned, aborted, etc
[-] in review
```
