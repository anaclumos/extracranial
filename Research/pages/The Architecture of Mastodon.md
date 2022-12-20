---
lang: 'en'
slug: '/BEF810'
---

## [[Matt Rickard]]

### [The Architecture of Mastodon](https://matt-rickard.ghost.io/the-architecture-of-mastodon/)

- Ruby on Rails Web App
- PostgreSQL Persistence Layer
- Agnostic S3/SMTP File Storage and Mailer
- Redis for Precomputed Social Feed Cache and Worker Queue
- Sidekiq for Background Processing
- Node Handler for Streaming (Notifications, New posts, etc.)
- Problems
  - Rails does not have declarative components.
  - Rails monolith is harder to scale.
  - Rails is hard to serve at the edge. CDN can host static assets, but templates in the core RoR process render most pages.
  - All of these make developer workflow harder. Containerization, [[Kubernetes]], and modern [[front-end]] stacks are challenging to work with in Rails.
