---
lang: 'en'
slug: '/9AF47D'
---

## Structs

- In [[Computer Systems]], structs are collections of heterogeneous data
  - laid out in consecutive memory locations (used paddings to ensure alignment)
  - reordering can reduce size!

```cpp
struct node {
  short w;
  char *p;
};
```

... turns into ...

```
0   2 paddings! 8
|w|w|-|-|-|-|-|-|p|p|p|p|p|p|p|p|
```

### Paddings

- Elements will be padded to match the size.
- If the struct has `int`, 4 bytes in size, it needs to start at a multiple of 4.

## Unions

- Union allows elements to read/write in the same memory.
- All elements start at offset 0.
- The size of the union is the biggest member.
- Elements must be plain old data or at least default constructible.
- Bytes can be stored in reversed order depending on the endianness.
