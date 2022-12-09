---
lang: 'en'
slug: '/F03966'
---

A heap is a region of memory that is dynamically allocated during runtime. This means that a heap is used to store objects created at runtime instead of objects stored on the stack, which are created and destroyed automatically as the program runs. Heaps are often used to store things that need to be accessed by multiple parts of a program or entities that need to be allocated and freed at different points in time.

For implementing a heap, we must consider the following.

- Speed: how fast is the heap?
- Memory Utilization: how concise is the stored memory?
- [[DX]]

## Dynamic Memory Allocation in C

There are two types: `malloc` and `calloc`.
The main difference between `malloc` and `calloc` is that `malloc` allocates a memory block with a specified size.
In contrast, `calloc` allocates a block of memory for an array of elements and initializes each factor to zero.
`calloc` also takes the number of elements to assign as a parameter.

On the other hand, when releasing the memory, we can use `free(void *ptr)`

To indicate the end of the heap, the kernel maintains a `brk` pointer.
`brk` pointer will hold the virtual address of the end of the heap.
In Linux, the `brk` pointer will be adjusted with `sbrk(intptr_t increment)`

At startup, the C-library will allocate a default size of the heap.
If there is not enough space, we must call `sbrk` to increase the heap.

```c
void *heap;
heap = sbrk(1 << 20); // 1 MB, depends on compiler & system
```

## Allocators

C and C++ use explicit allocators, which the developers must explicitly free the memory when done using them.
On the other hand, Java, Python, or other higher-level languages use implicit allocators, which this memory free-ing is done automatically.
This implicit allocators are also known as garbage collection.

Allocators must satisfy the following:

- can handle random request sequences
- response immediately (no delay for optimizations)
- only use heap
- align blocks, similar to [[Structs and Unions]]
- cannot move blocks, because the user holds the pointer to this block!

At the same time, we must maximize:

- throughput (as fast as possible)
- memory utilization (as compact as possible)

Unfortunately, these two are facing opposite sides.
If we always call `sbrk` to increase the heap, that will be very fast because we don't need to search for available free blocks, but it will have terrible memory utilization.

## Fragmentation

When each other byte is occupied, it will have terrible space utilization.
This is **fragmentation**.
There are two kinds:

- External. Fragmentation between blocks.
- Internal. Fragmentation inside a block.

## Managing Free Blocks

Allocated blocks are developer's concern.
Implicit free lists scan through all blocks possible to find a space to allocate, whereas explicit free lists only maintain the free blocks as a list.
An implicit free list must have a block with the size of the biggest data type, 4 bytes for 32-bit system.
It also contains header and footer with multiple of that size, with the dirty bit.
We can also **coalesce** a block if two blocks are free next to each other, immediately after freeing the block and periodically to housekeep our heap.
Also, we can split when placing, if the free block we found is sufficient to place both the user's request and another free block.
Explicit free list require a doubly linked list to manage this data structure.

## Placements

- first fit: the first available
- next fit: start scanning from the last allocation made
- best fit: the smallest free block that can hold the request

## Segregated Lists

- keep a separate free list based on the size of free blocks
- pick the best list based on the size requested

## Managed Pointers

There is an intermediary object holding counters of the references. If the reference reach zero, the garbage collector will deallocate the object.
