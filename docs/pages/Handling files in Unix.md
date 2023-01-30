---
lang: 'en'
slug: '/CD4F4A'
---

- synchronous system calls
  - `open()`, `read()`, `write()`, `close()`
- `open()` returns a [file descriptor](./../.././docs/pages/File%20Descriptor.md)
- `read()`, `write()`, and `close()` takes [File Descriptor](./../.././docs/pages/File%20Descriptor.md) as an argument
- handling networking in [C++](./../.././docs/pages/C%2B%2B.md) is also using [File Descriptor](./../.././docs/pages/File%20Descriptor.md) for sockets.

## Read

The return value can be:

- -1: error
- 0: EOF
- n: n bytes of data in the first n bytes of the buffer

## Write

The return value can be:

- -1: error
- 0: write again with a new message
- n: n bytes of data in the first n bytes of the buffer are consumed by [OS](./../.././docs/pages/OS.md)

<head>
  <html lang="en-US"/>
</head>
