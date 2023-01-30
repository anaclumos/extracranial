---
lang: 'en'
slug: '/AB70E4'
---

It seems like multiple issues are combined.

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

![[761432.png]]

## [[2023-01-29]]

Investigating RAM Options. Supported a ticket to [[Cloudflare]]

```
--max-old-space-size=4096
```

Did not help.