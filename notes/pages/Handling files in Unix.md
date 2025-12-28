---
lang: 'en'
slug: '/CD4F4A'
---

- synchronous system calls
  - `open()`, `read()`, `write()`, `close()`
- `open()` returns a [[file descriptor]]
- `read()`, `write()`, and `close()` takes [[File Descriptor]] as an argument
- handling networking in [[C++]] is also using [[File Descriptor]] for sockets.

## Read

The return value can be:

- -1: error
- 0: EOF
- n: n bytes of data in the first n bytes of the buffer

## Write

The return value can be:

- -1: error
- 0: write again with a new message
- n: n bytes of data in the first n bytes of the buffer are consumed by [[OS]]
