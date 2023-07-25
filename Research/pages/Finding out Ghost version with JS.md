---
date: 2020-07-11
slug: '/2A4AA1'
---

So, this blog runs on [Ghost](https://github.com/TryGhost/Ghost). At the footer of this website, I wanted to keep the message "[Ghost ${version}](https://github.com/TryGhost/Ghost) self-hosted on [DigitalOcean](https://www.digitalocean.com/) distributed by [Cloudflare](https://www.cloudflare.com/)." But that meant every time I updated Ghost, I had to manually update that string in my theme package and re-upload those. While I automated theme deployment with [[GitHub Actions]] (you can find the post [here](https://blog.chosunghyun.com/kr-ghost-theme-cicd/)), it was a hassle to ① clone the theme package ② fix the string ③ commit and push it back. Then I thought it would be great to automatically insert the current Ghost version so that I don't have to update it every time manually. At first, I investigated the Ghost [[engine]] side to make the [[Node.js]] include the value before responding to the client [[Web Browser|browser]], but I figured that there was a much simpler way after a while.

## Extracting the Ghost version on client-side

Every Ghost blog includes a tag like the following for [[Search Engine Optimization|SEO]] and statistical reasons unless you manually disabled it.

```html
<meta name="generator" content="Ghost 3.13" />
```

That `content` thing was what I wanted to use. Extract that value with JS.

    document.getElementsByName("generator")[0].content;

Of course, if you made some other HTML tag with a name `generator` before this generator, this wouldn't work. But you really shouldn't do that - `generator` tags should only be used by automatic software and aren't supposed to be edited. So either leave this tag as-is or remove it altogether.

# Displaying the extracted Ghost version

The footer's HTML is generated with a handlebars file.

```hbs
{
  {
    {
      t "{ghostlink} self-hosted on {cloudlink} distributed by {CDN}"
      ghostlink = "<a href = \"https://github.com/TryGhost/Ghost\">Ghost</a>"
      cloudlink = "<a href = \"https://www.digitalocean.com/\">DigitalOcean</a>"
      CDN="<a href=\"https://www.cloudflare.com/\">Cloudflare</a>"
    }
  }
}.
```

I added an `id` property to `ghostlink`.

```hbs
ghostlink="<a id = \"ghost-version\" href=\"https://github.com/TryGhost/Ghost\">Ghost</a>"
```

Then input the string to the corresponding tag with JS.

```js
<script>
  document.getElementById("ghost-version").innerText = document.getElementsByName("generator")[0].content;
</script>
```

Paste this to Admin Panel → Code Injections → Site Footer.

You are good to go. See this in action down at the footer. ↓

One less hard-coded [magic number](<https://en.wikipedia.org/wiki/Magic_number_(programming)>)!
