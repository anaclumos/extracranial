---
slug: '/5CC699'
---

# Stories Behind Satori

> by [Shu](https://twitter.com/shuding_/status/1579607964549513217)

The potential candidates for Satori included:

- Canvas-based solution
  - No dynamic things (e.g., layout)
  - No nice API
- Browser-based solution
  - Too slow
- SVG
  - Perfect balance of the two
  - It's fast
  - It's dev-friendly (HTML/CSS)

However, SVG solutions lacked layout support.
Given that [[SVG]] and [[HTML]] + [[CSS]] are alike, we can convert HTML and CSS to SVG.
We can calculate the elements' positions through a layout engine and convert them into SVG markups.

This is already done by an open-source project [facebook/yoga: cross-platform layout engine](https://github.com/facebook/yoga).
Converting it into [[WASM]] will also benefit by targeting [[Web Worker|Web Workers]].
Using a WASM-based approach also unlocked the possibility of running it on edge. [Introducing support for WebAssembly at the Edge – Vercel](https://vercel.com/blog/introducing-support-for-webassembly-at-the-edge).

After simplifying the syntax with [[JSX]] and simple CSS, Shu used [RazrFalcon/resvg: An SVG rendering library](https://github.com/RazrFalcon/resvg) and [yisibl/resvg-js: A high-performance SVG renderer and toolkit](https://github.com/yisibl/resvg-js) to convert the SVG image to [[PNG]].

The Vercel team dogfooded this for a while.
They also added Google Font's `?text=` API, containing a specific subset of the CJK library and rendering things on the fly.
Same applied to emojis.
