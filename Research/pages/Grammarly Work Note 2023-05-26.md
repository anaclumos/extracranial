---
lang: 'en'
slug: '/17D18B'
---

[[Manakin]], as an internal-facing product of [[Grammarly]], has many spaces to improve.

1. **Outdated Node and React**. [[Manakin]] runs on [[Node.js]] 16 with [[Create React App]]. [[Node.js]] 16 sunsets on September of 2023 and [[Create React App|CRA]] is already discouraged from the [[React]] team.
2. **The Lack of Local Back-end Testings**. The back-end, written in [[Spring Boot]], does not have a local testing method.
3. **The Lack of Unit Testings**. A lack of testing suites can lead to future fiascos.
4. **Inconsistent Style Enforcements**. Some files do not have style enforced, discovered by running `npx prettier --write`. On par with [[Prettier]], we could link [[ESLint]] and make it automatically check before every [[Pull Request]] with tools like [[Husky]].
5. **Ad-hoc [[Styled Components]]**. While we have a `components` folder, many elements are designed ad-hoc with [[Styled Components]].

Most of these root from the fact that [[Manakin]] is an internal tool. If it gets the job done, there is no need to fix or improve nitty gritty performances or details. That being said, the entire codebase is very neatly organized and maintained in a way that I would not believe this is CRA with Node 16, and it is already driving experiments that incur millions of dollars in revenue.

> [[Avoid Premature Optimizations]]. Even further, can we avoid optimizations **at all**? ...if the target customers are okay with it.
