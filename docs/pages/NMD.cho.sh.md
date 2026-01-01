---
lang: 'en'
slug: '/671D08'
---

Mobile-Desktop optimized **Master Detail View** (Like iPhone-iPad)

- Acceptable Code Structure (Next.js [App Router](./../.././docs/pages/App%20Router.md) Nested Layout)
- Acceptable Link Structure
- Acceptable UI (Don't stretch mobile layout on desktop, or cram desktop layout to mobile)

<figure>

![E18723.png](./../.././docs/assets/E18723.png)

</figure>

## Results: [nmd.cho.sh/](https://nmd.cho.sh/)

- [anaclumos/next-master-detail](https://github.com/anaclumos/next-master-detail)

<figure>

![73146A.gif](./../.././docs/assets/73146A.gif)

</figure>

It was so strange to:

- use `use` hook for suspended server-client interleaving
- putting content inside layout.tsx
- master view goes to both root layout (to render in desktop view) and root page (to render in mobile view) and both conditionally renders

<blockquote class="twitter-tweet">

figured it out! (next15 streaming ssr)

It felt so weird/counterintuitive to:

- use `use` hook for suspended server-client interleaving
- putting content inside layout.tsx
- master view goes to both root layout (to render in desktop view) and root page (to render in mobile view)…

[Original Post Link](https://t.co/KIyfrWUwI2)

&mdash; Sunghyun Cho (@anaclumos) [July 30, 2024](https://twitter.com/anaclumos/status/1818210670388936713?ref_src=twsrc%5Etfw)

</blockquote>

<blockquote class="twitter-tweet">

figured it out! (next15 streaming ssr)

It felt so weird/counterintuitive to:

- use `use` hook for suspended server-client interleaving
- putting content inside layout.tsx
- master view goes to both root layout (to render in desktop view) and root page (to render in mobile view)…

[Original Post Link](https://t.co/KIyfrWUwI2)

&mdash; Sunghyun Cho (@anaclumos) [July 30, 2024](https://twitter.com/anaclumos/status/1818210670388936713?ref_src=twsrc%5Etfw)

</blockquote>
