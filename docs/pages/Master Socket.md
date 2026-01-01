---
lang: 'en'
slug: '/9F6699'
---

- listening [socket](./../.././docs/pages/Socket.md)" (a.k.a. a "master [socket](./../.././docs/pages/Socket.md)")
- binds it to a [port](./../.././docs/pages/Port.md) and waits for a connection request.
- client connects to this master [socket](./../.././docs/pages/Socket.md) and gets a connection [socket](./../.././docs/pages/Socket.md)
- reuses this client [socket](./../.././docs/pages/Socket.md) for persistent connection
- think of it like an air traffic control
  - you first communicate with air traffic control (master [socket](./../.././docs/pages/Socket.md)) to get the landing lane (client [socket](./../.././docs/pages/Socket.md))
  - but you don't land cargo (client message) at the air traffic control (master [socket](./../.././docs/pages/Socket.md))
