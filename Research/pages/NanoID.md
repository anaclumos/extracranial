---
lang: 'en'
slug: '/FE0834'
aliases: ['NanoIDs']
---

NanoID is a tiny, secure, URL-friendly, unique string ID generator for [[JavaScript]]. It's 130 bytes minified, has no dependencies, and is safe, secure, and fast. NanoID uses a cryptographically secure random generator to reduce the risk of collisions. Although it's not as well-known as [[UUID]], NanoID has recently expanded and has great potential to become the leading identifier in the future. Some say that NanoID's main disadvantage is that it's not human-readable, which makes debugging harder. Also, if you use NanoID as a table's primary key, there will be problems if you use the same column as a clustered index.

[Why we chose NanoIDs for PlanetScale's API](https://planetscale.com/blog/why-we-chose-nanoids-for-planetscales-api)
