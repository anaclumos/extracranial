---
lang: 'en'
slug: '/96B109'
---

:::info
This is an reply to [[The Architecture of Mastodon]]
:::

Dear Mr. [[Matt Rickard|Rickard]],

> Another example of this is Ghost... another Rails monolith.

AFAIK Ghost is Node.js, not Rails! [https://github.com/TryGhost/Ghost](https://github.com/TryGhost/Ghost)

But you have a great point; you once mentioned that most tech services could be abstracted to an edge-served Front-end and back-end as edge-replicated simple data storage. I was also a long-time Ghost user, and I agree that Ghost's tech stack can be vastly simplified as such. Ghost's central-hosted-ness was helpful in some niches (ex: I can keep writing where I left off on my other devices), but Ghost, or "Writing Services," can be much better.

It would be much better to see a first-class serverless email API (as in doing slightly more than Nodemailer or EmailEngine, i.e., [[SMIME]] or, more recently — Brand Indicators for Message Identification [[BIMI]]) Just like what Vercel did to Heroku.

Best Regards,

Sunghyun Cho

## Reply on [[2022-12-21]]

> Maybe the tech will steer us towards a backward compatible path at some point (i.e., automatically split a monolith for popular frameworks)
