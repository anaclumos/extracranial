---
lang: 'en'
slug: '/60C4E1'
aliases: ['WASM']
---

> WebAssembly (sometimes abbreviated Wasm) defines a portable binary-code format and a corresponding text format for executable programs and software interfaces for facilitating interactions between such programs and their host environment. [WebAssembly](https://en.wikipedia.org/wiki/WebAssembly)

- [Introduction to WebAssembly • rsms](https://rsms.me/wasm-intro)

[[Assembly]] languages in general consists of simple and atomic operations that the processor can follow.
For example, let's consider the following `add.c` C code.

```c
#include <stdio.h>

int add(int x, int y) { return x + y; }

int main() {
	printf("Hello World\n");
	printf("1 + 2 = %d \n", add(1, 2));
	return 0;
}
```

```bash
❯ gcc add.c
❯ ./a.out
Hello World
1 + 2 = 3
```

It is a very straightforward C code that returns the sum of the two integers provided as input.
We can convert this C code into [[WebAssembly]] with a build tool called [Emscripten](https://emscripten.org/index.html).
After running the following command, we can get the WASM version of the function `int add(int x, int y)`.

```bash
emcc add.c -o index.html
```

![[8692F9.png]]

We can now create a local server to test this example.

```bash
❯ npx serve .

   ┌───────────────────────────────────────────────────┐
   │                                                   │
   │   Serving!                                        │
   │                                                   │
   │   - Local:            http://localhost:3000       │
   │   - On Your Network:  http://192.168.8.100:3000   │
   │                                                   │
   │   Copied local address to clipboard!              │
   │                                                   │
   └───────────────────────────────────────────────────┘

```

And we can confirm that it is working as expected.

![[56155E.png]]

## Interesting Implementations

- [[Satori]]
- [paradust7/minetest-wasm: Experimental Minetest build for WebAssembly/Emscripten](https://github.com/paradust7/minetest-wasm)

### [SQLite Wasm in the browser backed by the Origin Private File System - Chrome Developers](https://developer.chrome.com/blog/sqlite-wasm-in-the-browser-backed-by-the-origin-private-file-system/)

- SQLite based on Web Assembly
- Binding a low-level sqlite3 API which is as close to the C one as feasible in terms of usage.
- A higher-level object-oriented API, more akin to [sql. js](https://github.com/sql-js/sql.js/) and [Node. Js-style implementations](https://www.npmjs.com/package/sqlite3) speak directly to the low-level API. This API must be used from the same thread as the low-level API.
- A Worker-based API that speaks to the previous APIs via Worker messages. This one is intended for use in the main thread, with the lower-level APIs installed in a [[Web Worker|Worker thread]] and talking to them via Worker messages.
- A Promise-based variant of the Worker API that entirely hides the cross-thread communication aspects from the user.
- Support persistent client-side storage using JavaScript APIs, including the Origin Private File System (OPFS).
