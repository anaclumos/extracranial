---
lang: 'en'
slug: '/BC676B'
---

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
- Privilege & Access Control Bits
	- 