---
slug: '/A51A6A'
---

# How is [[WebAssembly|WASM]] cross-platform when ASM is not?

## My understanding

- [[WebAssembly]] is like [[Assembly]], except that
  - it runs cross-platform
  - it runs isolated
  - it runs on browsers
- But how is [[WebAssembly|WASM]] _fast_ and cross-platform simultaneously?
  - Does it pack multiple precompiled binary executables for multiple CPU vendors, like [[Apple]]'s Universal Binary?
  - But then whenever a new type of CPU gets announced, they wouldn't be able to run existing WASMs
- [[WebAssembly]]'s runtime environments (RE) are low-level virtual stack machines (akin to JVM or Flash VM)
- Seems like [[WebAssembly|WASM]] is closer to intermediate Java Byte Code instead of the genuinely low-level [[Assembly]].
  - But then, why is it faster?
  - JS Interpreter can skip the parsing
  - It can ship in a much more compact file format

## Question

- Is [[WebAssembly|WASM]] only creating intermediate bytecodes from existing C/C++/Rust codes, just like Java JVM, not compiling to bare metal?
- What is the relationship between [[WebAssembly]] and [[Assembly]]?
- Does [[WebAssembly|WASM]] borrow any idea, technology, or philosophy from [[Assembly]]?

## Stack Overflow

- Posted on Stack Overflow: [How is WebAssembly cross-platform when Assembly is not? - Stack Overflow](https://stackoverflow.com/questions/73790881/how-is-webassembly-cross-platform-when-assembly-is-not)

## References

1. "WebAssembly." _Wikipedia_, Wikimedia Foundation, 9 Sept. 2022, en.wikipedia.org/wiki/WebAssembly. Accessed 20 Sept. 2022.
