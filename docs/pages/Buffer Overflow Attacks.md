---
lang: 'en'
slug: '/BC676B'
---

- [Computer Systems](./../.././docs/pages/Computer%20Systems.md)

## Buffer Overflow

- In C, many strings-related functions do not check the bound.
- It may start to overwrite a fixed-sized array.
- A savvy users may put a long input array, overwriting the return address with desired value.

## Preventing Such Exploits

- Use better functions.
  - `scanf` → `sscanf`
  - `gets` → `getline`
  - `strcpy` → `strncpy`
  - `strcat` → `strncat`
- Use Canary Values
  - Compiler inserts random unique values—canary values—before return address
  - If the canary values are modified, crash.
- Address Space Layout Randomization (ASLR)
  - Compiler randomize where the stack will start.
  - Makes hard to predict the desired return address.
    - Problem: `nop` sleds
    - Prepend as many `nop` instructions as possible before the exploit code
    - Yields a higher chance of an exploit.
- Privilege & Access Control Bits
  - Mark a specific portion of the stack as non-executable.

## Return Oriented Programming

- Use Case: When the stack is marked as non-executable && position randomized.
- Idea: Find useful attack instructions `gadgets` that already exists
  - because they are executable and not randomized in position.

<head>
  <html lang="en-US"/>
</head>
