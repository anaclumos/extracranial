---
lang: 'en'
slug: '/5593D7'
---

In the world of [Generative AI](./../.././docs/pages/Generative%20AI.md)s, can we think [Database](./../.././docs/pages/Database.md) as Gen [AI](./../.././docs/pages/AI.md) models instead of key-value storages?

### [Fuzzy Databases](https://matt-rickard.ghost.io/fuzzy-databases/)

- Different trade-offs already give rise to significantly different types of databases - from OLTP to OLAP, relational to non-relational, key-value, graph, document, and object [database](./../.././docs/pages/Database.md) (to name a few
- If you squint, [LLMs](./../.././docs/pages/LLM.md) resemble something like a vector search [database](./../.././docs/pages/Database.md). Items are stored as embeddings, and queries return deterministic yet fuzzy results. What you lose in data loading time (i.e., model training), you make up for in compression (model size) and query time (inference). In the best case, models denoise and clean data automatically. The schema is learned rather than declared
- Authorization is done through public-key infrastructure, and a generalized computing model can be built on top of the distributed ledger (e.g., the EVM
- SQLite/DuckDB answer this question. While neither can support concurrent writes from different processes and are limited in other terms of horizontal scaling, they can be easier to use and can fit in more workflows ([e.g., serverless, edge, browser](https://matt-rickard.com/sqlite-renaissance)). In many cases, they are operationally much easier to manage than a traditional [database](./../.././docs/pages/Database.md).
