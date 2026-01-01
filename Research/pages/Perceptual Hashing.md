---
lang: 'en'
slug: '/E6617C'
---

> Intentionally maximizes the change of hash collision to detect similar images. Used by [[Google]]'s Search by Image feature or [[Apple]]'s CSAM. [Perceptual Hashing](https://matt-rickard.com/perceptual-hashing)

## Algorithms and Their Performances

### [Zauner](https://www.phash.org/docs/pubs/thesis_zauner.pdf)

- Fastest: block-mean-based perceptual image hash.
- Most discriminative: Marr-Hildreth operator-based hash function

## Vulnerabilities

### [It's Not What It Looks Like: Manipulating Perceptual Hashing-based Applications](https://gangw.cs.illinois.edu/PHashing.pdf)

- TLDR: A delicately designed image can fool a perceptual hash application, making it classify two completely different images as the same.
