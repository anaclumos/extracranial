---
lang: 'en'
slug: '/BEF810'
---

### [The Architecture of Mastodon](https://matt-rickard.ghost.io/the-architecture-of-mastodon/)

- [Mastodon](./../.././docs/pages/Mastodon.md)
- [Matt Rickard](./../.././docs/pages/Matt%20Rickard.md)
- Ruby on Rails Web App
- PostgreSQL Persistence Layer
- Agnostic S3/[SMTP](./../.././docs/pages/SMTP.md) File Storage and Mailer
- Redis for Precomputed Social Feed Cache and Worker Queue
- Sidekiq for Background Processing
- Node Handler for Streaming (Notifications, New posts, etc.)
- Problems
  - Rails does not have declarative components.
  - Rails [monolith](./../.././docs/pages/Monolith.md) is harder to scale.
  - Rails is hard to serve at the [edge](./../.././docs/pages/Edge.md). [CDN](./../.././docs/pages/CDN.md) can host static assets, but templates in the core RoR process render most pages.
  - All of these make developer workflow harder. Containerization, [Kubernetes](./../.././docs/pages/Kubernetes.md), and modern [front-end](./../.././docs/pages/Front-end.md) stacks are challenging to work with in Rails.
