---
lang: 'en'
slug: '/E0B48F'
---

## Definition

- Not `#include`ing in header files.
- Example: `class Ship* ship;`.
- Instead, telling the compiler _hey, I promise, there will be this class definition!_
- This only works when referring to a pointer or reference
  - When there is no need to construct
- Calling function requires `#include`.
- Virtual functions are irrelevant with a forward declaration.

## Benefits

- Compile time improvements
- Resolves circular dependency
- `#pragma once` solves circular dependency but does not resolve the order dependency.

## Rule of Thumb

- avoid including headers in headers.
- use pointers of a class.
- include inside cpp.
