---
lang: 'en'
slug: '/A63CAF'
---

A ULID (Universally Unique Lexicographically Sortable Identifier) is a 128-bit identifier that encodes a timestamp and a randomness component into a 26-character, [[base32]] string. Its design ensures both global uniqueness and monotonic sortability—newer ULIDs will always sort after older ones.

Compared to UUIDs (or GUIDs), ULIDs are more human-friendly (shorter, case-insensitive, and lexicographically sortable), though they rely on a high-quality random generator to avoid collisions.

CUIDs also aim to be collision-resistant and somewhat human-readable but lack strict sortability by time, while NanoIDs focus on short and fast ID generation but trade off predictable lexicographic sorting.

ULIDs strike a balance between readability, time-ordering, and uniqueness, though users should ensure a quality random source to reap the full benefits.
