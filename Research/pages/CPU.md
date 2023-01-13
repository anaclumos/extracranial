---
lang: 'en'
slug: '/F2202E'
---

> A central processing unit, also called a central processor, main processor, or just processor, is the electronic circuitry that executes instructions comprising a computer program. The CPU performs basic arithmetic, logic, controlling, and input/output operations specified by the instructions in the program. [CPU](https://en.wikipedia.org/wiki/Central_processing_unit)

### [What Happens When A CPU Starts](https://lateblt.tripod.com/bit68.txt)

- Generally, when a CPU chip first receives power, it must be reset by receiving a pulse on its RESET (or RST) pin
- the Z80 CPU immediately begins executing code from memory address 0000 when it is reset. This is a relatively simple case
- By contrast, the 6502, another popular classic CPU, has a two-byte reset vector located at memory addresses FFFC and FFFD (in hexadecimal). This means that the ROM in a 6502-based computer _must_ be at the top of the memory space. The two bytes are stored backwards, and thus, if FFFC contains 00 and FFFD contains B0, then the 6502 will jump to memory location B000 and start executing instructions there
- There are two advantages to this system: First of all, it gives the computer engineer some control over where the CPU begins executing ROM code, and secondly, it leaves the bottom area of the memory space (beginning at address 0000) free for RAM
- The Z80's system, although simpler, creates a "hole" in the memory, because the bottom of the memory space is used by ROM and therefore you cannot use the beginning of the memory space for normal RAM work
