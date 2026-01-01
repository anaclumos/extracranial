---
lang: 'en'
slug: '/96B109'
---

[Letter](./../.././docs/pages/Mail.md) to Mr. Matt Rickard on 2022-12-21

:::info

This is an reply to [Architecture of Mastodon](./../.././docs/pages/Architecture%20of%20Mastodon.md)

:::

Dear Mr. [Rickard](./../.././docs/pages/Matt%20Rickard.md),

> Another example of this is Ghost... another Rails [monolith](./../.././docs/pages/Monolith.md).

AFAIK Ghost is [Node.js](./../.././docs/pages/Node.js.md), not Rails! [https://github.com/TryGhost/Ghost](https://github.com/TryGhost/Ghost)

But you have a great point; you once mentioned that most tech services could be abstracted to an [edge](./../.././docs/pages/Edge.md)-served [Front-end](./../.././docs/pages/Front-end.md) and [back-end](./../.././docs/pages/Back-end.md) as [edge](./../.././docs/pages/Edge.md)-replicated simple data storage. I was also a long-time Ghost user, and I agree that Ghost's tech stack can be vastly simplified as such. Ghost's central-hosted-ness was helpful in some niches (ex: I can keep writing where I left off on my other devices), but Ghost, or "Writing Services," can be much better.

It would be much better to see a first-class [serverless](./../.././docs/pages/Serverless.md) [email](./../.././docs/pages/Mail.md) [API](./../.././docs/pages/API.md) (as in doing slightly more than Nodemailer or EmailEngine, i.e., [SMIME](./../.././docs/pages/SMIME.md) or, more recently -- [Brand Indicators for Message Identification](./../.././docs/pages/BIMI.md) [BIMI](./../.././docs/pages/BIMI.md)) Just like what [Vercel](./../.././docs/pages/Vercel.md) did to Heroku.

Best Regards,

Sunghyun Cho

## Reply on [2022-12-21](./../.././docs/journals/2022-12-21.md)

> Maybe the tech will steer us towards a backward compatible path at some point (i.e., automatically split a [monolith](./../.././docs/pages/Monolith.md) for popular frameworks)
