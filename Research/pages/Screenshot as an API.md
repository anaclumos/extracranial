---
lang: 'en'
slug: '/8B4F7C'
---

- [[Letter to Mr. Matt Rickard on 2022-10-03]]

## References

### [Screenshots as the Universal API](https://matt-rickard.ghost.io/screenshots-as-the-universal-api/?ref=Matt+Rickard-newsletter)

- With [[ML]] advancements, screenshots are now a universal data format.
  - (decoder) relatively easy to extract...
    - meaning (image-to-text)
    - layout information (object recognition)
    - text ([[OCR]])
    - other [[metadata]] (formatting, fonts, etc.)
  - (encoder) diffusion-based models like [[Stable Diffusion]] and DALL-E (text-to-image) [[Prompt Engineering]]
- What's good:
  - Easier to parse than highly complex layout formats
    - No need to understand [[PDF]] data format
    - No need to hydrate webs for web crawlers
  - Universally available, easily copyable
    - Images aren't the most efficient encoding method for text.
    - But they can be the simplest for humans
    - You can copy objects from photos in the latest [[Apple]] [[iOS]] 16 update.
- Permissionless.
  - Many applications won't allow you to export data.
  - Screenshots are always available.
  - Related to when [[Naver]] Vibe attempted to steal other music players' market cap with Screenshot Recognition technology.
    - [[튜토리얼] 다른 뮤직앱 플레이리스트, 쉽게 가져오는 법](https://www.youtube.com/watch?v=lIs51GVQnDw)
    - ['타사 음원 리스트 수초만에 이동' 네이버 바이브에 OCR 적용 - 전자신문](https://www.etnews.com/20190410000104)
- More complex [[metadata]]
  - Look how effective image search is on mobile. Dogs, City, Oceans...
  - Some come from the actual image [[metadata]], and others are inferred with [[On-device]] models.
  - Automatically encoding this data in traditional formats like [[PDF]] takes much longer.
- I wrote a reply like the following. [[Letter to Mr. Matt Rickard on 2022-10-03]]

### [Rethinking the PDF](https://matt-rickard.com/rethinking-the-pdf)

- It's founder, John Warnock (co-founder of Adobe), prototyped a compatibility layer where documents would look and, most importantly, print (!) the same regardless of the computer they were viewed on ([1993 video](https://www.youtube.com/watch?v=qRrpyY8KPWE)). _This is the [[PDF]]._
- The "killer app" for [[PDF]] was [[tax]] returns - the [[IRS]] adopted [[PDF]] in 1996 because of a rumored frustration with the [[United States of America|US]] Postal Service.
- Things that lack:
  - Enterprise-grade [[OCR]] for [[PDF]] documents still doesn't exist in 2022, albeit having state-of-the-art computer vision techniques.
  - Interactive and web-enabled forms. Sometimes it saves without the data filled in
  - Slow page loads. Better [[Alternative|alternatives]]. [[EPUB]], [[MOBI]] for texts. For generic use cases, [[DjVu]].

## References

- [PDF processing and analysis with open-source tools](https://www.bitsgalore.org/2021/09/06/pdf-processing-and-analysis-with-open-source-tools)
