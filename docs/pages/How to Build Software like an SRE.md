---
lang: 'en'
slug: '/C7113C'
---

- Original Text: [How to Build Software like an SRE](https://www.willett.io/posts/precepts/)

## Coding

- no in-code fallbacks for configs.
  - just crash it.
- stringent [Remote Procedure Call](./../.././docs/pages/Remote%20Procedure%20Call.md) settings.
  - no **retry** or long **timeouts**
- local testing
- avoid state managing

## Merging

- use [Git](./../.././docs/pages/Git.md)
- don't die for code coverage
- real-world validation matters. unit test < integration test < prod test
- make infra changes obvious
- keep error logs, [CPU](./../.././docs/pages/CPU.md) usage, and request error rates

## Deploying

- use [Docker](./../.././docs/pages/Docker.md)
- deploy everything all-the-time
  - prevents silent breakage
- validate at the same time
- instant deploy
  - it may sound counterintuitive, but it buys us early time to disable a problematic feature flag

## Operating

- use [Kubernetes](./../.././docs/pages/Kubernetes.md)
- use helm
  - never touch [k8s](./../.././docs/pages/Kubernetes.md) directly.
- avoid operators
  - keep it simple
- run 3 of everything
  - _Like with backups, two is one, and one is none. Additionally, ensure (like, actually verify, in production) that 2 of the 3 "things" can handle the full load by themselves – otherwise, you don't really have the failure tolerance you think you do._
  - do you see [Kakao](./../.././docs/pages/Kakao.md)?
- structured logs

<head>
  <html lang="en-US"/>
</head>
