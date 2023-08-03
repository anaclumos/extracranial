---
slug: '/522AED'
---

[[2020-04-26]]

If your Ghost CMS blog using Handlebars theme shows published dates in relative time (like _Published 11 months ago_), you will find a handlebars code like this in your theme file.

```hbs
<time datetime='{{date format='YYYY-MM-DD'}}'>
  {{date published_at timeago='true'}}
</time>
```

## Show exact date

The `date published_at timeago="true"` is responsible for the relative time. Change it to this.

```hbs
<time datetime='{{date format='YYYY-MM-DD'}}'>
  {{date published_at format='MMMM DD, YYYY'}}
</time>
```

This will give something like _September 7, 2000_.

## Show exact time

You can use `[moment.js](https://momentjs.com/)` syntax for fine-tuning the details.

```hbs
<!-- 2000 September 07 9:00:00 PM -->
<time datetime='{{date format='YYYY-MM-DD hh:mm:ss A'}}'>
  {{date published_at format='YYYY MMMM DD hh:mm:ss A'}}
</time>

<!-- 2000 09 07 9:00 PM -->
<time datetime='{{date format='YYYY-MM-DD hh:mm A'}}'>
  {{date published_at format='YYYY MM DD hh:mm A'}}
</time>

<!-- 2000 09 07 21:00 -->
<time datetime='{{date format='YYYY-MM-DD hh:mm'}}'>
  {{date published_at format='YYYY MM DD hh:mm'}}
</time>
```

For months, use `MM` for short notations (like 09) and `MMMM` for more extended notations (like September.) The basic syntax is for hours, minutes, seconds, and AM/PM if you want to display time. For example, I am using the following.

```hbs
<time datetime='{{date format='YYYY-MM-DD h:mm A'}}'>
  {{date published_at format='YYYY/MM/DD h:mm A'}}
</time>
```

## Further [[Readings]]

- [Handlebars Themes, API Reference on Ghost Docs](https://ghost.org/docs/api/v3/handlebars-themes/helpers/date/)
- [Moment.js Docs](https://momentjs.com/docs/)
