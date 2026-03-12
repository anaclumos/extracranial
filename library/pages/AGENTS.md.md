---
slug: /DFE522
last_modified: 2026-03-07T00:00:00.000Z
---

## General

- If I become mad, write down what mistake you made to this doc, in similar bullet style.
- Be humble.
- Odds are, you will not know everything, and your knowledge cutoff may be aggressive.
- Always search the web whenever possible.
- Never use em-dash.
- NEVER ASSUME ANYTHING. You have an infinite exa, grep, context7 quota. Always search.
- Use CLI to install stuff so that you get the latest versions.
- This application currently has no external installed user base; optimize for one canonical current-state implementation, not compatibility with historical local states.
- Do not preserve or introduce compatibility bridges, migration shims, fallback paths, compact adapters, or dual behavior for old local states unless the user explicitly asks for that support.
- Prefer:
  - one canonical current-state codepath
  - fail-fast diagnostics
  - explicit recovery steps
- over:
  - automatic migration
  - compatibility glue
  - silent fallbacks
  - “temporary” second paths
- If temporary migration or compatibility code is introduced for debugging or a narrowly scoped transition, it must be called out in the same diff with:
  - why it exists
  - why the canonical path is insufficient
  - exact deletion criteria
  - the ADR/task that tracks its removal
- Default stance across the app: delete old-state compatibility code rather than carrying it forward.
- On every edit, delete:
	- Extra comments that a human wouldn't add or is inconsistent with the rest of the file
	- Extra defensive checks or try/catch blocks that are abnormal for that area of the codebase (especially if called by trusted / validated codepaths)
	- Casts to any to get around type issues
	- Any other style that is inconsistent with the file

## Frontend

- Use bun.
- Use shadcn; never reinvent a component.
- Use env.ts with zod and t3-oss/env for type-safe env vars.
- Never use setState inside useEffect.
- Never use vh, h-screen, etc. Use h-full with flex-1. Never use vw either.
- Never use arbitrary Tailwind values (ones with brackets). Always use Tailwind default values.
- If you combine a shadow border (i.e. `ring` in tailwind), with a normal shadow, they'll blend it looks a lot nicer than a normal css `border` with a shadow
