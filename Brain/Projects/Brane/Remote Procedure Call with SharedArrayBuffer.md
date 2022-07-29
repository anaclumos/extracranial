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
  console.log('WORKER.onMessage:', e.data)
  postMessage(`I am a worker. Hello, ${e.data}.`)
}
```

The type of `e` is `MessageEvent`.
[MessageEvent - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent).

## Synchronous Call from Main

To enable [[SharedArrayBuffer]], we need a secure context `crossOriginIsolated`.

![By default, `crossOriginIsolated` is false.](../../Assets/Pasted%20image%2020220728154049.png)

To set `crossOriginIsolated` to true, we need two headers.

- [[Cross-Origin-Opener-Policy]]: `same-origin`
- [[Cross-Origin-Embedder-Policy]]: `require-corp`

Tim already built a super easy toolkit that sets both headers to the desired values.
Then we only need to

- `npx serve-isolated .`
- [braneproject/serve-isolated: Serve static contents under the `crossOriginIsolated` mode.](https://github.com/braneproject/serve-isolated)

![[Pasted image 20220728163149.png]]

This is so cool.

![[Pasted image 20220728163239.png]]

![[Pasted image 20220728170918.png]]

## Save Point 1

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
      console.log(
        'crossOriginIsolated',
        crossOriginIsolated
      )

      // defining SAB and sending it to the worker
      const sab = new SharedArrayBuffer(1024)
      const int32 = new Int32Array(sab)
      const myWorker = new Worker('worker.js')

      function syncSab() {
        myWorker.postMessage({
          type: 'init',
          sab: sab,
        })
      }

      myWorker.onmessage = function (e) {
        console.log(`Worker said : ${e.data}`)
      }

      function increment() {
        // ↓ Same as int32[0]++, but Thread Safe
        Atomics.add(int32, 0, 1)
        Atomics.notify(int32, 0)
      }

      function freeze() {
        // Sets [0] to 0.
        // the heartbeat function waits if [0] is 0.
        Atomics.store(int32, 0, 0)
      }
    </script>
  </head>
  <body>
    <h1>RPC Demo</h1>
    <button id="syncSab" onclick="syncSab()">
      Send SAB to Worker
    </button>
    <button id="increment" onclick="increment()">
      Increment
    </button>
    <button id="freeze" onclick="freeze()">Freeze</button>
  </body>
</html>
```

```js
postMessage('Worker is ready!')

let sab = undefined
let int32 = undefined

onmessage = function (e) {
  console.log('WORKER.onMessage:', e.data)
  if (e.data?.type === 'init') {
    sab = e.data.sab
    int32 = new Int32Array(sab)
    console.log('Received SAB')
    Atomics.wait(int32, 0, 0)
    heartbeat()
  }
  postMessage(
    `I am a worker. Hello, ${JSON.stringify(e.data)}.`
  )
}

function heartbeat() {
  setInterval(() => {
    Atomics.wait(int32, 0, 0) // doesn't beat if [0] is 0
    console.log('WORKER.heartbeat:', Atomics.load(int32, 0))
    Atomics.add(int32, 0, 1)
  }, 1000)
}
```

- Sends [[SharedArrayBuffer|SAB]] when clicking the _Send SAB to Worker_ button.
  - `[0]` is set to zero, so the heartbeat function waits.
- If _Increment_ button is clicked, [[SharedArrayBuffer|SAB]] `[0]` is no longer 0.
  - We then notify any function waiting at `[0]`.
- `heart` starts beating, incrementing [[SharedArrayBuffer|SAB]] `[0]`.

![[Pasted image 20220728173011.png]]

## Remote Procedure Call

- See [Remote procedure call - Wikipedia](https://en.m.wikipedia.org/wiki/Remote_procedure_call)
- _RPC is a [request–response](https://en.m.wikipedia.org/wiki/Request%E2%80%93response 'Request–response') protocol. An RPC is initiated by the *client*, which sends a request message to a known remote *server* to execute a specified procedure with supplied parameters. The remote server sends a response to the client, and the application continues its process. While the server is processing the call, the client is blocked (it waits until the server has finished processing before resuming execution) unless the client sends an asynchronous request to the server, such as an [XMLHttpRequest](https://en.m.wikipedia.org/wiki/XMLHttpRequest 'XMLHttpRequest')._

Note that

- `main` only `notify()`.
- `main` never `wait()`.
- `worker` will yield to `wait()`.

### Code Snippets I might use later

```js
function rpc({ func, args }) {
  const sab = new SharedArrayBuffer(1024)
  const message = {
    sharedArrayBuffer: sab,
    func,
    args,
  }
  const int32 = new Int32Array(sab)
  Atomics.store(int32, 0, Status.READY)
  worker.postMessage(message)
}
```

```js
onmessage = function (e) {
  console.log('WORKER.onMessage:', e.data)
  const sab = e.data?.sharedArrayBuffer
  const int32 = new Int32Array(sab)
  const status = Atomics.load(int32, 0)
  if (status !== Status.READY) {
    return
  }
}
```

import WIP from '@site/src/components/WIP'

<WIP />
