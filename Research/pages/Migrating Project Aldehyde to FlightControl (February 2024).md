---
lang: 'en'
slug: /CF7070
---

I migrated my website, [[Aldehyde]] (part of Project [[Extracranial]]), to [[FlightControl]].

<figure>

![[4AEADB.png]]

<figcaption>

[I love their Spaceship themes! You get a random spaceship for every project you create.](https://www.overnice.com/case/product-for-flightcontrol).

</figcaption>

</figure>

## Background

Before [[Aldehyde Outage (January 2023)]], the [[extracranial]] workflow was simple — [[git]] push, wait for 10 minutes for [[Vercel]] to build it, and then voila you have the updated website.

As [[Aldehyde]] grew, with thousands of documents and images, the RAM usage started to spike. Then, on January 2023, [[Aldehyde]] became too big to fit inside a [[Vercel]] builder. More information on [[Aldehyde Outage (January 2023)]].

I have had to change my workflow to build it locally and push it to [[Cloudflare Worker|Cloudflare workers]]. While this workflow worked, I had to wait 20 minutes for it to build and 5 minutes to deploy. [Sometimes wrangler would fail on a specific network](https://github.com/cloudflare/workers-sdk/issues/1194?notification_referrer_id=NT_kwDOAeMNUrMzNzU5MjEzODgyOjMxNjU3Mjk4#issuecomment-1622839913); [sometimes the build would never finish and I had to keep the program running forever](https://github.com/facebook/docusaurus/issues/9754#issuecomment-1913166305). In the end, it was **not** a delightful experience. Finally, the cache control seemed slightly awkward; a full [[JavaScript|JS]]-[[CSS]] redownload happens whenever I deploy my website. As far as I know, [[docusaurus]] has its internal hash output generator, but [[Cloudflare Pages]] seemed to override it. I haven't investigated more, but I noticed far more flashing repaints on [[Cloudflare Pages]]. (Long story short, AWS CloudFront had far fewer repaints and seemed to cache things correctly)

After getting a [positive first impression](https://twitter.com/anaclumos/status/1746728735989256507) on [[FlightControl]], I naturally moved some of my projects off from [[Vercel]] and [[Cloudflare Pages]]. The best part was that I paid the [[AWS]] fees, and thus, I didn't need to worry about exceeding the build limit (in either time or space). Is the building taking longer? I can pay more. Does the build takes too much RAM? Change the CodeBuild instance to a higher one. Problems that can be solved with money are the most straightforward. Unfortunately, Vercel or Cloudflare does not allow me to pay for more build time or RAM.

Finally, ever since [[Winning Backdrop Build v2 (December 2023)]], I had \$\$\$ of [[AWS]] credits I needed to use in the next two years, but [[AWS]] [[DX]] is a pain compared to more modern solutions like [[Vercel]] or [[Cloudflare Pages]]... and I didn't want to spend weeks of dev-hours just trying to configure EC2s. But also, at the same time, I didn't want to let go of all these valuable credits... so I was in this checkmated position, but [[FlightControl]] came to rescue me.

Anyways.

## Configuring [[AWS Fargate]] Dockerfiles

[[FlightControl]]'s [[AWS Fargate]] are provisioned with Dockerfiles, so I had to write some dockerfiles to make sure they build correctly. I used a jankily frankensteined pipe of [[Python]] and Node to generate my website (duh, I know) and needed a Dockerfile instead of using just Nixfiles.

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

## Bumping up [[AWS CodeBuild]] size

As seen in [[Aldehyde Outage (January 2023)]], weirdly, [[Docusaurus]] chugged more memory than [[Chrome]], and I needed a bigger code builder. I didn't want to make the [[AWS Fargate]] instance itself bigger because that would waste money when I wouldn't need that processing power for 99% of the runtimes. Luckily, there was a very [straightforward way to bump only the builder](https://www.flightcontrol.dev/docs/troubleshooting/configure-CodeBuild). This is one of the most incredible benefits of working on top of [[AWS]]; everything is already there.

## Configuring Root Domain

[[FlightControl]] Docs only mentioned they only supported [[DNS]] with the `ALIAS` keyword. Thus, there was no way to configure the root domain because [[Cloudflare]] does not support the `ALIAS` keyword.

But it **was** indeed possible! Using CNAME-flattening on [[Cloudflare]], I was able to configure the root domain directly to [[Cloudflare]] (or [[AWS]], under the hood?). More info here: [[Configuring Root Domain on FlightControl with CloudFlare]]. I reported this information to [[FlightControl]], and they responded:

import DisplayFlex from '@site/src/components/DisplayFlex'

<DisplayFlex>

<figure>

![[E68961.png]]

<figcaption>

Original Response

</figcaption>

</figure>

<figure>

![[40C34D.png]]

<figcaption>

After sharing my so-called "workaround"

</figcaption>
</figure>

</DisplayFlex>

As I noted, this is the charm of working with an early-stage engineering product team! You also contribute to the product as an early adopter.

## Special thanks to the top-notch customer support

Along the way, the Developer Support was **excellent**. Replies within 2 hours. I heard they were a tiny team now; I hope they don't get Vercelized, where their indie [[hacker]] dev support worsens daily.

## Conclusion

I'll slowly move toward all my hobbies or work-related stuff to [[FlightControl]]. I found a hidden gem. I am willing to pay for a Prosumer plan (like [[GitHub]]), but I am delighted with their permissive and generous free plan.

<figure>

![[25D46A.png]]

</figure>
