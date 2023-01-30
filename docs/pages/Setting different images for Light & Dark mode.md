---
lang: 'en'
slug: '/519D85'
---

## One way of doing it (wrong)

- Using `#gh-dark-mode-only` for [GitHub](./../.././docs/pages/GitHub.md)

```

<figure>

![Thumbnail.png](/thumbnail.svg#gh-light-mode-only)


</figure>

<figure>

![Thumbnail.png](/thumbnail-white.svg#gh-dark-mode-only)


</figure>
```

- This does not scale and does not work outside of [GitHub](./../.././docs/pages/GitHub.md)

## The proper way

Using `preferred color scheme` CSS property and [HTML](./../.././docs/pages/HTML.md) Picture `srcset` property.

```html
<a title="Simple Analytics" href="" referrerpolicy="origin" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://simpleanalyticsbadges.com/cho.sh?mode=dark" />
    <img
      src="https://simpleanalyticsbadges.com/cho.sh"
      loading="lazy"
      referrerpolicy="no-referrer"
      crossorigin="anonymous"
    />
  </picture>
</a>
```


<figure>

![901660.gif](./../.././docs/assets/901660.gif)


</figure>

<head>
  <html lang="en-US"/>
</head>
