---
lang: 'en'
slug: '/9B00D1'
---

## [Improving Firefox responsiveness on macOS - Mozilla Hacks - the Web developer blog](https://hacks.mozilla.org/2022/10/improving-firefox-responsiveness-on-macos/)

- _This improvement was achieved via a slight change in how locking is implemented within Firefox's memory allocator._
- _Putting a thread to sleep has significant performance implications and, thus, is not always the best option._
- _it might be advantageous to let a thread spin briefly if the lock it's trying to acquire is only held for a brief period._
- _It can result in higher performance and lower power consumption as spinning costs less than sleeping._
- _As you might have guessed by now, `OSSpinLock` offered excellent performance on a lightly loaded system but behaved poorly as the load ramped up._
- _This problem with `OSSpinLock` was [known](https://mjtsai.com/blog/2015/12/16/osspinlock-is-unsafe/) within [Apple](https://lists.swift.org/pipermail/swift-dev/Week-of-Mon-20151214/000372.html) hence its deprecation_
- _Enter [`os_unfair_lock`](https://developer.apple.com/documentation/os/os_unfair_lock), [Apple](./../.././docs/pages/Apple.md)'s official replacement for `OSSpinLock`. If you still use `OSSpinLock`, you'll get explicit warnings to use it instead_
- _So I used it, but the results were terrible. Performance in some of our automated tests [degraded by as much as 30%](https://bugzilla.mozilla.org/show_bug.cgi?id=1774458)._
- _As it turns out, `os_unfair_lock` doesn't spin on contention; it makes the calling thread [sleep right away when it finds a contended lock](https://github.com/apple/darwin-libplatform/blob/215b09856ab5765b7462a91be7076183076600df/src/os/lock.c#L536)_
- _The function is [`os_unfair_lock_with_options()`](https://searchfox.org/mozilla-central/rev/6ec440e105c2b75d5cae9d34f957a2f85a106d54/memory/build/Mutex.h#22-34) and the options I used are `OS_UNFAIR_LOCK_DATA_SYNCHRONIZATION` and `OS_UNFAIR_LOCK_ADAPTIVE_SPIN`_
- _The latter asks the kernel to use kernel-space adaptive spinning, and the former prevents it from spawning additional threads in the thread pools used by [Apple](./../.././docs/pages/Apple.md)'s libraries_
- _Did they work? Yes! Performance on lightly loaded systems was about the same as `OSSpinLock`, but on loaded ones, they provided massively better responsiveness_
- _As an intermediate solution, I initially fell back to `OSSpinLock` on older systems. Later I managed to get rid of it for good by relying on `os_unfair_lock` plus [manual spinning in user space](https://bugzilla.mozilla.org/show_bug.cgi?id=1784018)_

<head>
  <html lang="en-US"/>
</head>
