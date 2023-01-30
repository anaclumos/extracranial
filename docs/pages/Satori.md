---
lang: 'en'
slug: '/1E9E39'
---

<figure>


<figure>

![Add Unicode Private Area Support #161 Merged](../assets/CD80BA.png)


</figure>

<figcaption>

Merged! [Add Unicode Private Area Support #161](https://github.com/vercel/satori/pull/161)

</figcaption>
</figure>

## Resources

- [Create OG images for your blog with Next.js](https://scastiel.dev/create-og-images-for-your-blog-with-nextjs)

## [Introducing OG Image Generation: Fast, dynamic social card images at the Edge - Vercel](https://vercel.com/blog/introducing-vercel-og-image-generation-fast-dynamic-social-card-images)

- _This approach is 5x faster than existing solutions by using [Vercel](./../.././docs/pages/Vercel.md) [Edge](./../.././docs/pages/Edge.md) Functions, [WebAssembly](./../.././docs/pages/WebAssembly.md), and a brand new core library for converting [HTML](./../.././docs/pages/HTML.md)/[CSS](./../.././docs/pages/CSS.md) into SVGs._
- _We released [og-image.vercel.app](https://og-image.vercel.app/) four years ago to enable developers to dynamically generate [open graph](https://ogp.me/) (OG) images by taking a screenshot of an [HTML](./../.././docs/pages/HTML.md) page inside of a Serverless Function_
- Indeed, I also used this for a while. [anaclumos/cho-sh-og-image: Open Graph Image as a Service](https://github.com/anaclumos/cho-sh-og-image). [Open Graph Image as a Service](./../.././docs/pages/Open%20Graph%20Image%20as%20a%20Service.md)

### Problems

- _Difficult: This solution required launching [Chromium](./../.././docs/pages/Chromium.md) in a Serverless Function and taking a screenshot of the given [HTML](./../.././docs/pages/HTML.md) page with Puppeteer. Setting up these tools was hard to implement and often led to errors_
- _Slow: [Chromium](./../.././docs/pages/Chromium.md) needs to be compressed to fit inside a Serverless Function and then decompressed on a cold boot; it's very slow (~4 seconds on average). This can result in slow or broken social card images_
- _Expensive: Spinning up an entire [browser](./../.././docs/pages/Web%20Browser.md) to take a screenshot was not efficient. This led to large Function sizes, which could be expensive and waste computing_

* _Large: [Chromium](./../.././docs/pages/Chromium.md) has continued growing in the past four years. Today, it's [too large to fit in a Serverless Function](https://github.com/vercel/og-image/issues/148)_

### @vercel/og

- Easy: No headless [browser](./../.././docs/pages/Web%20Browser.md) is needed. Using [Vercel](./../.././docs/pages/Vercel.md) OG, you can define your images using [HTML](./../.././docs/pages/HTML.md) and [CSS](./../.././docs/pages/CSS.md) and automatically generate dynamic images from the generated SVGs
- Affordable: [Vercel](./../.././docs/pages/Vercel.md) [Edge](./../.././docs/pages/Edge.md) Functions are ~160x cheaper than running [Chromium](./../.././docs/pages/Chromium.md) in a Serverless Function. Further, generated images can be cached and stored at the [Edge](./../.././docs/pages/Edge.md)
- Fast: [Vercel](./../.././docs/pages/Vercel.md) OG (500KB) is 100x more lightweight than [Chromium](./../.././docs/pages/Chromium.md) + Puppeteer (50MB). 5x faster in P99 TTFB (4.96s → 0.99s) and 5.3x faster in P90 (4s → 0.75s).

### Features

- Basic [CSS](./../.././docs/pages/CSS.md) layout, styling, and typography.
- Works with any framework or [frontend](./../.././docs/pages/Front-end.md) application
- [Font](./../.././docs/pages/Font.md) and [Emojis](./../.././docs/pages/Emojis.md) Subsets from Google Fonts and other CDNs
- [Tailwind](./../.././docs/pages/Tailwind.md) [CSS](./../.././docs/pages/CSS.md) with the `tw` prop
- Handles Cache automatically

### Engine

- The core engine, [Satori](https://github.com/vercel/satori), can be used in modern [browsers](./../.././docs/pages/Web%20Browser.md), Node.js, and [Web Workers](./../.././docs/pages/Web%20Worker.md). Building on top of the core engine, [Vercel](./../.././docs/pages/Vercel.md) OG can be used inside [Edge](./../.././docs/pages/Edge.md) environments through [WebAssembly](./../.././docs/pages/WebAssembly.md) to create social card images easily.

### Backstory by [Shu](https://twitter.com/shuding_/status/1579607964549513217)

- [Stories Behind Satori](./../.././docs/pages/Stories%20Behind%20Satori.md)

<head>
  <html lang="en-US"/>
</head>
