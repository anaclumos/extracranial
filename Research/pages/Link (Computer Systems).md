---
lang: 'en'
slug: '/FC49CE'
aliases: ['Linker']
---

- in object code, all referenced memories are left empty `0`.
- the linker will later produce an executable with all references combined.

## Linker's Tasks

- [[Symbol (Computer Systems)|Symbol]] Resolution (Function names, Global variables, Static variables ... )
- Memory Relocation (Modify reference addresses to the final memory location)

## Object Files

- Relocatable (`.o`): Code + Data + Metadata
- Executable (`./executable`): Binary that OS loader can read and execute
- Shared Object File (`.so`): Dynamically linked at load & runtime

Linux uses [[ELF]]
