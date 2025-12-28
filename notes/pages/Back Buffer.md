---
lang: 'en'
slug: '/6B5F02'
---

> In computer science, **multiple buffering** is the use of more than one buffer to hold a block of data, so that a **reader** will see a complete (though perhaps old) version of the data rather than a partially updated version of the data being created by a **writer**. [Multiple buffering](https://en.wikipedia.org/wiki/Multiple_buffering).

Used in [[Game Programming]], you write data on the back buffer.
When the rendering is complete, you swap it with the front buffer.
