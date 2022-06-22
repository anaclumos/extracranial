---
title: "SharedArrayBuffer in JavaScript"
slug: "sharedarraybuffer-in-js"
---

- [SharedArrayBuffer - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/SharedArrayBuffer)

SharedArrayBuffer is an object that holds a fixed-length binary buffer.
You can pass around comparably longer data with SharedArrayBuffer between agents (i.e. main thread and worker.)
A change in one ShardArrayBuffer will reflect on the other side.

```js
const sab = new SharedArrayBuffer(1024);
worker.postMessage(sab);
```

It was once seized by Spectre bug.
