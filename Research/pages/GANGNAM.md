---
lang: 'en'
slug: '/9DFBB8'
---

<Admonition type="info" title='GANGNAM is...' icon="🩵">

GANGNAM is a an opinionated development philosophy.

</Admonition>

I've recently come to an epiphany that my dev stack or philosophy doesn't fall under any existing categories. I'm **not**

- a PHP indie-preneur who makes millions
- a Java engineer who engineers systems for millions
- a C++ engineer who optimized codes at the nanoseconds level
- a Python scientist who programs as a mere means for their maths

Some saw me as *overengineering* while another saw me as *inexperienced* when the others saw me as *hype-chaser*. It could look so. But I wanted to sit down and explain my philosophy and reasoning behind the stacks. Hope it makes sense to you. 

This is NOT for everyone NOR I don't intend to persuade you. All techs are driven by needs, and your needs differ from mine.

## 0. Red Queen's Race

> Now, here, you see, it takes all the running you can do, to keep in the same place.

Everything changes, and you will, too. Your defense to A will perish into history with B's new update and C's unpopular push. Your job is to disprove yourself as often as possible.

<details>

<summary>
Instagram's Engineering Philosophy in 2011
</summary>

One of the most popular philosophies is Instagram.

1. Keep it very simple
1. Don't reinvent the wheel
1. Go with proven and solid technologies when you can

While the first two still sound relevant today, I don't agree with the third option. Things change, and they change for good. New tools are built for a reason. Find and learn from that reason.

</details>

The goal of the GANGNAM is to build systems in hot-replaceable chunks, with every module **destined** to be swapped out at one point. (i.e., this will be your last rewrite.)

So, experiment more, learn more, ask more. Become a wanderlust and aggressively explore new tools.

Also, hear out when people have different opinions.

import Admonition from '@theme/Admonition';

<Admonition type="tip" title='My three liner would be' icon="💚">

1. Keep it very simple
1. Don't reinvent the wheel
1. Keep things hot-replaceable
   1. Experiment a lot, but make sure a "Revert" button is in reach and works!

</Admonition>

<Admonition type="danger" title='Dafuq is hot-replaceable' icon="❤">

Something that you could switch with a press of a button. I initially thought of the word "interoperable," but I think it doesn't fully grasp the point.

</Admonition>

Why is it called GANGNAM, by the way? I live in Gangnam right now, and I conversed with a lot of smart people on this topic at Gangnam. What other good names could it have? So naturally...

## 1. Ergonomics over Anything

Your most valuable asset is your energy and a few slim time windows to gauge the market. Choose the most 'ergonomic' tool, whatever that is. If you can do the same thing with one of the codes, then there's no reason not to choose it.

For example, take config hell:

If you need to configure something just to get it to work, it's not ergonomic. Things should work out of the box.

- TypeScripted Node is unergonomic because you need to touch tsconfig and ts-node to get it to work. A better approach will be a runtime that just understands TypeScript natively. As of today, it's Bun.
- CJS-ESM are unergonomic because you need to set up interops. A better alternative would be a runtime that agnostically takes them all. As of today, it's Bun.
- The Python PIP System is unergonomic because it doesn't guarantee requirements and dependency consistency. A better approach would be something like an auto-updated dependency list or hot-loading model. As of today, it's package.json (acceptable) and Deno (better).
- Webpack is unergonomic because you need to touch webpack config, loaders, and plugins to do what you want. A better approach will be a loader that just knows all popular file formats and accepts them accordingly. As of today, it's Parcel (although these days, tools like Next abstract away webpack good enough, so the need for another bundler is smaller than ever)
- Storybook is unergonomic because you need to configure story files to get it to work. A better approach will be a watcher which reads all the components and looks at the props to generate the 'stories' files automatically.
- IaC is unergonomic because you need to 'maintain' dockerfiles and terraforms to get things to work. A better approach will be an intelligent command that reads and chooses the best option. As of today, it's Nix.

In general, imperativeness is unergonomic, and declarativeness is ergonomic. You define how things 'should be,' not the nitty-gritty in between.

If you can do the same thing with 5 lines of code instead of 100, then you should opt-in for 5 lines of code.

<Admonition type="warning" title='This is obvious but for the record' icon="💛">

Type Safety is ergonomic. That's why I hate Python.

</Admonition>

## 2. Clever Hackiness over Secure Busywork

- I'd choose an unstable but elastic tech over a proven boring tech.
  - Proven boring techs are often not hot-replaceable.
  - I'd prefer a simple go script over a factory-patterned Java Spring Boot.
  - Simpler, more elastic, and hot-replaceable.

I feel like Mr. Kessels put it best. He makes a point on database, but I think it applies to way more stuffs.

> Don't use the database when avoidable. **Which is always more often than I think**. I don't need to store the 195 countries of the world in a database and join when showing a country- dropdown. Just hardcode it or put it in config read on boot. Hell, maybe your entire product catalog of the e-commerce site can be a single YAML read on boot? This goes for _many_ more objects than I often think. [It's not Ruby that's slow, it's your database](https://berk.es/2022/08/09/ruby-slow-database-slow/)

## 3. Use SaaS up until you 'study' it

- Deep SaaS is a SaaS that does one thing **only** and one thing **great**.
- Offload SLA to a SaaS whenever you can, up until you need to "study" it.
- Mass Market is often accurate. If they solved 99 other people's problems, it'll solve your problem, too.
- For example:
  - Resend is acceptable because it uses a simple HTTP request
  - Zapier is unacceptable because you need to 'study' to make it work
    - If you use Zapier, only use it to the point of Webhooks
  - Google BigQuery is unacceptable because you need to learn GoogleSQL
    - If you use BigQuery, don't invest too much in learning GoogleSQL dialects.
  - I plan on using [Firecrawl](https://www.firecrawl.dev/), which is acceptable with this criteria, because it's just an HTTP request, and what it does is super clear (I already built the same thing anyway. It's just cumbersome to maintain Playwright workers and handle exceptions or DOM errors of websites out in the wild)

SaaS is fine. I'm just saying keep Deep SaaS hot-replaceable. Don't study proprietary tech unless it's the industry de facto! (I'm talking to you, AWS)

<Admonition type="info" title='This is just my preference but' icon="🩵">

If there's an OSS alternative for that SaaS, I'd rather use that OSS and GitHub-Sponsor them. See [[Open Core Models]].

Need LogSnag? Check out [PostHog](https://github.com/PostHog/posthog). Need Resend? Check out [Plunk](https://github.com/useplunk/plunk). Need Substack? Check out [Ghost](https://github.com/TryGhost/Ghost).

</Admonition>

<Admonition type="tip" title='Why?' icon="💚">

Self-hosting = Controlling the Database = Better Chance of Being hot-replacable with Bulk Data Exports

</Admonition>

## 4. Occam's DollarShaveClub

Opt-in for a solution that requires the least amount of work. Don't overcomplicate it.

1. If something's doable with HTML, it must be done in HTML.
2. If something's doable with CSS, it must be done in CSS.
3. If something's doable with ECMAScript Standard, it must be done in ECMAScript Standard.
4. If something's doable with Pure React, it must be done in Pure React.
5. If something's doable with Next.js or Meta React of your choice, it must be done with that library.
6. If something's doable with Vertically Integrated Framework with any of the above, it must be done in with that library.
7. If you can do it in less than an hour and will save you a lot of work ahead, build one yourself.
8. Now look for any NPM libraries.

Similarly, with tools:

1. If something's doable within Git, it must be done in Git.
1. If something's doable within GitHub, it must be done in GitHub.
1. If something's doable within GitHub Apps, it must be done with that.

For example, IRL,

- Prefer HTML input date over building your own calendar input
- Prefer CSS Animations over Framer Motion
- Prefer Fetch over Axios
- Prefer React Suspense instead of Next.js Dynamics
- Prefer SWR over other data lifecycle management tools (it's by the same company, vertically integrated)
- Prefer Oslo's Argon2ID over other libs when using Lucia (it's by the same dev, vertically integrated)
- Prefer GitHub Actions over other CI tools

To override this chain of command, you will need a **good** reason, such as better ergonomics.

## 5. So what's the Stack

<Admonition type="danger" title='My three liner would be' icon="🔥">

This list may not be up to date. Last updated on [[2024-08-01]].

</Admonition>

- TurboRepo
  - minimal setup
  - best for monolingual typescript monorepos
  - makes dependency deduping and code sharing a breeze across repos.
  - interoperable and hot-replaceable (works on top of npm workspaces)
- Bun
  - minimal setup
  - lightweight and fast
  - no bullshit configs (its tsconfig is only for the editor)
- Elysia
  - minimal setup
  - super ergonomic
  - super fast
  - no bullshit configs
  - not hot-replaceable right away, but very similar to Express
- Lucia
  - minimal setup
  - ergonomic
  - vertically integrates out-of-the-box with oslo and arctic
    - oslo: Many auth-related helper functions
    - arctic: Provides OAuth 2.0 bridge with almost all popular providers
  - not hot-replaceable right away, but it's just an ergonomic wrapper on industry-standard session tokens
- Biome
  - minimal
  - vertically integrates prettier and eslint
- AWS with FlightControl
  - minimal setup (vercel-like setup)
  - hot-replaceable since it's just a super ergonomic wrapper of AWS API calls under the hood, and basically, it's just starting a $5 VPC with a NixPacks Docker image
- HTTP-Only Cookie Authenticated REST APIs
- Most GitHub and AWS features
- As many automation as I can find

I am skeptical of this but could use:

- Next.js
  - I don't like they try to 'override' or 'rebrand' some web or React feature
  - but I must admit, hell yeah, they're ergonomic.
  - not interoperable, but I don't think any web framework is
- SWR
  - minimal setup
  - vertically integrates with next.js (by the same Vercel people)
- UI by @shadcn
  - minimal setup
  - one could argue it's ergonomic
  - vertically integrates with Next.js (shadcn works for Vercel)
  - hot-replaceable because it's just copy-pasting Radix Tailwind codes to your component folders.
- Tailwind
  - minimal setup, although I hate postcss and tailwind configs
  - near one-to-one mapping with CSS
  - ergonomic in a way that it does automatic optimizations
- Jest or Vitest
  - It's fine. They have similar APIs anyways.
- Prisma
  - it's fine.
  - I'm not writing raw SQLs anyways—it's not ergonomic.
  - It's not hot-replaceable per se, but worst case, I could just shim the object with `@vercel/postgres` direct SQL calls
- Postgres
  - it's fine.
- Lefthook (or Git Hooks in general)
  - it's fine.
  - minimal setup
  - explicitly shows commit hooks (unlike husky)
  - Lefthook is hot-replaceable because it's just git hooks wrapper
- GraphQL
  - it's fine
  - a bit of a setup and maintenance work,
  - but it makes API calls much more ergonomic once past that stage
  - it's not hot-replaceable

I wouldn't want to use it unless absolutely necessary

- Docker
  - Web Packages are, in a way, already containerized. Setting them up is fine, but it's an extra step.
  - If I need to use it, I'll use it through NixPacks.
- Vercel
  - It may seem hot-replaceable, but you'll lock up if you start using its edge functions or Postgres plan.
- Bun Specific APIs
  - I would not directly use `Bun.test` or `Bun.serve` because they are not hot-replaceable.
  - I might write a wrapper that internally uses these APIs to make things faster while keeping things interoperable.
- Serverless Architecture
  - I think it makes more problems than it solves

## 6. Do Things That Don't Scale

Many misread this as keeping things boring, repetitive, and predictable. I think it's the opposite way.

Founders or engineers, who especially prefer to be in deep tech, must bet on the dangerous, unsustainable way of doing things.

First, create a safety net, then try out unreliable but bold things over and over.

Opt-in for standard-based interoperable, hot-replaceable, elastic, and ergonomic wrapper technology instead of proprietary, proven, boring, old tech.

<Admonition type="danger" title='Ofc you need to do your own research' icon="🔥">

Don't email me after you set something on fire after following this!

</Admonition>
