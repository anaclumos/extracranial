---
date: 2019-11-07
slug: '/0242A0'
---

- [[Ghost에서 외부 링크를 새로운 창에서 여는 방법]]

Ghost opens every external URL on the same page by default. This behavior distracts the user and increases the bounce rate. While it seems that there is no built-in option on Ghost to open external links in a new tab, we can fix this by injecting a short snippet of code.

```js
<script>
var links = document.querySelectorAll('a');
for (var i = 0; i < links.length; i++) {
  if (links[i].hostname != window.location.hostname) {
    links[i].target = '_blank';
    links[i].rel = 'noopener';
  }
}
</script>
```

Paste this code at Ghost Settings → Code injection → Site Footer.

## How it works

Contain every link in an array. For every link, if the link's hostname is different from this Ghost's hostname, change the `target` and `rel` values.

Changing the `target` to `_blank` will do the job. However, this will run the external link in the same Ghost process, leading to possible performance drops and security risks. We can prevent this by setting the `rel` value as `noopener`.

While modifying every link with JavaScript whenever accessing the page might slow down your Ghost, the performance impact will be ignorable unless the page has many external links. This trick will do its job until Ghost provides us a default option to open links in a new tab.

## Additional readings

- [Links to cross-origin destinations are unsafe; Google Developers](https://developers.google.com/web/tools/lighthouse/audits/noopener)
