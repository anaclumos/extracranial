---
lang: 'en'
slug: '/F9F706'
---

- [[Project]]

`AIs.txt` is a mental model of a [[ML|machine learning]] permission system.
Intuitively, question this: what if we could make a human-readable file that declines [[ML|machine learning]] (a.k.a. [[Copilot]] use)?
It's like robots.txt, but for [[Copilot]].

```txt
User-agent: OpenAI
Disallow: /some-proprietary-codebase/

User-agent: Facebook
Disallow: /no-way-mark/

User-agent: Copilot
Disallow: /expensive-code/

Sitemap: /public/sitemap.xml
Sourcemap: /src/source.js.map
License: MIT

# SOME LONG LEGAL STATEMENTS HERE
```

## Key Issues

### Would it be legally binding?

For now, no.
It would be a polite way to mark my preference to opt out of such data mining.
It's closer to the **Ask BigTechs Not to Track** option rather than a legal license.
Technically, [[Apple]]'s **App Tracking Transparency** does not ban all tracking activity; it never can.

![[254AFC.png]]

### Why not `LICENSE` or `COPYING.txt`?

Both are mainly written in human language and cannot provide granular [[Crawler|scraping]] permissions depending on the collector.
Also, [[GitHub]] Copilot _ignores_ `LICENSE` or `COPYING.txt`,
claiming we consented to Copilot using our codes for [[ML|machine learning]] by signing up and pushing code to [[GitHub]],
We may expand the `LICENSE` system to include the terms for [[ML|machine learning]] use,
but that would even more edge case and chaotic licensing systems.

### Does [[ML|machine learning]] purposes of copyrighted works require a license?

This question is still under debate.
Opt-out should be the default if it _requires_ a license, making such a license system meaningless.
If it doesn't require a license, then which company would respect the license system, given that it is not legally binding?

### Is `robots.txt` legally binding?

No.
Even if you scrape the web prohibited under `robots.txt`, it is not against the law.
See [HIQ LABS, INC., Plaintiff-Appellee, v. LINKEDIN CORPORATION, Defendant-Appellant.](https://cdn.ca9.uscourts.gov/datastore/opinions/2022/04/18/17-16783.pdf).
`robots.txt` cannot make fair use illegal.

### Any industry trends?

[W3](https://www.w3.org/community/tdmrep/) has been working on `robots.txt` for [[ML|machine learning]], aligning with [[EU]] Copyright Directives.

> The goal of this [Community Group](https://www.w3.org/community/tdmrep/) is to facilitate TDM in Europe and elsewhere by specifying a simple and practical machine-readable solution capable of expressing the reservation of TDM rights. [w3c/tdm-reservation-protocol: Repository of the Text and Data Mining Reservation Protocol Community Group](https://github.com/w3c/tdm-reservation-protocol)

### Can we even draw the line?

No.
One could reasonably argue that AI is doing the same as humans, much better and more efficiently.
However, that claim goes against the fundamentals of [[IP|intellectual property]].
If any [[IP]] is legally protected, machine-generated code must also have the same level of awareness system to respect it and prevent any plagiarism.
Otherwise, they must bear legal duties.

### Maybe it can benefit AI companies too

... by excluding all hacky codes and only opting for best-practice codes.
If implemented correctly, it can work as an effective data sanitation system.

## Relevant Thread

Special thanks to everyone in the discussion:

<blockquote class="twitter-tweet">
<p lang="en" dir="ltr">
RFC: What if we could make "robots.txt", but for GitHub Copilot? <a href="https://t.co/VmKeL4NFeQ">pic.twitter.com/VmKeL4NFeQ</a>
</p>
&mdash; cho.sh (@anaclumos) <a href="https://twitter.com/anaclumos/status/1583582121427206144?ref_src=twsrc%5Etfw">October 21, 2022</a>
</blockquote>
