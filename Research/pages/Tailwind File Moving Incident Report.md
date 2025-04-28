---
lang: 'en'
slug: '/9E82C6'
---

![[D348B9.png]]

I moved around files and figured some classes were working but others weren't. Turns out, it was because I moved the files to `lib`, which was not registered in tailwind, but some classes were already shipped in the CSS so it was silently throwing.
