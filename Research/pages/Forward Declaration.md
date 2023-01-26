---
lang: 'en'
slug: '/E0B48F'
---

## Abstract

- In [[Graphics]]
- Reduce the number of cpp files that get recompiled when you touch a header file.
- This happens by moving the `#include` from the header file to the source file.
- The cpp file still gets recompiled when you touch the header file, but the circular dependency is broken.

## Definition

- Not `#include`ing in header files.
- Example: `class Ship* ship;`.
- Instead, telling the compiler _hey, I promise, there will be this class definition!_
- This only works when referring to a pointer or reference
  - When there is no need to construct
- Calling function requires `#include`.
- Virtual functions are irrelevant with a forward declaration.

## Benefits

- [[Compiling|Compile]] time improvements
- Resolves circular dependency
- `#pragma once` solves circular dependency but does not resolve the order dependency.

## Rule of Thumb

- avoid including headers in headers.
- use pointers of a class.
- include inside cpp.
