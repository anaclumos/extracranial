---
slug: /2F432B
last_modified: 2026-01-01T00:00:00.000Z
---

import Admonition from '@theme/Admonition';

<Admonition type="info" title='SEOCHO is...' icon="🩵">

- **S**traight: each components opt for least-work
- **E**rgonomic: components build easy and error-free
- **O**vert: no meaningless pre-optimization
- **C**omposable: components optimistically cooperate
- **H**ot-replaceable: bad actor can get sorted out with 5 lines of code change
- **O**rthogonal: each components specialize mutually exclusive but collectively exaustive

</Admonition>

## Background

I don't fit the usual boxes. That's fine. The operating mode here is **ship fast with parts you can swap**.

- I'm not optimizing for status or niches; I'm optimizing for **clarity, ergonomics, and hot‑replaceability**.
- Labels don't ship product. **Decisions do.**

## Red Queen's Race

Everything changes--including your own reasoning. Plan for it.

- **Assume you'll be wrong soon.** Prove yourself wrong on purpose and on schedule.
- **Design for swap‑outs.** Every module is a part you can replace without drama.
- **Prefer learning loops over sunk‑cost loyalty.** When the world shifts, you shift.

<details>
<summary>Instagram's Engineering Philosophy (2011)</summary>

1. Keep it very simple
2. Don't reinvent the wheel
3. Go with proven and solid technologies when you can

</details>

Use **1** and **2** by default. Use **3** only when "proven" also means **ergonomic, portable, and easy to replace**. New tools exist for reasons--**learn the reason** before you commit.

<Admonition type="tip" title='Working rules' icon="💚">

1. Keep it **very** simple.
2. Don't reinvent the wheel.
3. Keep things **hot‑replaceable**.
   - Experiment freely, but keep a **revert** within one PR.

</Admonition>

<Admonition type="danger" title='Definition: hot‑replaceable' icon="🔥">

Swappable in a button press or single PR. Minimal glue, minimal fallout. _Interoperable_ is close; **hot‑replaceable** is stricter.

</Admonition>

## Ergonomics Over Anything

Your scarcest resource is **energy** and a few **market windows**. Pick tools that reduce friction.

- **No config tax.** Things should work out of the box.
  - TypeScript runtime? Use **Bun**; skip `tsconfig` loader gymnastics.
  - CJS/ESM headaches? Use runtimes that run both without fuss (again, **Bun**).
  - Python packaging drift? Use **uv** for lockable, auto‑managed deps.
  - Heavy bundler ceremony? Use **Vite** or a framework that hides it well.
  - Tools that need bespoke storybook files or boilerplate? Prefer **auto‑discovery**.
  - Hand‑rolled Dockerfiles/Terraform for every tweak? Prefer **Nix/Nixpacks** when possible.

- **Declarative > imperative.** Describe _what_, not _how_.
- If it's solvable in **5 lines**, don't write **100**.

## Simple & Elastic > Clever Busywork

Be clear, not clever.

- Favor **elastic but replaceable** over **stable but sticky**--_only_ if you can swap fast.
- A tiny script that ships beats a baroque "platform."
- Prefer **small, explicit modules** you can replace over ornate abstractions you can't.

## Use SaaS--Until You Have to Study It

Buy the SLA; rent the complexity.

- **Deep SaaS** is great when it does _one thing_ well behind simple HTTP.
- Avoid proprietary dialect trap unless it's a de‑facto standard.
- Prefer **OSS** when viable; self‑host if data control or bulk export matters.

### Rules of Thumb

- **Simple HTTP in / webhook out** → good (hot‑replaceable).
- **Custom DSL or deep proprietary surface** → risky; avoid unless standard.
- **Own your data**; make export and migration easy.

**Examples**

- Resend‑style HTTP: ✅ acceptable
- Zapier: ✅ until webhooks; ❌ beyond (too much study)
- BigQuery: ✅ commodity SQL; ❌ deep dialect if you'll need portability

<Admonition type="info" title='Bias' icon="🩵">

OSS + self‑hosting ⇒ you control the data ⇒ bulk export ⇒ **easier swap‑outs**

</Admonition>

## Occam's DollarShaveClub

Pick the **least‑work** approach that safely ships.

### Implementation Ladder

1. **HTML**
2. **CSS**
3. **ECMAScript**
4. **Pure React**
5. A **framework** (Next/Remix/etc.)
6. If it's < 1 hour to build safely, **build it**
7. Only then reach for an **NPM library**

### Tooling Ladder

1. **Git**
2. **GitHub**
3. **GitHub Apps/Actions**
4. Then anything else

### IRL Defaults

- Native `<input type="date">` > custom pickers
- CSS animations > heavy JS animation libs
- `fetch` > Axios
- **React Suspense** > hand‑rolled loading logic
- **RSC** > client library fetch
- **GitHub Actions** > external CI (unless there's a strong reason)

> Deviate from the ladder **only** for a real, provable **ergonomics win**.

## Engineering Philosophy (Server‑First & Type‑Safe)

**The best code is no code.** The second best uses platform capabilities directly--with strong types, clear boundaries, and server‑first data access.

### Server‑First Architecture

Do NOT fetch on the client if the server can fetch.

❌ **Wrong (client fetch):**

```tsx
'use client'
export function BadComponent() {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch('/api/data')
      .then((r) => r.json())
      .then(setData)
  }, [])
  return <div>{data}</div>
}
```

✅ **Right (server fetch):**

```tsx
// Server component
export async function GoodComponent() {
  const rows = await db.select().from(table)
  return <div>{rows.length}</div>
}
```

### Type Safety Without Compromise

**Never use `any`. Ever.** Infer from sources of truth.

- Better Auth inferred types: `typeof auth.$Infer.Session`
- Elysia + Eden Treaty or Hono Stacks for type‑safe API clients
- Infer DB types from **Drizzle** schemas

### Use Platform Features, Not Libraries

Prefer first‑party plugins and capabilities over custom wrappers.

❌ **Wrong (custom billing API when a plugin exists):**

```ts
export const billingApi = new Elysia({ prefix: '/billing' }).post('/create-checkout-session', async () => {
  /* ... */
})
```

✅ **Right (Better Auth's Stripe plugin):**

```ts
await client.subscription.upgrade({
  plan: 'pro',
  successUrl: '/dashboard',
  cancelUrl: '/pricing',
})
```

### Direct Over Indirect

From server code, hit the DB directly instead of hopping through your own HTTP.

❌ **Wrong:**

```tsx
const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/campaigns/${id}`)
const campaign = await response.json()
```

✅ **Right:**

```tsx
const [campaign] = await db.select().from(campaigns).where(eq(campaigns.id, id)).limit(1)
```

### Performance is Not Optional

- Parallelize independent work (`Promise.all`)
- Cache intentionally (framework cache directives, HTTP cache, etc)
- Avoid waterfalls
- Use **RSC** to minimize client JS

## Technology‑Specific Guidance

### Better Auth

- Use **server** helpers (`getSession`, `listOrganizations`) on the server only
- Don't call client methods from the server
- Prefer built‑in plugins (Stripe, Organization)
- Use `referenceId` for multi‑tenant boundaries

### Elysia & Eden Treaty

- Eden Treaty for **typed** client ↔ server calls
- Narrow error types and check before accessing data
- Keep handlers tiny and composable

### Database (Drizzle)

- Schema is the **source of truth**; infer types from it
- Don't re‑add fields already provided by plugins
- Use relations & indexes; `limit 1` on single‑row fetches

### UI Components

- Use **shadcn/ui** (already installed)
- Use **Sonner** for toasts (not inline status messages)
- Server components by default; client components only when necessary
- Fetch Data Inside Component, instead of prop drilling
  - They'll be optimized with Partial Prerendering

## Anti‑Patterns

1. Client‑side fetching in a server‑rendered app
2. Duplicating functionality provided by Better Auth/Stripe/etc.
3. Ignoring TS errors (no `@ts-ignore` to _make it pass_)
4. Building abstractions before you need them
5. Fetching without a caching strategy

## Code Review Checklist

- No `any` types
- No client fetches for server‑available data
- No duplicate re‑implementations of platform features
- All TypeScript errors resolved
- Server hits DB directly when applicable
- Proper error handling with type‑narrowing
- Toasts via **Sonner** (not inline)
- Parallelized data fetching where possible
- Server components by default

## The Stack (hot‑replaceable by default)

- **Moonrepo**
  - Minimal setup; great for multilingual Monorepos
  - Multilingual ⇒ interoperable/hot‑replaceable
- **Bun**
  - Fast, light, understands TS natively
  - No config thrash; `tsconfig` purely for editor tooling
- **Elysia** (+ **Hono** where Web‑Standard routing/edge is ideal)
  - Simple, ergonomic, fast
  - Elysia feels familiar to Express; Hono hugs web standards
  - Elysia's Eden Treaty and Hono's RPC are type‑safe clients-server contracts. Ergonomic.
- **Better Auth**
  - Minimal setup; great plugin surface (Stripe, Organization)
  - Server‑first helpers; typed end‑to‑end
  - You own the data. Hot-replaceable.
- **Drizzle ORM** + **Postgres**
  - Schema‑first, typed queries, simple migrations
  - Postgres is boring‑great
  - Again, you own the data. Hot-replaceable.
- **Biome**
  - Lint + format in one; fast; low config
- **AWS via FlightControl**
  - Vercel‑like ergonomics, AWS under the hood
  - Hot‑replaceable: mostly ergonomic wrappers over AWS APIs
  - Pair with **Nixpacks** for painless images
- **HTTP‑only cookie auth** + typed REST (or Eden Treaty RPC)
  - Keep tokens off `localStorage`; keep surface small & typed
- **shadcn/ui** + **Sonner**
  - Copy‑in components (hot‑replaceable), great DX for toasts
- **Vitest/Jest/Bun**
  - Similar APIs; pick per project needs
- **Automation**
  - GitHub Actions for CI
  - Lefthook (or plain git hooks) for visible, simple commit hooks

### Skeptical but pragmatic

- **Vercel & Next.js**
  - Don't love the occasional rebranding/overrides, but: **ergonomic**.
  - Use server components, cache directives, and route handlers well.
- **SWR / TanStack Query**
  - Use _only_ when you must fetch on the **client**. Server‑first otherwise.
- **Prisma**
  - Fine; but Drizzle keeps types closer to SQL and feels lighter.
  - If mixing: isolate behind a repository layer for hot‑swap potential.

### What I usually avoid unless necessary

- **Docker** (hand‑rolled everywhere)
  - Docker is imperative in the inside.
  - Use **Nixpacks** or equivalents to avoid yak‑shaving.

## And try out that new hot thing in town

Let's say after 2 months, there's a new hot library in town. Should I stay uncool? I'd say: take a leap of faith, **but with a parachute** Try unreliable but high‑leverage ideas--wrapped in **interoperable**, **hot‑replaceable**, **type‑safe** modules.

<Admonition type="danger" title='Summary' icon="🔥">

- Be clear.
- Be direct.
- Be type‑safe.
- Be Server‑first.
- Be library power-user.
- Be a shipper, not an architect.

</Admonition>
