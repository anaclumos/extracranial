---
slug: '/37A187'
---

[2019-11-08](./../.././docs/journals/2019-11-08.md)

- [CSS에서 언어마다 다른 글씨체를 설정하는 방법](./../.././docs/pages/CSS%EC%97%90%EC%84%9C%20%EC%96%B8%EC%96%B4%EB%A7%88%EB%8B%A4%20%EB%8B%A4%EB%A5%B8%20%EA%B8%80%EC%94%A8%EC%B2%B4%EB%A5%BC%20%EC%84%A4%EC%A0%95%ED%95%98%EB%8A%94%20%EB%B0%A9%EB%B2%95.md)

I recently came across a [Korean](./../.././docs/pages/%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD.md) [font](./../.././docs/pages/Font.md) called [Spoqa Han Sans](https://spoqa.github.io/spoqa-han-sans/en-US/). It attracted me due to its simplicity and readability. However, I didn't like its English glyph (based on Noto Sans, which I didn't love to death.)

After a while, I figured out how to define a language range for each [font](./../.././docs/pages/Font.md). While importing a [font](./../.././docs/pages/Font.md) face, we need to add `unicode-range`.

```css
@font-face {
  font-family: 'Spoqa Han Sans';
  /* Omitted */
  unicode-range: U+AC00-D7AF;
}
```

`U+AC00-D7AF`is the Unicode range of [Korean](./../.././docs/pages/%ED%95%9C%EA%B5%AD%EC%96%B4.md) glyphs.

## **Can't find `@font-face`?**

We add either of the following statements to define a font in most cases.

```html
<link
  href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css"
  rel="stylesheet"
  type="text/css"
/>
```

```css
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css);
```

This way has the advantage that I do not need to care about updating the [font](./../.././docs/pages/Font.md). It automatically updates when the [font](./../.././docs/pages/Font.md) is updated at the [font](./../.././docs/pages/Font.md) server (Of course, this could also be a disadvantage in some cases). But we cannot define `unicode-range` in this case. So rather than importing the scripts like above, we could copy & paste the actual script itself. Access the URL provided in your `@import` statement with `https:` in front of it, and you will find the license of the [font](./../.././docs/pages/Font.md) and its `@font-face` statements.

Copy this value and add them to your CSS, then define the `unicode-range`. Note that this method will not automatically update your [font](./../.././docs/pages/Font.md), but you can always recopy & repaste when the `@font-face` in your `@font-face` gets updated.
