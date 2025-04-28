---
lang: 'en'
slug: '/7D1B84'
---

- [[Python]]

## [[Ruby]]

### [It's not Ruby that's slow, it's your database](https://berk.es/2022/08/09/ruby-slow-database-slow/)

- Let's be clear: [[ruby]] is slow. The garbage collector, JIT compiler, its highly dynamic nature, the ability to change the code runtime, and so on all add up to a sluggish language
- It's the stack that makes it slow, not just the language
- Don't use the [[database]] when avoidable, which is always more often than I think. I don't need to store the 195 countries of the world in a [[database]] and join when showing a country- dropdown. Just hardcode it or put it in config read on boot. Hell, maybe your entire product catalog of the [[e-commerce]] site can be a single [[YAML]] read on boot? This goes for many more objects than I often think
- Keep all logic out of the [[database]]. It is already the slowest point. And hardest to scale up
- Keep all [[database]] calls simple, with as few joins as possible and as few filters and sorts as possible. Databases, in general, can optimize much easier for this. This also keeps the app decoupled from the actual [[database]] details
- N+1 Queries are not always bad. Sometimes even preferred. Because they enable business logic to remain in code. And keep the logic of what to fetch in a single place, allowing performance optimization there
