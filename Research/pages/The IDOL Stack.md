---
lang: 'en'
slug: '/959D0A'
---

## IDOL — _Indie Developers' Opinionated Libraries_

- Huge focus on an international-first approach
  - HTTP content negotiation
  - International SEO built-in (hreflang)
  - Subpath routing
  - International payments built-in (PayPal + Toss)
- Business Performance over Technical Performance
- Day One Deploy
- Perfect for Indie Developers

## Current Selections

### Approach 1

- Redwood, Render, Clerk, Chakra, Inlang + [[Across the Sprachraums]], GitHub CI/CD
- Pro: ORM built-in
- Con: Their [[Internationalization|i18n]] sucks. Especially setting up subpath routing for Redwood

### Approach 2

- Next.js, Supabase DB, Supabase Auth, Supabase Storage, CloudFlare, Chakra
- Pro: Most resources, Good [[Internationalization|i18n]] support
- Con: Need to set up the integration
