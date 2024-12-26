---
lang: 'en'
slug: '/3C3C5B'
---

### [eBPF File Watching](https://matt-rickard.ghost.io/ebpf-file-watching/?ref=Matt+Rickard-newsletter)

- Periodically polling for changes is potentially slow and intensive.
- `inotify` (kernel subsystem that monitors changes to the filesystem)
  - recursive directory watches (X)
  - Fixed-sized buffer. Can overflow.
  - No native debouncing support.
  - Race conditions.
  - [[API]] issues (no event information.)
- Having a more native File Watcher would be nice.
- [[Matt Rickard]]

<blockquote class="twitter-tweet">

Yeah exactly! Two benefits (1) callbacks closer to the metal and (2) tough to fit all file watching use cases in a single AP] and deliver good performance (not all consumers care about recursive watching, dropping events, etc)

&mdash; Matt Rickard (@mattrickard) [October 7, 2022](https://twitter.com/mattrickard/status/1578459572372901888?ref_src=twsrc%5Etfw)

</blockquote>
