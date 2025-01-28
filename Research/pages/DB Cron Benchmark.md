---
lang: 'en'
slug: '/9D0248'
---

This is my go-to prompt for benchmarking whether an AI is smart or not.

```
Say we have a repo of CI Actions in a DB. Inside the DB, one column is a VARCHAR Cron expression. At every hour, a worker should look for all CI Actions it should execute. Note that since we run workers daily so there could be queued CI actions based on their cron that the worker needs to catch up. However we want to do this relatively fast, not by going through all O(N) entries one by one and assessing if we should run this job or not. How can we do this?
```

If it used `next_run_at` timestamp, the AI is smart. Otherwise, such as composite indexing and matching as string parsing in DB, it's dumb.
