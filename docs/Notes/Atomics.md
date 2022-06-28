---
title: 'Atomics'
slug: '/D7EA90'
---

- Atomics synchronizes memory between Web Workers with `SharedArrayBuffer`.
- Thread-safe.
- No need for data copy between threads.
- Can communicate without event loops. Much faster.

## Notes

- Atomics modules do not have a constructor; it's static.
- Atomics confirms the correctness of operation when multiple threads are sharing the data.
- Use `wait()` and `notify()` for waiting a certain condition (blocking constructs.)

```js
// from MDN
const sab = new SharedArrayBuffer(1024)
const ta = new Uint8Array(sab)

ta[0] // 0
ta[0] = 5 // 5

Atomics.add(ta, 0, 12) // 5
Atomics.load(ta, 0) // 17

Atomics.and(ta, 0, 1) // 17
Atomics.load(ta, 0) // 1

Atomics.compareExchange(ta, 0, 5, 12) // 1
Atomics.load(ta, 0) // 1

Atomics.exchange(ta, 0, 12) // 1
Atomics.load(ta, 0) // 12

Atomics.isLockFree(1) // true
Atomics.isLockFree(2) // true
Atomics.isLockFree(3) // false
Atomics.isLockFree(4) // true

Atomics.or(ta, 0, 1) // 12
Atomics.load(ta, 0) // 13

Atomics.store(ta, 0, 12) // 12

Atomics.sub(ta, 0, 2) // 12
Atomics.load(ta, 0) // 10

Atomics.xor(ta, 0, 1) // 10
Atomics.load(ta, 0) // 11
```

## References

- [javascript - What's the actual use of the Atomics object in ECMAScript? - Stack Overflow](https://stackoverflow.com/questions/45870869/whats-the-actual-use-of-the-atomics-object-in-ecmascript)
- [Atomics - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics)
