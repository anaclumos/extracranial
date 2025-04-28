---
lang: 'en'
slug: '/959D0A'
---

## [[K-Pop|Idol]] — _Indie Developers' Opinionated Libraries_

- Use [[boring technologies]]
- [[Bootstrap]]
- Deliver day 1
- Huge focus on an international-first approach
  - [[HTTP]] [[content negotiation]]
  - International [[Search Engine Optimization|SEO]] built-in ([[hreflang]])
  - Subpath routing
  - International payments built-in (PayPal + [[Toss]])
- [[Impact over Performance]]
- Business Performance over Technical Performance
- Day One Deploy
- Perfect for Indie Developers

## Current Selections

### Approach 1

- [[Redwood.js|Redwood]], Render, Clerk, Chakra, Inlang + [[Across the Sprachraums]], [[GitHub]] CI/CD
- [[i18n with Redwood]]

#### Pro

- ORM built-in
- Takes care of [[GraphQL]] fuzz

#### Con

- Their [[Internationalization|i18n]] sucks. Especially setting up subpath routing for [[Redwood.js|Redwood]].
- Non-[[Generative Pre-trained Transformer|GPT]]-able, since v1 came out mid 2022

### Approach 2

- [[Next.js]], [[Supabase]] [[Database|DB]], [[Supabase]] Auth, [[Supabase]] Storage, [[CloudFlare]], Chakra

#### Pro

- Most resources
- ~~Good [[Internationalization|i18n]] support~~ turns out Next 13 removed it and introduced a more manual one

#### Con

- Need to set up the integration
- Sometimes lack of a proper [[back-end]] sucks

## Conclusion

After cracking [[i18n with Redwood]], decided with approach 1
