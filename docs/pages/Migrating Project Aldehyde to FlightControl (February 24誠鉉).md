---
lang: 'en'
slug: /CF7070
---

I migrated my website, [Aldehyde](./../.././docs/pages/Aldehyde.md) (part of Project [Extracranial](./../.././docs/pages/Extracranial.md)), to [FlightControl](./../.././docs/pages/FlightControl.md).

<figure>

<figure>

![4AEADB.png](./../.././docs/assets/4AEADB.png)

</figure>

<figcaption>

[I love their Spaceship themes! You get a random spaceship for every project you create.](https://www.overnice.com/case/product-for-flightcontrol).

</figcaption>

</figure>

## Background

Before [Aldehyde Outage (January 23誠鉉)](./../.././docs/pages/Aldehyde%20Outage%20%28January%2023%E8%AA%A0%E9%89%89%29.md), the [extracranial](./../.././docs/pages/Extracranial.md) workflow was simple -- [git](./../.././docs/pages/Git.md) push, wait for 10 minutes for [Vercel](./../.././docs/pages/Vercel.md) to build it, and then voila you have the updated website.

As [Aldehyde](./../.././docs/pages/Aldehyde.md) grew, with thousands of documents and images, the RAM usage started to spike. Then, on January 2023, [Aldehyde](./../.././docs/pages/Aldehyde.md) became too big to fit inside a [Vercel](./../.././docs/pages/Vercel.md) builder. More information on [Aldehyde Outage (January 23誠鉉)](./../.././docs/pages/Aldehyde%20Outage%20%28January%2023%E8%AA%A0%E9%89%89%29.md).

I have had to change my workflow to build it locally and push it to [Cloudflare workers](./../.././docs/pages/Cloudflare%20Worker.md). While this workflow worked, I had to wait 20 minutes for it to build and 5 minutes to deploy. [Sometimes wrangler would fail on a specific network](https://github.com/cloudflare/workers-sdk/issues/1194?notification_referrer_id=NT_kwDOAeMNUrMzNzU5MjEzODgyOjMxNjU3Mjk4#issuecomment-1622839913); [sometimes the build would never finish and I had to keep the program running forever](https://github.com/facebook/docusaurus/issues/9754#issuecomment-1913166305). In the end, it was **not** a delightful experience. Finally, the cache control seemed slightly awkward; a full [JS](./../.././docs/pages/JavaScript.md)-[CSS](./../.././docs/pages/CSS.md) redownload happens whenever I deploy my website. As far as I know, [docusaurus](./../.././docs/pages/Docusaurus.md) has its internal hash output generator, but [Cloudflare Pages](./../.././docs/pages/Cloudflare%20Pages.md) seemed to override it. I haven't investigated more, but I noticed far more flashing repaints on [Cloudflare Pages](./../.././docs/pages/Cloudflare%20Pages.md). (Long story short, AWS CloudFront had far fewer repaints and seemed to cache things correctly)

After getting a [positive first impression](https://twitter.com/anaclumos/status/1746728735989256507) on [FlightControl](./../.././docs/pages/FlightControl.md), I naturally moved some of my projects off from [Vercel](./../.././docs/pages/Vercel.md) and [Cloudflare Pages](./../.././docs/pages/Cloudflare%20Pages.md). The best part was that I paid the [AWS](./../.././docs/pages/AWS.md) fees, and thus, I didn't need to worry about exceeding the build limit (in either time or space). Is the building taking longer? I can pay more. Does the build takes too much RAM? Change the CodeBuild instance to a higher one. Problems that can be solved with money are the most straightforward. Unfortunately, Vercel or Cloudflare does not allow me to pay for more build time or RAM.

Finally, ever since [Winning Backdrop Build v2 (23誠鉉)](./../.././docs/pages/Winning%20Backdrop%20Build%20v2%20%2823%E8%AA%A0%E9%89%89%29.md), I had \$\$\$ of [AWS](./../.././docs/pages/AWS.md) credits I needed to use in the next two years, but [AWS](./../.././docs/pages/AWS.md) [DX](./../.././docs/pages/DX.md) is a pain compared to more modern solutions like [Vercel](./../.././docs/pages/Vercel.md) or [Cloudflare Pages](./../.././docs/pages/Cloudflare%20Pages.md)... and I didn't want to spend weeks of dev-hours just trying to configure EC2s. But also, at the same time, I didn't want to let go of all these valuable credits... so I was in this checkmated position, but [FlightControl](./../.././docs/pages/FlightControl.md) came to rescue me.

Anyways.

## Configuring [AWS Fargate](./../.././docs/pages/AWS%20Fargate.md) Dockerfiles

[FlightControl](./../.././docs/pages/FlightControl.md)'s [AWS Fargate](./../.././docs/pages/AWS%20Fargate.md) are provisioned with Dockerfiles, so I had to write some dockerfiles to make sure they build correctly. I used a jankily frankensteined pipe of [Python](./../.././docs/pages/Python.md) and Node to generate my website (duh, I know) and needed a Dockerfile instead of using just Nixfiles.

```docker
FROM node:latest
RUN apt-get update && apt-get install -y python3
RUN npm install -g pnpm
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm all-in-one:build
EXPOSE 3000
CMD ["pnpm", "serve"]
```

## Bumping up [AWS CodeBuild](./../.././docs/pages/AWS%20CodeBuild.md) size

As seen in [Aldehyde Outage (January 23誠鉉)](./../.././docs/pages/Aldehyde%20Outage%20%28January%2023%E8%AA%A0%E9%89%89%29.md), weirdly, [Docusaurus](./../.././docs/pages/Docusaurus.md) chugged more memory than [Chrome](./../.././docs/pages/Chrome.md), and I needed a bigger code builder. I didn't want to make the [AWS Fargate](./../.././docs/pages/AWS%20Fargate.md) instance itself bigger because that would waste money when I wouldn't need that processing power for 99% of the runtimes. Luckily, there was a very [straightforward way to bump only the builder](https://www.flightcontrol.dev/docs/troubleshooting/configure-CodeBuild). This is one of the most incredible benefits of working on top of [AWS](./../.././docs/pages/AWS.md); everything is already there.

## Configuring Root Domain

[FlightControl](./../.././docs/pages/FlightControl.md) Docs only mentioned they only supported [DNS](./../.././docs/pages/DNS.md) with the `ALIAS` keyword. Thus, there was no way to configure the root domain because [Cloudflare](./../.././docs/pages/Cloudflare.md) does not support the `ALIAS` keyword.

But it **was** indeed possible! Using CNAME-flattening on [Cloudflare](./../.././docs/pages/Cloudflare.md), I was able to configure the root domain directly to [Cloudflare](./../.././docs/pages/Cloudflare.md) (or [AWS](./../.././docs/pages/AWS.md), under the hood?). More info here: [Configuring Root Domain on FlightControl with CloudFlare](./../.././docs/pages/Configuring%20Root%20Domain%20on%20FlightControl%20with%20CloudFlare.md). I reported this information to [FlightControl](./../.././docs/pages/FlightControl.md), and they responded:

;

<Horizontal>

<figure>

<figure>

![E68961.png](./../.././docs/assets/E68961.png)

</figure>

<figcaption>

Original Response

</figcaption>

</figure>

<figure>

<figure>

![40C34D.png](./../.././docs/assets/40C34D.png)

</figure>

<figcaption>

After sharing my so-called "workaround"

</figcaption>
</figure>

</Horizontal>

As I noted, this is the charm of working with an early-stage engineering product team! You also contribute to the product as an early adopter.

## Special thanks to the top-notch customer support

Along the way, the Developer Support was **excellent**. Replies within 2 hours. I heard they were a tiny team now; I hope they don't get Vercelized, where their indie [hacker](./../.././docs/pages/Hacker.md) dev support worsens daily.

## Conclusion

I'll slowly move toward all my hobbies or work-related stuff to [FlightControl](./../.././docs/pages/FlightControl.md). I found a hidden gem. I am willing to pay for a Prosumer plan (like [GitHub](./../.././docs/pages/GitHub.md)), but I am delighted with their permissive and generous free plan.

<figure>

<figure>

![25D46A.png](./../.././docs/assets/25D46A.png)

</figure>

</figure>
