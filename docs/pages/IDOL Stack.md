---
lang: 'en'
slug: '/959D0A'
---

## [Idol](./../.././docs/pages/K-Pop.md) -- _Indie Developers' Opinionated Libraries_

- Use [boring technologies](./../.././docs/pages/Boring%20Technologies.md)
- [Bootstrap](./../.././docs/pages/Bootstrap.md)
- Deliver day 1
- Huge focus on an international-first approach
  - [HTTP](./../.././docs/pages/HTTP.md) [content negotiation](./../.././docs/pages/Content%20Negotiation.md)
  - International [SEO](./../.././docs/pages/Search%20Engine%20Optimization.md) built-in ([hreflang](./../.././docs/pages/hreflang.md))
  - Subpath routing
  - International payments built-in (PayPal + [Toss](./../.././docs/pages/Toss.md))
- [Impact over Performance](./../.././docs/pages/Impact%20over%20Performance.md)
- Business Performance over Technical Performance
- Day One Deploy
- Perfect for Indie Developers

## Current Selections

### Approach 1

- [Redwood](./../.././docs/pages/Redwood.js.md), Render, Clerk, Chakra, Inlang + [Across the Sprachraums](./../.././docs/pages/Across%20the%20Sprachraums.md), [GitHub](./../.././docs/pages/GitHub.md) CI/CD
- [i18n with Redwood](./../.././docs/pages/i18n%20with%20Redwood.md)

#### Pro

- ORM built-in
- Takes care of [GraphQL](./../.././docs/pages/GraphQL.md) fuzz

#### Con

- Their [i18n](./../.././docs/pages/Internationalization.md) sucks. Especially setting up subpath routing for [Redwood](./../.././docs/pages/Redwood.js.md).
- Non-[GPT](./../.././docs/pages/Generative%20Pre-trained%20Transformer.md)-able, since v1 came out mid 2022

### Approach 2

- [Next.js](./../.././docs/pages/Next.js.md), [Supabase](./../.././docs/pages/Supabase.md) [DB](./../.././docs/pages/Database.md), [Supabase](./../.././docs/pages/Supabase.md) Auth, [Supabase](./../.././docs/pages/Supabase.md) Storage, [CloudFlare](./../.././docs/pages/Cloudflare.md), Chakra

#### Pro

- Most resources
- ~~Good [i18n](./../.././docs/pages/Internationalization.md) support~~ turns out Next 13 removed it and introduced a more manual one

#### Con

- Need to set up the integration
- Sometimes lack of a proper [back-end](./../.././docs/pages/Back-end.md) sucks

## Conclusion

After cracking [i18n with Redwood](./../.././docs/pages/i18n%20with%20Redwood.md), decided with approach 1
