# Agent Instructions

## Daily Journal Updates

Whenever you complete a task or make significant changes to this codebase, **write a summary to today's journal**.

### Journal Location

```
Research/journals/YYYY-MM-DD.md
```

### Journal Format

```markdown
---
date: 'YYYY-MM-DD'
lang: 'ko'
slug: '/YYYY-MM-DD'
---

- Bullet points with [[wiki links]] for concepts
- Or plain text descriptions

## Section Header (optional)

Longer descriptions of work done.
```

### What to Log

- Features implemented
- Bugs fixed
- Refactoring done
- Configuration changes
- Any significant code changes

### Rules

1. Keep entries concise but informative
2. Use `[[wiki links]]` for concepts that might have their own pages
3. Group related changes under a section header
4. Include technical details that would help future reference
5. Write in English or Korean (match the journal's `lang` field)

### Creating Wiki Links

Before writing journal entries, **list the `Research/pages/` directory** to find existing pages:

```bash
ls Research/pages/
```

Only create `[[wiki links]]` for concepts that have corresponding pages in `Research/pages/`. This ensures links resolve correctly.
