---
lang: 'en'
slug: '/73FAAA'
---

## `.optional()`

- Type: `T | undefined`
- Accepts: `undefined`, missing key in objects, any value passing the base schema `T`
- Rejects: `null` (unless separately allowed)
- Shorthand for "allow the value to be absent"

## `.nullable()`

- Type: `T | null`
- Accepts: explicit `null`, any value passing `T`
- Rejects: `undefined`, missing key
- Purpose: value must be supplied but may be `null`

## `.nullish()`

- Type: `T | null | undefined`
- Accepts: `null`, `undefined`, missing key, any value passing `T`
- Internally the same as `.nullable().optional()`

## Interaction summary

- Missing key → allowed only by `.optional()` or `.nullish()`
- Explicit `null` → allowed only by `.nullable()` or `.nullish()`
- Both `null` and missing/`undefined` → `.nullish()`

## Default values

- `.default(val)` inserts `val` when the value is `undefined`; it does not act on `null`, so combine with `.nullable()` or `.nullish()` according to needs

## Object helpers

- `z.object({...}).partial()` marks every key as `.optional()` (still disallows `null`)
- `z.object({...}).passthrough()` or `.strict()` do not change nullish handling; only the property schema modifiers above do
