---
lang: 'en'
slug: /69794B
---

# Project PIRI 🪈: Programmatic Interlingual Resource Integration

import Admonition from '@theme/Admonition';

<Admonition type="info" title='Become a 10x dev without learning English' icon="💬">

Providing [[무제한번역|unlimited translations]] for major developer documents

</Admonition>

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

I have benchmarked different ways of translating the document.

### 1. Naive Document Translation

Works pretty well, but sometimes translates the MDX tags. See the `<Intro>` tag at the beginning of the document

But we cannot ignore these `<tag>` lines altogether because sometimes it includes strings, such as `<BlogPost title="What is React?" />`. In this case, we want to translate only the string inside

Translates proper nouns, such as "Server Actions" into "서버 작업" which severely confuses the reader

With some prompting, both can be fixed pretty easily

![[52DEF9.png]]

However, this approach has one critical flaw, that GPT is terrible at transcription.

Take a look at the following examples. It modified a code block, either making a syntax error or unknowingly modifying the code.

![[2AC2B1.png]]
![[37BAD3.png]]

### 2. Remark Parsing and Translating

Severely limits the context of AI translation.

Parsing to the html tag level worsens the translation quality, because sometimes the AI needs to see the sentence as a whole to employ more adequate markdown syntaxes.

For example, a sentence like the following

```
You [need to use](/some-supporting-doc) this because of [this](/some-youtube-video)
```

should be translated to

```
[이것](/some-youtube-video) 때문에 [이렇게 사용하셔야](/some-supporting-doc) 합니다.
```

Meanwhile if you parse it to the html tag level, the AI won't be able to reorder the sentences. Instead, it will translate it as:

```
당신은 [사용이 필요하다](/some-supporting-doc) 이것 때문에 [이것](/some-youtube-video)
```

![[87872D.png]]

### 3. Solution

I need to write an MDX parser. It will shallowly parse the elements, into:

- **Frontmatter**. Only translate strings, such as `title` and `description`.
- **MDX Tags**. Only translate inner strings.
- **Code**. Extract the comments and only translate the comments (or just don't.)
- **Paragraph**. Provide the markdown raw text as a whole.

Then each types of entities will be translated using their corresponding translation logic.

## [[2024-05-29]]

The `flute` folder stores all of the raw projects, using git submodules. For example, the React project documentation will live under `flute/react`. There will be many documentations, such as `flute/react-native`, `flute/flutter`, `flute/docusaurus`, etc.

Then, there is a `lang.ts` file that governs the languages. It will export a JSON, with language key and the language name.

The final output will be localized into the `piri` folder. For example, `piri/ko/react` will store all of the Korean translation of the React project. `piri/ja/react` will store the Japanese version of the React project. The slug after the language code will be the same as the slug after the `flute` folder in the source.

- `piri.dev` shows the initial project page
- `piri.dev/ko` will show all the lists of the projects that are available in Korean
- `piri.dev/ko/react` will show the Korean-translated index.html of the React documentation
- `piri.dev/ko/react/errors` will show the Korean-translated `react.dev/errors` content of the React documentation.
