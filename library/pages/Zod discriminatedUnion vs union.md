---
lang: 'en'
slug: '/59104C'
---

## Definition

- `z.union([A, B, …])` Generic union of unrelated schemas. ([DEV Community](https://dev.to/shaharke/zod-zero-to-hero-chapter-4-513c 'Union Types - DEV Community')).
- z.discriminatedUnion("key", [A, B, …])` Union of object schemas that all contain the literal-valued property `key`. ([GitHub](https://zod.dev/?id=discriminated-unions&utm_source=chatgpt.com 'Discriminated unions - Zod'))

## Input constraints

- `union` accepts any Zod types (objects, primitives, arrays, effects).
- `discriminatedUnion` accepts only `ZodObject`s whose `key` field is a `z.literal(...)` unique to each branch.

## Runtime algorithm

- `union` iterates through every branch until one succeeds; worst-case O(n) full validation of every branch.
- `discriminatedUnion` reads the discriminator value once, selects the matching branch, validates only that branch; constant-time dispatch, faster on large unions. ([DEV Community](https://dev.to/shaharke/zod-zero-to-hero-chapter-4-513c 'Union Types - DEV Community'))

## Error reporting

- `union` returns aggregated branch errors; messages can be verbose and ambiguous.
- `discriminatedUnion` reports "invalid discriminator" or branch-specific errors, giving clearer feedback.

## Static inference

- `union` narrows to `A | B | …`.
- `discriminatedUnion` also gives safe narrowing when you switch on the discriminator key, mirroring TypeScript's discriminated-union narrowing.

## Edge cases

- Overlapping discriminant literals or missing discriminator property cause schema-creation errors in `discriminatedUnion`; `union` has no such guard.
- Nested `discriminatedUnion` requires `.options` to merge when building larger unions; `union` nests without helpers.

## When to choose

- Use `discriminatedUnion` for object variants distinguished by a tag field--higher performance, simpler errors, safer exhaustiveness checks.
- Use `union` for heterogeneous unions, non-object branches, or when no single discriminator exists.
