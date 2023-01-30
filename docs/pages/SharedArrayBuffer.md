---
lang: 'en'
slug: '/58CA40'
aliases: ['SAB']
---

- [SharedArrayBuffer - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)

SharedArrayBuffer is an object that holds a fixed-length binary buffer.
You can pass around comparably longer data with SharedArrayBuffer between agents (i.e., main thread and worker.)
A change in one ShardArrayBuffer will reflect on the other side.

```js
const sab = new SharedArrayBuffer(1024)
worker.postMessage(sab)
```

The [Spectre](./../.././docs/pages/Spectre.md) vulnerability seized ShardArrayBuffer in 2018, and since 2020, ShardArrayBuffer requires a Secure Context to run.

For the host document, I need two headers to enable ShardArrayBuffer.

- [`Cross-Origin-Opener-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy) with `same-origin` as value (protects your origin from attackers)
- [`Cross-Origin-Embedder-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy) with `require-corp` as value (protects victims from your origin)

<head>
  <html lang="en-US"/>
</head>
