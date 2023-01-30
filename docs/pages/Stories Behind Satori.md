---
lang: 'en'
slug: '/5CC699'
---

> by [Shu](https://twitter.com/shuding_/status/1579607964549513217)

The potential candidates for [Satori](./../.././docs/pages/Satori.md) included:

- [Canvas](./../.././docs/pages/Canvas%20%28HTML5%29.md)-based solutions lacked dynamic behaviors (e.g., layout) and APIs.
- [Web Browser](./../.././docs/pages/Web%20Browser.md)-based solutions were too slow
- [SVG](./../.././docs/pages/SVG.md)-based solutions were the perfect balance of the two, being fast and dev-friendly ([HTML](./../.././docs/pages/HTML.md)/[CSS](./../.././docs/pages/CSS.md))

However, [SVG](./../.././docs/pages/SVG.md) solutions lacked layout support.
Given that [SVG](./../.././docs/pages/SVG.md) and [HTML](./../.././docs/pages/HTML.md) + [CSS](./../.././docs/pages/CSS.md) are alike, we can convert [HTML](./../.././docs/pages/HTML.md) and [CSS](./../.././docs/pages/CSS.md) to [SVG](./../.././docs/pages/SVG.md).
We can calculate the elements' positions through a layout engine and convert them into [SVG](./../.././docs/pages/SVG.md) markups.

This is already done by an open-source project [facebook/yoga](https://github.com/facebook/yoga).
Converting it into [WASM](./../.././docs/pages/WebAssembly.md) will also benefit by targeting [Web Workers](./../.././docs/pages/Web%20Worker.md).
Using a [WASM](./../.././docs/pages/WebAssembly.md)-based approach also unlocked the possibility of running it on edge. [Introducing support for WebAssembly at the Edge](https://vercel.com/blog/introducing-support-for-webassembly-at-the-edge).

After simplifying the syntax with [JSX](./../.././docs/pages/JSX.md) and simple [CSS](./../.././docs/pages/CSS.md), Shu used [RazrFalcon/resvg](https://github.com/RazrFalcon/resvg) and [yisibl/resvg-js](https://github.com/yisibl/resvg-js) to convert the [SVG](./../.././docs/pages/SVG.md) image to [PNG](./../.././docs/pages/PNG.md).

The [Vercel](./../.././docs/pages/Vercel.md) team [dogfooded](./../.././docs/pages/Dogfooding.md) this for a while.
They also added [Google](./../.././docs/pages/Google.md) [Font](./../.././docs/pages/Font.md)'s `?text=` API, containing a specific subset of the [CJK](./../.././docs/pages/CJK.md) library and rendering things on the fly.
The same applies to [emojis](./../.././docs/pages/Emojis.md).

<head>
  <html lang="en-US"/>
</head>
