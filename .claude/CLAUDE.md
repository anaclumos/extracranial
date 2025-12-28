# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Extracranial is a personal wiki and digital garden built with TanStack Start (full-stack React framework), featuring MDX content rendering with wiki-style linking.

## Commands

```bash
# Development
bun install              # Install dependencies
bun --bun run dev        # Start dev server on port 3000

# Build & Preview
bun --bun run build      # Production build
bun --bun run preview    # Preview production build

# Testing & Quality
bun --bun run test       # Run Vitest tests
bun x ultracite fix      # Format and fix lint issues (always run before committing)
bun x ultracite check    # Check for issues without fixing
```

## Architecture

### Tech Stack
- **Framework**: TanStack Start (React 19 + Vite + Nitro)
- **Routing**: TanStack Router with file-based routing
- **Styling**: Tailwind CSS v4
- **Content**: MDX via mdx-bundler with Obsidian-style wiki links

### Content System (`src/lib/content.server.ts`)
The content system processes markdown files from `contents/` with:
- **Research notes**: `contents/research/*.md` - Single files with `slug` in frontmatter
- **Blog posts**: `contents/blog/{date}-{name}/en.md` and `ko.md` - Bilingual blog posts
- **Wiki links**: `[[Page Title]]` and `[[Target|Alias]]` syntax converted to internal links
- **Image embeds**: `![[image.png]]` converted to `/api/assets/` URLs

Content is indexed on first access, building a slug-to-file mapping and wiki link resolution index.

### Route Structure (`src/routes/`)
- `/w/$slug` - English wiki pages
- `/r/$slug` - Research pages (same content, different URL pattern)
- `/ko/w/$slug` and `/ko/r/$slug` - Korean language versions
- `/api/assets/$` - Serves embedded images from content directories

### MDX Components (`src/components/mdx/`)
Custom components available in MDX: `YouTube`, `SpotifySong`, `AppleMusicSong`, `Callout`, `Shuffle`, `DisplayFlex`, `WIP`

### Server Functions
Uses TanStack Start's `createServerFn` for SSR data fetching. Content is fetched server-side and the bundled MDX code is sent to the client.

## Code Standards

This project uses **Ultracite** (Biome preset) for formatting and linting. Key points:
- Prefer `for...of` over `.forEach()` and indexed loops
- Use `const` by default, `let` only when needed, never `var`
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- React 19: Use ref as a prop instead of `React.forwardRef`
- Remove console.log/debugger before committing

Run `bun x ultracite fix` before committing to auto-fix most issues.
