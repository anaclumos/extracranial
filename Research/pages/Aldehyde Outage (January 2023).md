---
lang: 'en'
slug: '/AB70E4'
---

Multiple issues are combined.

## Docusaurus 2.3.0 `useSyncExternalStore` Bug

[Using Tabs will break with React 18 and Docusaurus v2.3 · Issue #8592 · facebook/docusaurus](https://github.com/facebook/docusaurus/issues/8592#event-8378524686)

## Vercel and Cloudflare Build Errors

On Cloudflare's side:

```
16:49:17.136	✔ Server: Compiled successfully in 3.74m
16:50:22.579	Segmentation fault
16:50:22.595	Failed: build command exited with code: 139
16:50:23.859	Failed: an internal error occurred
```

On Vercel's Side:

```
[success] [webpackbar] Server: Compiled successfully in 3.49m
Error: Command "yarn run build" exited with 129
```

Why..? I changed no config

![[123AA1.png]]

## [[2023-01-29]]

Investigating RAM Options. Supported a ticket to [[Cloudflare]]

```
--max-old-space-size=4096
```

Did not help.

OH FIGURED IT OUT.
It was because of insufficient RAM.
When Docusaurus seals the assets (at the end of the build cycle), the RAM usage spikes to ~4.5 GB.

![[8FBB85.png]]

Configuring [[Cloudflare Pages]] and Vercel with the following argument fixed the problem!

```
--max-old-space-size=8192
```

— Nope. Did not solve the problem.

![[695A13.png]]

So I ended up using Cloudflare Wrangler to build on my device and then sending the build result to Cloudflare. Anyways, the issue seems to be resolved.
