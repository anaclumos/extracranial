---
lang: 'en'
slug: '/7B9BB7'
---

- `history.push` creates a new entry in the browser's history stack (allowing the user to navigate back)
- `history.replace` replaces the current entry (preventing the user from navigating back to the replaced state).

You would typically use `push` when you want the user to have the option to return to the previous page, and `replace` when you want to avoid cluttering the history stack (e.g., after successful login or form submissions where it doesn't make sense to go back to the previous page).
