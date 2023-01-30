---
date: 2019-11-08
slug: '/37A187'
---

- CSS에서 언어마다 다른 글씨체를 설정하는 방법

I recently came across a Korean font called [Spoqa Han Sans](https://spoqa.github.io/spoqa-han-sans/en-US/). It attracted me due to its simplicity and readability. However, I didn't like its English glyph (based on Noto Sans, which I didn't love to death.)

After a while, I figured out how to define a language range for each font. While importing a font face, we need to add `unicode-range`.

```css
@font-face {
  font-family: 'Spoqa Han Sans';
  /* Omitted */
  unicode-range: U+AC00-D7AF;
}
```

`U+AC00-D7AF`is the Unicode range of Korean glyphs.

## **Can't find `@font-face`?**

We add either of the following statements to define a font in most cases.

```html
<link href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css" rel="stylesheet" type="text/css" />
```

```css
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css);
```

This way has the advantage that I do not need to care about updating the font. It automatically updates when the font is updated at the font server (Of course, this could also be a disadvantage in some cases). But we cannot define `unicode-range` in this case. So rather than importing the scripts like above, we could copy & paste the actual script itself. Access the URL provided in your `@import` statement with `https:` in front of it, and you will find the license of the font and its `@font-face` statements.

Copy this value and add them to your CSS, then define the `unicode-range`. Note that this method will not automatically update your font, but you can always recopy & repaste when the `@font-face` in your `@font-face` gets updated.

<head>
  <html lang="en-US"/>
</head>
