---
lang: 'en'
slug: '/9B00D1'
aliases: ['파이어폭스', '불여우', 'FF', '🔥🦊', '❤🔥']
---

## Some quick hacks

### userContent & userChrome

- https://github.com/anaclumos/firefox

### Make [[Web Browser|Browser]] Tab Bar More Compact

- `about:config`
- `browser.uidensity`: 0 is the default, 1 is compact, 2 is touch (sparser)

## [Improving Firefox responsiveness on macOS - Mozilla Hacks - the Web developer blog](https://hacks.mozilla.org/2022/10/improving-firefox-responsiveness-on-macos/)

- This improvement was achieved via a slight change in how locking is implemented within Firefox's memory allocator.
- Putting a thread to sleep has significant performance implications and, thus, is not always the best option.
- it might be advantageous to let a thread spin briefly if the lock it's trying to acquire is only held briefly.
- It can result in higher performance and lower power consumption, as spinning costs less than sleeping.
- As you might have guessed by now, `OSSpinLock` offered excellent performance on a lightly loaded system but behaved poorly as the load ramped up.
- This problem with `OSSpinLock` was [known](https://mjtsai.com/blog/2015/12/16/osspinlock-is-unsafe/) within [Apple](https://lists.swift.org/pipermail/swift-dev/Week-of-Mon-20151214/000372.html) hence its deprecation
- Enter [`osunfairlock`](https://developer.apple.com/documentation/os/osunfairlock), [[Apple]]'s official replacement for `OSSpinLock`. If you still use `OSSpinLock`, you'll get explicit warnings to use it instead
- So I used it, but the results were terrible. Performance in some of our automated tests [degraded by as much as 30%](https://bugzilla.mozilla.org/showbug.cgi?id=1774458).
- As it turns out, `osunfairlock` doesn't spin on contention; it makes the calling thread [sleep right away when it finds a contended lock](https://github.com/apple/darwin-libplatform/blob/215b09856ab5765b7462a91be7076183076600df/src/os/lock.c#L536)
- The function is [`osunfairlockwithoptions()`](https://searchfox.org/mozilla-central/rev/6ec440e105c2b75d5cae9d34f957a2f85a106d54/memory/build/Mutex.h#22-34) and the options I used are `OSUNFAIRLOCKDATASYNCHRONIZATION` and `OSUNFAIRLOCKADAPTIVESPIN`
- The latter asks the kernel to use kernel-space adaptive spinning, and the former prevents it from spawning additional threads in the thread pools used by [[Apple]]'s libraries
- Did they work? Yes! Performance on lightly loaded systems was about the same as `OSSpinLock`, but on loaded ones, they provided massively better responsiveness
- I initially fell back to `OSSpinLock` as an intermediate solution on older systems. Later I managed to get rid of it for good by relying on `osunfairlock` plus [manual spinning in user space](https://bugzilla.mozilla.org/showbug.cgi?id=1784018)
