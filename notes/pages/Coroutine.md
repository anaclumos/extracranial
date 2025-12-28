---
lang: 'en'
slug: '/859F77'
---

- Generalized subroutine that can suspend execution at designated points and resume later while preserving local state.
- Allows multiple entry and exit points, enabling cooperative multitasking on a single OS thread. Control transfer is explicit (e.g., yield, await).
- Implemented either as stackless state machines or stackful contexts.
- Primary uses
  - non-blocking I/O, asynchronous workflows, generators, pipelines, and incremental computations.
  - Distinguished from threads by cooperative scheduling and shared call stack, from callbacks by linear control flow and retained locals.
  - Language examples: Lua (yield), Python (async def/await, generators), Kotlin (suspend fun), C++20 (co_await), JavaScript (async/await).
