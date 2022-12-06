---
lang: 'en'
slug: '/5CC699'
---

> by [Shu](https://twitter.com/shuding_/status/1579607964549513217)

The potential candidates for [[Satori]] included:

- [[Canvas (HTML5)|Canvas]]-based solutions lacked dynamic behaviors (e.g., layout) and APIs.
- [[Web Browser]]-based solutions were too slow
- [[SVG (File Format)]]-based solutions were the perfect balance of the two, being fast and dev-friendly ([[HTML]]/[[CSS]])

However, [[SVG (File Format)]] solutions lacked layout support.
Given that [[SVG (File Format)]] and [[HTML]] + [[CSS]] are alike, we can convert [[HTML]] and [[CSS]] to [[SVG (File Format)]].
We can calculate the elements' positions through a layout engine and convert them into [[SVG (File Format)]] markups.

This is already done by an open-source project [facebook/yoga](https://github.com/facebook/yoga).
Converting it into [[WebAssembly|WASM]] will also benefit by targeting [[Web Worker|Web Workers]].
Using a [[WebAssembly|WASM]]-based approach also unlocked the possibility of running it on edge. [Introducing support for WebAssembly at the Edge](https://vercel.com/blog/introducing-support-for-webassembly-at-the-edge).

After simplifying the syntax with [[JSX (File Format)]] and simple [[CSS]], Shu used [RazrFalcon/resvg](https://github.com/RazrFalcon/resvg) and [yisibl/resvg-js](https://github.com/yisibl/resvg-js) to convert the [[SVG (File Format)]] image to [[PNG (File Format)]].

The [[Vercel]] team [[Dogfooding|dogfooded]] this for a while.
They also added [[Google]] [[Font]]'s `?text=` API, containing a specific subset of the [[CJK]] library and rendering things on the fly.
The same applies to [[Emojis|emojis]].
