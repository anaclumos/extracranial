---
lang: 'en'
slug: '/532A14'
---

## Registers

- Register names can either be uppercase or lowercase, but no mixing.
- 64 bits: `x0`, `x1`, ... , `x30` (e**x**tended)
- 32 bits: `w0`, `w1`, ... , `w30` (**w**ord)
- Immediate values have `#` prefix.
- Brackets `[]` is the value in the memory.
- If `x1` holds `1024`, the following instruction will load `Memory[1024]` to `x0`.

```
LDR x0, [x1]
```

## Special Registers

- Virtual Zero Registers: `xzr`, `wzr`: 0 when read, ignore writes.
- Stack Pointer `sp` errors if not aligned to a multiple of 16 bytes.
- Frame pointer `fp` is an alias of `x29`. Same as `rbp` ([[Base Frame Pointer]])
- Link Register `lr` is an alias of `x30`. Holds the return address used by `ret`.
  - Return addresses does not automatically get pushed to stack.

## Arithmetics

- Always operate between registers and immediate values.
  - Do not operate directly with memory.
- Takes three operands. `OP destination, A, B` means `destination = A OP B`
- Can take flexible operands
  - bitwise operations (`add`, `orr`, `eor`, `mvn`) and `add`, `sub`, and `mov` can do optional shift or rotation of the last element.
  - `add x1, x2, x3, lsl 32` means `x1 = x2 + (x3 << 32)`.
  - `add w1, w2, w3, ror 8` means `w1 = w2 + (w3 >>> 8)`.

## Memory Load and Store

- Unlike `x86`, operations do not need size suffixes. They are inferred.
- Has `Register Pair Load, Store` mode.
	- `ldr x0, x1, [x2]`: `x2 → x0`, `x2+8 → x1`
- `mov` only between registers.
- By default, transfers are between 4 bytes `w` register or 8 bytes `x` registers.
- To change in size, use a suffix for **zero-extended** mode or **sign-extended** mode.
	- 1 byte read: `b` (zero-extend), `sb` (sign-extend)
	- 2 bytes read: `h` (zero-extend), `sh` (sign-extend)
	- `ldrb w0, [x1]` read 1 byte at `Memory[x1]`, zero-extend to 8 bytes, put to `w0`

## Addressing Modes

|Name|Example|Address Used|Side-Effect|
|----|----|----|----|
|Base|`ldr x1, [x2]`|`Memory[x2]`||
|Base + Offset|`ldr x1, [x2, 16]`|`Memory[x2+16]`||
|Pre-indexed|`ldr x1, [x2, 16]!`|`Memory[x2+16]`|`x2 = x2 + 16`, just like `++i` in C|
|Post-indexed|`ldr x1, [x2], 16`|`Memory[x2]`|`x2 = x2 + 16`, just like `i++` in C|
|Base + Register|`ldr x1, [x2, x3]`|`Memory[x2 + x3]`||
|Scaled|`ldr x1, [x2, x3, lsl 2]`|`Memory[x2 + (x3 << 2)]`||
|Sign-Extended|`ldr x1, [x2, w3, sxtw]`|`Memory[x2 + SignExtend(w3)]`||
|Zero-Extended|`ldr x1, [x2, w3, uxtw]`|`Memory[x2 + ZeroExtend(w3)]`||
|Sign-Extended Scaled|`ldr x1, [x2, w3, sxtw 2]`|`Memory[x2 + (SignExtend(w3) << 2)]`||

## Calling Conventions

- **Arguments**. `x0`, ... , `x7` then saved on the stack.
- **Return Value** gets stored in `x0`.
- **Caller-Saved Registers**. `x0` to `x18`.
- **Callee-Saved Registers**. `x19` to `x29`.
- **Callee Saves Link Register** (`lr`, alias of `x30`) if it invokes any procedures.
- **Branch with Link** (`bl`) sets `lr`, alias of `x30` to `PC + 4`.
- **Return** `ret` by default jumps to `Mem[x30]` but can also use `ret x?` for any other registers.

## References

- [usc-cs356/assembly-dojo](https://github.com/usc-cs356/assembly-dojo)