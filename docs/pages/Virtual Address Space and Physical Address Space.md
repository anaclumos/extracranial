---
lang: 'en'
slug: '/8EA0CD'
---

## Virtual Address Space

- virtual address spaces are shared by all threads in the process, but protected from other processes
- process = program = thread + virtual address space
- thread = register values + stack
- because they are _logical_, they can be up to $2^{64}$ bits for 64 bit system, approximately 16 million terabytes.

## Physical Address Space

- if the memory is big enough, the [OS](./../.././docs/pages/OS.md) uses the physical memory (RAM)
- else, least-recently-used data is dumped to the disk
- only [OS](./../.././docs/pages/OS.md) can access PAS directly!

## VAS and PAS

- broken into "pages", usually 4 KB. Most pages will not be used.
- broken into page-sized block called frames.
- virtual page can be unallocated, uncached (allocated in disk), cached (allocated in memory).
- If we access a page not in physical memory, HW generates a **page fault exception**. Then the [OS](./../.././docs/pages/OS.md) will bring in the page to physical memory (possibly evicting another page)
  - page size should be fairly large
  - pages in main memory should be fully-associative to reduce conflicts and maximize page hits
  - use [OS](./../.././docs/pages/OS.md) instead of HW
  - write-back policy

<head>
  <html lang="en-US"/>
</head>
