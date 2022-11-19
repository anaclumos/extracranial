---
lang: 'en'
slug: '/9F6699'
---

- listening socket" (a.k.a. a "master socket")
- binds it to a [[port]] and waits for a connection request.
- client connects to this master socket and gets a connection socket
- reuses this client socket for persistent connection
- think of it like an air traffic control
  - you first communicate with air traffic control (master socket) to get the landing lane (client socket)
  - but you don't land cargo (client message) at the air traffic control (master socket)
