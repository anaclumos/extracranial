---
lang: 'en'
slug: '/17D18B'
---

[Grammarly Work Note](./../.././docs/pages/Grammarly%20Work%20Note.md)

[Manakin](./../.././docs/pages/Manakin.md), as an internal-facing product of [Grammarly](./../.././docs/pages/Grammarly.md), has many spaces to improve.

1. **Outdated Node and [React](./../.././docs/pages/React.md)**. [Manakin](./../.././docs/pages/Manakin.md) runs on [Node.js](./../.././docs/pages/Node.js.md) 16 with [Create React App](./../.././docs/pages/Create%20React%20App.md). [Node.js](./../.././docs/pages/Node.js.md) 16 sunsets on September of 2023 and [CRA](./../.././docs/pages/Create%20React%20App.md) is already discouraged from the [React](./../.././docs/pages/React.md) team.
2. **The Lack of Local [Back-end](./../.././docs/pages/Back-end.md) Testings**. The [back-end](./../.././docs/pages/Back-end.md), written in [Spring Boot](./../.././docs/pages/Spring%20Boot.md), does not have a local testing method.
3. **The Lack of Unit Testings**. A lack of testing suites can lead to future fiascos.
4. **Inconsistent Style Enforcements**. Some files do not have style enforced, discovered by running npx [prettier](./../.././docs/pages/Prettier.md) --write. On par with [Prettier](./../.././docs/pages/Prettier.md), we could link [ESLint](./../.././docs/pages/ESLint.md) and make it automatically check before every [Pull Request](./../.././docs/pages/Pull%20Request.md) with tools like [Husky](./../.././docs/pages/Husky.md).
5. **Ad-hoc [Styled Components](./../.././docs/pages/Styled%20Components.md)**. While we have a `components` folder, many elements are designed ad-hoc with [Styled Components](./../.././docs/pages/Styled%20Components.md).

Most of these root from the fact that [Manakin](./../.././docs/pages/Manakin.md) is an internal tool. If it gets the job done, there is no need to fix or improve nitty gritty performances or details. That being said, the entire codebase is very neatly organized and maintained in a way that I would not believe this is [CRA](./../.././docs/pages/Create%20React%20App.md) with Node 16, and it is already driving experiments that incur millions of dollars in revenue.

> [Avoid Premature Optimizations](./../.././docs/pages/Avoid%20Premature%20Optimizations.md). Even further, can we avoid optimizations **at all**? ...if the target customers are okay with it.
