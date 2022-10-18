---
lang: 'en'
slug: '/1E9E39'
---

<figure>

![ALT: Add Unicode Private Area Support #161 Merged](../Assets/CD80BA.png)

<figcaption>

Merged! [Add Unicode Private Area Support #161](https://github.com/vercel/satori/pull/161)

</figcaption>
</figure>

## [Introducing OG Image Generation: Fast, dynamic social card images at the Edge - Vercel](https://vercel.com/blog/introducing-vercel-og-image-generation-fast-dynamic-social-card-images)

- _This approach is 5x faster than existing solutions by using [[Vercel]] Edge Functions, [[WebAssembly]], and a brand new core library for converting [[HTML]]/[[CSS]] into SVGs._
- _We released [og-image.vercel.app](https://og-image.vercel.app/) four years ago to enable developers to dynamically generate [open graph](https://ogp.me/) (OG) images by taking a screenshot of an [[HTML]] page inside of a Serverless Function_
- Indeed, I also used this for a while. [anaclumos/cho-sh-og-image: Open Graph Image as a Service](https://github.com/anaclumos/cho-sh-og-image). [[Open Graph Image as a Service]]

### Problems

- _Difficult: This solution required launching Chromium in a Serverless Function and taking a screenshot of the given [[HTML]] page with Puppeteer. Setting up these tools was hard to implement and often led to errors_
- _Slow: Chromium needs to be compressed to fit inside a Serverless Function and then decompressed on a cold boot; it's very slow (~4 seconds on average). This can result in slow or broken social card images_
- _Expensive: Spinning up an entire browser to take a screenshot was not efficient. This led to large Function sizes, which could be expensive and waste computing_

* _Large: Chromium has continued growing in the past four years. Today, it's [too large to fit in a Serverless Function](https://github.com/vercel/og-image/issues/148)_

### @vercel/og

- Easy: No headless browser is needed. Using [[Vercel]] OG, you can define your images using [[HTML]] and [[CSS]] and automatically generate dynamic images from the generated SVGs
- Affordable: [[Vercel]] Edge Functions are ~160x cheaper than running Chromium in a Serverless Function. Further, generated images can be cached and stored at the Edge
- Fast: [[Vercel]] OG (500KB) is 100x more lightweight than Chromium + Puppeteer (50MB). 5x faster in P99 TTFB (4.96s → 0.99s) and 5.3x faster in P90 (4s → 0.75s).

### Features

- Basic [[CSS]] layout, styling, and typography.
- Works with any framework or frontend application
- [[Font]] and [[Emojis]] Subsets from Google Fonts and other CDNs
- [[Tailwind]] [[CSS]] with the `tw` prop
- Handles Cache automatically

### Engine

- The core engine, [Satori](https://github.com/vercel/satori), can be used in modern browsers, Node.js, and [[Web Worker|Web Workers]]. Building on top of the core engine, [[Vercel]] OG can be used inside Edge environments through [[WebAssembly]] to create social card images easily.

### Backstory by [Shu](https://twitter.com/shuding_/status/1579607964549513217)

- [[Stories Behind Satori]]
