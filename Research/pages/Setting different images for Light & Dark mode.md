---
lang: 'en'
slug: '/519D85'
---

[[Lesser Known Trick]]

## One way of doing it (wrong)

- Using `#gh-dark-mode-only` for [[GitHub]]

```
![Thumbnail.png](/thumbnail.svg#gh-light-mode-only)
![Thumbnail.png](/thumbnail-white.svg#gh-dark-mode-only)
```

- This does not scale and does not work outside of [[GitHub]]

## The proper way

Using `preferred color scheme` CSS property and [[HTML]] Picture `srcset` property.

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

![[901660.mp4]]
