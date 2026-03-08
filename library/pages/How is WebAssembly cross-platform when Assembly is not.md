---
lang: 'en'
slug: '/A51A6A'
---

- [[WebAssembly]] is like [[Assembly]], except that
  - it runs cross-platform
  - it runs isolated
  - it runs on [[Web Browser|browsers]]
- But how is [[WebAssembly|WASM]] _fast_ and cross-platform simultaneously?
  - Does it pack multiple precompiled binary executables for multiple [[CPU]] vendors, like [[Apple]]'s Universal Binary?
  - But then, whenever a new type of [[CPU]] gets announced, they wouldn't be able to run existing WASMs
- [[WebAssembly]]'s runtime environments (RE) are low-level virtual stack machines (akin to [[JVM]] or Flash VM)
- Seems like [[WebAssembly|WASM]] is closer to intermediate [[Java]] Byte Code instead of the genuinely low-level [[Assembly]].
  - But then, why is it faster?
  - JS Interpreter can skip the parsing
  - It can ship in a much more compact file format
- [[WebAssembly|WASM]] is just like [[Java]] Byte-code. [[Java]] Byte-code is cross-platform when machine code for a real [[CPU]] is not. It's input for a JIT compiler that targets whatever real [[CPU]]. [Peter Cordes](https://stackoverflow.com/users/224132/peter-cordes)
- [[WebAssembly|WASM]] defines its own \_CPU standards and [[Assembly]]. [WebAssembly Core Specification](https://webassembly.github.io/spec/core/bikeshed/).
- To run [[WebAssembly|WASM]], the [[Web Browser|browser]] must still [[Compiling|compile]] the [[WebAssembly|WASM]] code into ASM code when executing; in that way, it is **much** slower than [[WebAssembly|WASM]].
- However, [[WebAssembly|WASM]] is designed similarly to ASM. Therefore, [[compiling]] [[WebAssembly|WASM]] to ASM targeting x86, [[ARM Architecture|ARM]], and RISC-V, is comparably easy, and existing compilers emitting ASM can also emit [[WebAssembly|WASM]] with a reasonable modification.
- What is the relationship between [[WebAssembly]] and [[Assembly]]?
- It is a specific purpose [[Assembly]].
- It's designed with a specific abstract machine that would be expensive to implement in hardware.

## References

1. [WebAssembly](https://en.wikipedia.org/wiki/WebAssembly)
2. [How is WebAssembly cross-platform when Assembly is not? - Stack Overflow](https://stackoverflow.com/questions/73790881/how-is-webassembly-cross-platform-when-assembly-is-not)
