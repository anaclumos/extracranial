---
lang: 'en'
slug: '/C7113C'
---

- Original Text: [How to Build Software like an SRE](https://www.willett.io/posts/precepts/)

## Coding

- no in-code fallbacks for configs.
  - just crash it.
- stringent [[Remote Procedure Call]] settings.
  - no **retry** or long **timeouts**
- local testing
- avoid state managing

## Merging

- use [[Git]]
- don't die for code coverage
- real-world validation matters. unit test < integration test < prod test
- make infra changes obvious
- keep error logs, [[CPU]] usage, and request error rates

## Deploying

- use [[Docker]]
- deploy everything all-the-time
  - prevents silent breakage
- validate at the same time
- instant deploy
  - it may sound counterintuitive, but it buys us early time to disable a problematic [[Feature Flag]]

## Operating

- use [[Kubernetes]]
- use helm
  - never touch [[Kubernetes|k8s]] directly.
- avoid operators
  - keep it simple
- run 3 of everything
  - _Like with backups, two is one, and one is none. Additionally, ensure (like, actually verify, in production) that 2 of the 3 "things" can handle the full load by themselves – otherwise, you don't really have the failure tolerance you think you do._
  - do you see [[Kakao]]?
- structured logs
