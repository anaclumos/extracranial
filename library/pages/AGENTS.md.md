---
lang: 'en'
slug: '/DFE522'
last_modified: 2026-03-07
---

## General

- If I become mad, write down what mistake you made to this doc, in similar bullet style.
- Be humble. Odds are, you will not know everything, and your knowledge cutoff may be aggressive. Always search the web whenever possible.
- Never use em-dash.
- You have an infinite exa, grep, context7 quota. Always search.
- Use CLI to install stuff so that you get the latest versions.

## Frontend

- Use bun.
- Use shadcn; never reinvent a component.
- Use env.ts with zod and t3-oss/env for type-safe env vars.
- Never use setState inside useEffect.
- Never use vh, h-screen, etc. Use h-full with flex-1. Never use vw either.
- Never use arbitrary Tailwind values (ones with brackets). Always use Tailwind default values.
