---
lang: 'en'
slug: '/21B9AF'
---

- Peer-to-Peer Networking

## BitTorrent Algorithm

- Files are in 256kb chunks.
- At any given time, everyone has different chunks.
- The client will regularly ask for the list of chunks my peers have.
- The client will request the rarest chunk to the server
- The client sends chunks to the top 4 inbound chunk senders
- Re-evaluate every 10 seconds
- Every 30 seconds, send chunks to random peers
