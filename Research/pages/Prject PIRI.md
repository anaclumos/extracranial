---
lang: 'en'
slug: /69794B
aliases: ['PIRI']
title: 'Project PIRI 🪈: Programmatic Interlingual Resource Integration'
---

import Admonition from '@theme/Admonition';

<Admonition type="info" title='Become a 10x dev without learning English' icon="💬">

Providing [[무제한번역|unlimited translations]] for major developer documents

</Admonition>

## [[2024-06-25]]

<blockquote class="twitter-tweet">
<p lang="en" dir="ltr">
can someone make a nextjs app that takes our public github discussions and makes SEO-friendly read-only replica?<br/><br/>we want to run cal. com/community and when you want to comment, you get linked to github
</p>
&mdash; Peer Richelsen — oss/acc (@peer_rich) <a href="https://twitter.com/peer_rich/status/1805268068501004782?ref_src=twsrc%5Etfw">June 24, 2024</a></blockquote>

<blockquote class="twitter-tweet">
<p lang="en" dir="ltr">
good to know<br/><br/>maybe the approach to add commentary to it (by gpt-summary of the discussion and maybe removing non-answers) is enough to not be considered duplicate?
</p>
&mdash; Peer Richelsen — oss/acc (@peer_rich) <a href="https://twitter.com/peer_rich/status/1805300021291577818?ref_src=twsrc%5Etfw">June 24, 2024</a></blockquote>

<blockquote class="twitter-tweet">
<p lang="en" dir="ltr">
Exciting. <br/><br/>The coolest part is that with ISR you can make it very fast, control exactly how often you want to revalidate the caches, and prevent rate limits on the upstream API.<br/><br/>Example:<a href="https://t.co/sqrRYSTSiI">https://t.co/sqrRYSTSiI</a>
</p>
&mdash; Guillermo Rauch (@rauchg) <a href="https://twitter.com/rauchg/status/1805315183629451333?ref_src=twsrc%5Etfw">June 24, 2024</a></blockquote>

## [[2024-06-03]]

- Finished [[Project DANSO]], at least the first usable version

## [[2024-05-30]] — Subdomain or Subdirectory?

### Subdirectory `piri.dev/ko/react`

- Hard to configure
- Good for domain reputation
- Expansion is easy

### Subdomain `react.ko.piri.dev`

- Simpler configuration
- Ugly
- Expansion is hard (more manual work), since I don't want to write DNS provisioning codes
- A monorepo would suffice
- IT'S UGLY... (again) But I think this is the most direct way

## [[2024-05-30]] — Serving for Subdirectory Routing

### Approach 1 — Static Everything

- For each `piri` translations, just static export the document into HTML.
- Have a Hono server, and then parse each requests and route them to the correct HTML.

### Approach 2 — Dynamic Everything

- For each `piri` translations, spin up a node server.
- Have an NGINX, and parse each request and proxy them to the correct node server.

## [[2024-05-30]] — Inner links for Subdirectory Routing

For example, if a `react.dev` project has a link to `/help`, it normally will route to `react.dev/help`. However, in our case, it should route to `piri.dev/ko/react/help`. How can we snatch the request and return the correct stuffs?

The request itself will be sent from the browser, so we can't touch that part. i.e., this inner link replacement process should be stateless.

We can't look for "oh, this guy is at this directory... so if they requested `/help`, it'll mean this website."

All information should be corrected and valid at the moment of HTML response.

- Modifying the MDX itself?
  - Too complicated, too many weak links
- When returning the HTML from the server, run DOM to find and replace inner links?
  - Maybe this could work
  - Then we need to completely abandon SPA
- Just don't fix it?
  - Not a consideration, it will virtually break every single link

## [[2024-05-30]] — On Translations

- [[The Need for Project DANSO]]

## [[2024-05-29]]

The `flute` folder stores all of the raw projects, using git submodules. For example, the React project documentation will live under `flute/react`. There will be many documentations, such as `flute/react-native`, `flute/flutter`, `flute/docusaurus`, etc.

Then, there is a `lang.ts` file that governs the languages. It will export a JSON, with language key and the language name.

The final output will be localized into the `piri` folder. For example, `piri/ko/react` will store all of the Korean translation of the React project. `piri/ja/react` will store the Japanese version of the React project. The slug after the language code will be the same as the slug after the `flute` folder in the source.

- `piri.dev` shows the initial project page
- `piri.dev/ko` will show all the lists of the projects that are available in Korean
- `piri.dev/ko/react` will show the Korean-translated index.html of the React documentation
- `piri.dev/ko/react/errors` will show the Korean-translated `react.dev/errors` content of the React documentation.
