---
lang: 'en'
slug: '/A51A6A'
---

- [WebAssembly](./../.././docs/pages/WebAssembly.md) is like [Assembly](./../.././docs/pages/Assembly.md), except that
  - it runs cross-platform
  - it runs isolated
  - it runs on [browsers](./../.././docs/pages/Web%20Browser.md)
- But how is [WASM](./../.././docs/pages/WebAssembly.md) _fast_ and cross-platform simultaneously?
  - Does it pack multiple precompiled binary executables for multiple [CPU](./../.././docs/pages/CPU.md) vendors, like [Apple](./../.././docs/pages/Apple.md)'s Universal Binary?
  - But then, whenever a new type of [CPU](./../.././docs/pages/CPU.md) gets announced, they wouldn't be able to run existing WASMs
- [WebAssembly](./../.././docs/pages/WebAssembly.md)'s runtime environments (RE) are low-level virtual stack machines (akin to [JVM](./../.././docs/pages/JVM.md) or Flash VM)
- Seems like [WASM](./../.././docs/pages/WebAssembly.md) is closer to intermediate [Java](./../.././docs/pages/Java.md) Byte Code instead of the genuinely low-level [Assembly](./../.././docs/pages/Assembly.md).
  - But then, why is it faster?
  - JS Interpreter can skip the parsing
  - It can ship in a much more compact file format
- [WASM](./../.././docs/pages/WebAssembly.md) is just like [Java](./../.././docs/pages/Java.md) Byte-code. [Java](./../.././docs/pages/Java.md) Byte-code is cross-platform when machine code for a real [CPU](./../.././docs/pages/CPU.md) is not. It's input for a JIT compiler that targets whatever real [CPU](./../.././docs/pages/CPU.md). [Peter Cordes](https://stackoverflow.com/users/224132/peter-cordes)
- [WASM](./../.././docs/pages/WebAssembly.md) defines its own \_CPU standards and [Assembly](./../.././docs/pages/Assembly.md). [WebAssembly Core Specification](https://webassembly.github.io/spec/core/bikeshed/).
- To run [WASM](./../.././docs/pages/WebAssembly.md), the [browser](./../.././docs/pages/Web%20Browser.md) must still [compile](./../.././docs/pages/Compiling.md) the [WASM](./../.././docs/pages/WebAssembly.md) code into ASM code when executing; in that way, it is **much** slower than [WASM](./../.././docs/pages/WebAssembly.md).
- However, [WASM](./../.././docs/pages/WebAssembly.md) is designed similarly to ASM. Therefore, [compiling](./../.././docs/pages/Compiling.md) [WASM](./../.././docs/pages/WebAssembly.md) to ASM targeting x86, [ARM](./../.././docs/pages/ARM%20Architecture.md), and RISC-V, is comparably easy, and existing compilers emitting ASM can also emit [WASM](./../.././docs/pages/WebAssembly.md) with a reasonable modification.
- What is the relationship between [WebAssembly](./../.././docs/pages/WebAssembly.md) and [Assembly](./../.././docs/pages/Assembly.md)?
- It is a specific purpose [Assembly](./../.././docs/pages/Assembly.md).
- It's designed with a specific abstract machine that would be expensive to implement in hardware.

## References

1. [WebAssembly](https://en.wikipedia.org/wiki/WebAssembly)
2. [How is WebAssembly cross-platform when Assembly is not? - Stack Overflow](https://stackoverflow.com/questions/73790881/how-is-webassembly-cross-platform-when-assembly-is-not)
