---
title: 'Remote Procedure Call with SharedArrayBuffer'
slug: '/C3CCC9'
---

## Objective

- Call a function in the worker thread and retrieve data from the main thread.
- Call a function in the main thread and retrieve data from the worker thread.
- Both _synchronously_.

## Start

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>Document</title>
    <script>
      const myWorker = new Worker('worker.js')
      myWorker.onmessage = function (e) {
        console.log(`Worker said : ${e.data}`)
      }
      function msg() {
        myWorker.postMessage('MAIN')
      }
    </script>
  </head>
  <body>
    <h1>Hello</h1>
    <button id="btn" onclick="msg()">
      Communicate with worker
    </button>
  </body>
</html>
```

```js
postMessage('Worker is ready!')

onmessage = function (e) {
  postMessage(`I am a worker. Hello, ${e.data}.`)
}
```

The type of `e` is `MessageEvent`. [MessageEvent - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent).

import WIP from '@site/src/components/WIP'

<WIP />
