---
lang: 'en'
slug: '/60C4E1'
aliases: ['WASM']
---

> WebAssembly (sometimes abbreviated Wasm) defines a portable binary-code format and a corresponding text format for executable programs and software interfaces for facilitating interactions between such programs and their host environment. [WebAssembly](https://en.wikipedia.org/wiki/WebAssembly)

- [Introduction to WebAssembly • rsms](https://rsms.me/wasm-intro)

## Interesting Implementations

- [[Satori]]
- [paradust7/minetest-wasm: Experimental Minetest build for WebAssembly/Emscripten](https://github.com/paradust7/minetest-wasm)

### [SQLite Wasm in the browser backed by the Origin Private File System - Chrome Developers](https://developer.chrome.com/blog/sqlite-wasm-in-the-browser-backed-by-the-origin-private-file-system/)

- SQLite based on Web Assembly
- Binding a low-level sqlite3 API which is as close to the C one as feasible in terms of usage.
- A higher-level object-oriented API, more akin to [sql. js](https://github.com/sql-js/sql.js/) and [Node. Js-style implementations](https://www.npmjs.com/package/sqlite3) speak directly to the low-level API. This API must be used from the same thread as the low-level API.
- A Worker-based API that speaks to the previous APIs via Worker messages. This one is intended for use in the main thread, with the lower-level APIs installed in a Worker thread and talking to them via Worker messages.
- A Promise-based variant of the Worker API that entirely hides the cross-thread communication aspects from the user.
- Support persistent client-side storage using JavaScript APIs, including the Origin Private File System (OPFS).
