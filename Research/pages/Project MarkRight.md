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

First line of the docs should be a title.

- Pure MarkRight

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

Image Caption should be easy, with large image, side by side image, etc

or should we go completely MD superset only?

## case study

- [neon.com](https://neon.com/docs/introduction/architecture-overview 'Neon architecture - Neon Docs'): why do chatgpt render it like this?
