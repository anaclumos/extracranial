---
lang: 'en'
slug: '/9D0248'
---

This is my go-to prompt for benchmarking whether an AI is smart or not.

```
Let's say we have a service that allows users to set a routine CRON job. How can we store and efficiently run them on the service provider side? I want an efficient strategy ONLY with DB (no message queues)
```

If it used `next_run_at` timestamp, the AI is smart. Otherwise, such as composite indexing and matching as string parsing in DB, it's dumb.
