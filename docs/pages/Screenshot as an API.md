---
lang: 'en'
slug: '/8B4F7C'
---

- [Letter to Mr. Matt Rickard on 2022-10-03](./../.././docs/pages/Letter%20to%20Mr.%20Matt%20Rickard%20on%202022-10-03.md)

## References

### [Screenshots as the Universal API](https://matt-rickard.ghost.io/screenshots-as-the-universal-api/?ref=Matt+Rickard-newsletter)

- With ML advancements, screenshots are now a universal data format.
  - (decoder) relatively easy to extract...
    - meaning (image-to-text)
    - layout information (object recognition)
    - text ([OCR](./../.././docs/pages/OCR.md))
    - other metadata (formatting, fonts, etc.)
  - (encoder) diffusion-based models like [Stable Diffusion](./../.././docs/pages/Stable%20Diffusion.md) and DALL-E (text-to-image) [Prompt Engineering](./../.././docs/pages/Prompt%20Engineering.md)
- What's good:
  - Easier to parse than highly complex layout formats
    - No need to understand [PDF](./../.././docs/pages/PDF.md) data format
    - No need to hydrate webs for web crawlers
  - Universally available, easily copyable
    - Images aren't the most efficient encoding method for text.
    - But they can be the simplest for humans
    - You can copy objects from photos in the latest [Apple](./../.././docs/pages/Apple.md) iOS 16 update.
- Permissionless.
  - Many applications won't allow you to export data.
  - Screenshots are always available.
  - Related to when [Naver](./../.././docs/pages/Naver.md) Vibe attempted to steal other music players' market cap with Screenshot Recognition technology.
    - [[튜토리얼] 다른 뮤직앱 플레이리스트, 쉽게 가져오는 법](https://www.youtube.com/watch?v=lIs51GVQnDw)
    - ['타사 음원 리스트 수초만에 이동' 네이버 바이브에 OCR 적용 - 전자신문](https://www.etnews.com/20190410000104)
- More complex metadata
  - Look how effective image search is on mobile. Dogs, City, Oceans...
  - Some come from the actual image metadata, and others are inferred with on-device models.
  - Automatically encoding this data in traditional formats like [PDF](./../.././docs/pages/PDF.md) takes much longer.
- I wrote a reply like the following. [Letter to Mr. Matt Rickard on 2022-10-03](./../.././docs/pages/Letter%20to%20Mr.%20Matt%20Rickard%20on%202022-10-03.md)

### [Rethinking the PDF](https://matt-rickard.com/rethinking-the-pdf)

- It's founder, John Warnock (co-founder of Adobe), prototyped a compatibility layer where documents would look and, most importantly, print (!) the same regardless of the computer they were viewed on ([1993 video](https://www.youtube.com/watch?v=qRrpyY8KPWE)). _This is the [PDF](./../.././docs/pages/PDF.md)._
- The "killer app" for [PDF](./../.././docs/pages/PDF.md) was tax returns - the [IRS](./../.././docs/pages/IRS.md) adopted [PDF](./../.././docs/pages/PDF.md) in 1996 because of a rumored frustration with the US Postal Service.
- Things that lack:
  - Enterprise-grade [OCR](./../.././docs/pages/OCR.md) for [PDF](./../.././docs/pages/PDF.md) documents still doesn't exist in 2022, albeit having state-of-the-art computer vision techniques.
  - Interactive and web-enabled forms. Sometimes it saves without the data filled in
  - Slow page loads. Better alternatives: [EPUB](./../.././docs/pages/EPUB.md), [MOBI](./../.././docs/pages/MOBI.md) for texts. For generic use cases, [DjVu](./../.././docs/pages/DjVu.md).

## References

- [PDF processing and analysis with open-source tools](https://www.bitsgalore.org/2021/09/06/pdf-processing-and-analysis-with-open-source-tools)

<head>
  <html lang="en-US"/>
</head>
