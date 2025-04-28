---
lang: 'en'
slug: '/2E0DDE'
---

First, we must define the key difference between [[Processes and Threads]].
Check the document for that.

In [[Computer Systems]], computers have two modes: the User mode and the Kernel mode.
User mode is the standard mode we know; it does not have direct access to kernels' hardware or data structures.
User mode should make system calls (call OS codes) to open files, create processes, send network packets, etc.
On the other side, the kernel mode is when the OS code runs.
It can make direct file or network access without a system call.
Each thread has a separate kernel stack.
For C and [[C++]], calling library functions like `printf` make a system call under the hood.
We can also set registers to make a system call.
For example, x86 defines `rax` or `eax` as set to 1 as a `write` system call.

Within the same user thread, the control goes into the OS code when a system call is made.
It uses the kernel stack and instructions inside the OS code.
When `iret` is called, we go back to the next instruction for the user code.

There are a few types of exceptions.

- **Traps** are intentional, made by a syscall. It can `iret` back to the user code.
- **Faults** are unintentional, made by a page fault. It can `iret` back to the user code.
- **Aborts** are unintentional, made by memory corruption. It exits.
- **Interrupts** are intentional, prompted by the user. It can `iret` back to the user code.
