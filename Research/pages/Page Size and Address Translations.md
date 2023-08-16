---
lang: 'en'
slug: '/6A6DF1'
---

- pages should be fairly large (KBs) because we pay the access time to get them from the disk
- virtual page number (VPN) to physical page frame number (PPFN) is done by memory management unit (MMU)
- instead of using tags to make them fully-associative (too many tags to compare) we use page tables
- page table is an in-memory data structure for hardware memory management unit to convert from virtual page number to physical page frame number
- like breaking `555-123-4567` to three levels of [[hash map]] `[555] → [123] → [4567]`
- using multi-level page table can save space.
- example: for 32-bit virtual address, 1 GB physical memory, and 4 kB pages how many bits do we need for the frame number? 1GB = 30 physical address bits. 4KB is 12 offset bits. Thus we need 30-12 = 18 bits for the frame number.
- but this multi-level can also be very expensive, because we need to lookup that many times
  - potential solution: cache this! called **[[translation look-aside buffers]]**.
