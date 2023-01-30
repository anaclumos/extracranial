---
lang: 'en'
slug: '/B80EAF'
---

## Idea

So I have this network graph.

import DisplayFlex from '@site/src/components/DisplayFlex'


<figure>

![5BE46A.png](./../.././docs/assets/5BE46A.png)


</figure>

Map those into the globe on the main page:


<figure>

![F7ADEB.png](./../.././docs/assets/F7ADEB.png)


</figure>

- We might need to recreate the Globe ([COBE](https://cobejs.vercel.app/) does not support this.)
- Can I automatically update the graph?

## Reference

> I made [https://t.co/I0YSkt5x0R](https://t.co/I0YSkt5x0R) a while ago: a 5kB globe lib, and it improved our page performance\* by almost 60%.
>
> How is it created? Time for a WebGL & [shader](./../.././docs/pages/Shader.md) thread! [pic.twitter.com/7SW4vE5tTJ](https://t.co/7SW4vE5tTJ)
>
> — Shu (@shuding*) [December 28, 2021](https://twitter.com/shuding*/status/1475916082875666441?ref_src=twsrc%5Etfw)

<head>
  <html lang="en-US"/>
</head>
