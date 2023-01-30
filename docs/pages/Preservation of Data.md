---
lang: 'en'
slug: '/F0576B'
aliases: ['archive', 'archivism']
---

- An important concept for [Memex](./../.././docs/pages/Memex.md) and [Extracranial](./../.././docs/pages/Extracranial.md)

> The **LOCKSS** ("Lots of Copies Keep Stuff Safe") [project](./../.././docs/pages/Project.md), under the auspices of [Stanford University](https://en.wikipedia.org/wiki/Stanford_University 'Stanford University'), is a peer-to-peer network that develops and supports an [open source](https://en.wikipedia.org/wiki/Open-source_software 'Open-source software') system allowing libraries to collect, preserve and provide their readers with access to material published on the Web. Its main goal is [digital preservation](https://en.wikipedia.org/wiki/Digital_preservation 'Digital preservation'). [LOCKSS](https://en.wikipedia.org/wiki/LOCKSS)

> 조선 건국 이후 실록은 춘추관에 한 부를 보관하고, 충주·성주·전주 등 교통의 요지였던 주요 도시의 사고에 한 부씩 모두 4부를 보관했다. 그런데 임진왜란 때 실록은 전주 사고에 보관했던 것만 남고 모두 불타 버렸다. 전주 사고의 실록은 난리가 나자 백성들이 미리 깊은 산속으로 옮겨서 무사할 수 있었다. 임진왜란이 끝난 후 조정에서는 전주 사고의 실록을 원본으로 삼아 실록을 다시 인쇄했다. [우리역사넷](http://contents.history.go.kr/mobile/eh/view.do?levelId=eh_r0250_0010&code=)

### [How to become a pirate archivist - Anna's Blog](http://annas-blog.org/blog-how-to-become-a-pirate-archivist.html)

The world is producing more knowledge and culture than ever before, but also more of it is being lost than ever before. Humanity largely entrusts corporations like academic publishers, streaming services, and social media companies with this heritage, and they have often not proven to be great stewards.

### Psychology

**Alexandra Elbakyan**. Founder of Sci-Hub, who is very open about her activities. But she is at high risk of being arrested if she would visit a western country at this point, and could face decades of prison time.
Secrecy comes with a psychological cost. Most people love being recognized for the work that they do, and yet you cannot take any credit for this in real life.
Even simple things can be challenging, like friends asking you what you have been up to (at some point "messing with my NAS / homelab" gets old).

### Domain Selection

Think about your philosophy.

### Target Selection

Better if large, unique, accessible, and insightful.

### Metadata Scraping

We use Python scripts, sometimes curl, and a MySQL database to store the results in.
Go through a few dozen pages yourself, to get a sense for how that works.
To get around restrictions, there are a few things you can try.

- Find another [IP](./../.././docs/pages/IP.md) without restrictions you are facing.
- Find another API endpoints without restrictions you are facing.
- Find the download rate that makes your [IP](./../.././docs/pages/IP.md) blocked. How long does it get blocked? Or do you get throttled down?
- Try creating a new account.
- Try using [HTTP](./../.././docs/pages/HTTP.md)/2 to keep connections open. Does that change the request-response rate?
- Is there a comprehensive "all-in-one" page? Is the information listed there sufficient

You might want to collect title, filename, location, id, isbn, doi, size, hash (md5, sha1), date added/modified, description, category, tags, authors, language, etc.

### Downloading the Page

Save the raw [HTML](./../.././docs/pages/HTML.md) and process it later.
This way you don't need to re-download the [HTML](./../.././docs/pages/HTML.md) if you figure you missed something
Or use metadata to prioritize a reasonable subset of data to download
Start by downloading files.
Expand slowly.

### Distribution

Riskiest.
Even with selecting a good VPN, not filling in your personal details in any forms, and perhaps using a special [browser](./../.././docs/pages/Web%20Browser.md) session (or even a different computer)
a highly motivated nation-state actor can probably look at incoming and outgoing data flows for VPN servers, and deduce who you are.

<head>
  <html lang="en-US"/>
</head>
