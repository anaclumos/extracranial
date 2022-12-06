---
lang: 'en'
slug: '/4332D0'
---

- Files are in 256kb chunks.
- At any given time, everyone has different chunks.
- The client will regularly ask for the list of chunks my peers have.
- The client will request the rarest chunk to the server
- The client sends chunks to the top 4 inbound chunk senders
- Re-evaluate every 10 seconds
- Every 30 seconds, send chunks to random peers

## Articles

### [Building a BitTorrent client from the ground up in Go | Jesse Li](https://blog.jse.li/posts/torrent/)

- This mechanism allows us to verify the integrity of each piece as we go. It makes BitTorrent resistant to accidental corruption or intentional torrent poisoning. Unless an attacker is capable of breaking SHA-1 with a preimage attack, we will get exactly the content we asked for
- Now that we have information about the file and its tracker, let’s talk to the tracker to announce our presence as a peer and to retrieve a list of other peers. We need to make a GET request to the `announce` URL supplied in the .torrent file, with a few query parameters
- can communicate using the BitTorrent protocol
- can understand and respond to our messages
- has the file that we want, or at least knows what we’re talking about
- Therefore, it’s essential to pipeline our requests to keep up with the constant pressure of some unfulfilled requests. This can increase the [[throughput]] of our connection by order of magnitude
- Notably, I left out all the glue code, parsing, unit tests, and the boring parts that build character. View my [full implementation](https://github.com/veggiedefender/torrent-client) if you’re interested
