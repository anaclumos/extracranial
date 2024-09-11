---
lang: 'en'
slug: '/671D08'
---

Mobile-Desktop optimized **Master Detail View** (Like iPhone-iPad)

- Acceptable Code Structure (Next.js [[App Router]] Nested Layout)
- Acceptable Link Structure
- Acceptable UI (Don't stretch mobile layout on desktop, or cram desktop layout to mobile)

![[E18723.png]]

## Results: [nmd.cho.sh/](https://nmd.cho.sh/)

- [anaclumos/next-master-detail](https://github.com/anaclumos/next-master-detail)

![[73146A.gif]]

It was so strange to:

- use `use` hook for suspended server-client interleaving
- putting content inside layout.tsx
- master view goes to both root layout (to render in desktop view) and root page (to render in mobile view) and both conditionally renders

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">figured it out! (next15 streaming ssr)<br/><br/>It felt so weird/counterintuitive to:<br/><br/>- use `use` hook for suspended server-client interleaving<br/>- putting content inside layout.tsx<br/>- master view goes to both root layout (to render in desktop view) and root page (to render in mobile view)… <a href="https://t.co/KIyfrWUwI2">pic.twitter.com/KIyfrWUwI2</a></p>&mdash; Sunghyun Cho (@anaclumos) <a href="https://twitter.com/anaclumos/status/1818210670388936713?ref_src=twsrc%5Etfw">July 30, 2024</a></blockquote>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">figured it out! (next15 streaming ssr)<br/><br/>It felt so weird/counterintuitive to:<br/><br/>- use `use` hook for suspended server-client interleaving<br/>- putting content inside layout.tsx<br/>- master view goes to both root layout (to render in desktop view) and root page (to render in mobile view)… <a href="https://t.co/KIyfrWUwI2">pic.twitter.com/KIyfrWUwI2</a></p>&mdash; Sunghyun Cho (@anaclumos) <a href="https://twitter.com/anaclumos/status/1818210670388936713?ref_src=twsrc%5Etfw">July 30, 2024</a></blockquote>
