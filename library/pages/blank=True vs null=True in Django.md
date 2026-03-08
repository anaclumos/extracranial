---
lang: 'en'
slug: '/E93EEC'
---

- **`null=True`**
  - [[Database]] layer.
  - Column accepts SQL `NULL`.
  - Django represents the absence of a value as [[Python]] `None`.
  - Needed for non-string fields (e.g., `DateField`, `ForeignKey`) to store "no value."
  - Indexes and unique constraints treat `NULL` as distinct from every non-null value.

- **`blank=True`**
  - Validation layer.
  - Model and form validation permit an empty value on save or submit.
  - For strings, the actual value stored is `''` (empty string) unless `null=True` is also set.
  - Has no effect on the SQL schema.

- **Common patterns**
  - String fields: `blank=True, null=False` → empty string stored, forms omit value.
  - Non-string fields: `blank=True, null=True` → [[database]] `NULL` used, validation allows omission.
  - Mixing `null=True, blank=False` rarely useful--[[database]] allows `NULL`, but validation rejects empty input.
  - Leaving both as `False` enforces mandatory data at both [[database]] and validation levels.

- **Key distinctions**
  - `null` controls storage; `blank` controls validation.
  - [[Database]] `NULL` ≠ empty string; choose one to avoid ambiguity.
