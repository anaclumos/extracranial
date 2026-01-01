---
lang: 'en'
slug: '/3E4C5F'
---

- The closer to this bullet, the higher level it is.
- **Application**. FTP, [SMTP](./../.././docs/pages/SMTP.md), [HTTP](./../.././docs/pages/HTTP.md). Handles _Messages_. SSL belongs here
- **Presentation**. Encryption, Compression. Machine specific.
- **Session**. Synchronization, Checkpointing, Recovery.
- **Transport**. TCP. UDP. [TCP vs UDP](./../.././docs/pages/TCP%20vs%20UDP.md). Handles **Segments**.
- **Network**. [IP](./../.././docs/pages/IP.md). Routing Protocols. Handles **Datagrams**.
- **Link**. Ethernet, Wi-Fi, Point-to-Point Protocol (PPP). Handles **Frames**.
- **Physical**. Wire.
- The closer to this bullet, the lower level it is.

Note that a TCP message is not a packet because it is a byte stream.
