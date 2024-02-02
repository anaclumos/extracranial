---
lang: 'en'
slug: /CF7070
---

I migrated my website, [[Aldehyde]] (part of Project [[Extracranial]]), to [[FlightControl]].

## Background

Before [[Aldehyde Outage (January 2023)]], the [[extracranial]] workflow was simple — [[git]] push, wait for 10 minutes for [[Vercel]] to build it, and then voila you have the updated website.

As [[Aldehyde]] became bigger and bigger, with thousands of documents and images, the ram usage started to spike. Then, on January 2023, [[Aldehyde]] became too big to fit inside a [[Vercel]] builder. More information on [[Aldehyde Outage (January 2023)]].

Ever since, I had to change my workflow to building it locally and pushing it to [[Cloudflare Worker|Cloudflare workers]]. While this workflow worked, I had to wait for 20 minutes for it to build and wait 5 minutes to deploy. [Sometimes wrangler would fail on a specific network](https://github.com/cloudflare/workers-sdk/issues/1194?notification_referrer_id=NT_kwDOAeMNUrMzNzU5MjEzODgyOjMxNjU3Mjk4#issuecomment-1622839913); [sometimes the build would never finish and I had to keep the program running forever](https://github.com/facebook/docusaurus/issues/9754#issuecomment-1913166305). In the end, it was **not** a delightful experience so to speak. Finally for some reason; the cache control seemed slightly awkward; a full [[JavaScript|JS]]-[[CSS]] redownload seemed to happen whenever I deploy my website. AFAIK [[docusaurus]] has its internal hash output generator, but [[Cloudflare Pages]] seemed to override it? I haven't investigated more but on [[Cloudflare Pages]], I noticed far more flashing repaints.

After getting a [positive first impression](https://twitter.com/anaclumos/status/1746728735989256507) on [[FlightControl]], I naturally moved some of my projects off from [[Vercel]] and [[Cloudflare Pages]]. The best part was that I pay the [[AWS]] fees and thus I don't need to worry about exceeding the build limit (in either time or space). Build taking longer? I can just pay more. Build takes too much RAM? Change the Codebuild instance to a higher one.

Finally, ever since [[Winning Backdrop Build v2 (December 2023)]], I had \$\$\$ of [[AWS]] credits I needed to use in the next 2 years; but [[AWS]] [[DX]] is a pain compared to a more modern solutions like [[Vercel]] or [[Cloudflare Pages]]... and I didn't want to spend weeks of dev-hours just trying to configure EC2s. But also at the same time I didn't want to just let go all these valuable credits... so I was in this difficult checkmated position but [[FlightControl]] came to rescue me.

Anyways.

## Configuring [[AWS Fargate]] Dockerfiles

[[FlightControl]]'s [[AWS Fargate]] are provisioned with Dockerfiles, so I had to write some dockerfiles to make sure it builds correctly. I use a jankily frankensteined pipe of [[Python]] and Node to generate my website (duh, I know) and needed a Dockerfile instead of using just Nixfiles.

```Dockerfile
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

As seen in [[Aldehyde Outage (January 2023)]], weirdly [[Docusaurus]] consumes more memory than [[Chrome]] and I needed a bigger code builder. I didn't want to make the [[AWS Fargate]] instance itself bigger because that would just waste money when for the 99% of the runtimes I wouldn't need that processing power. Luckily there was a very [straightforward way to bump only the builder](https://www.flightcontrol.dev/docs/troubleshooting/configure-codebuild). This is one of the greatest benefit of working on top of [[AWS]]; everything is already there.

## Configuring Root Domain

[[FlightControl]] Docs only mentioned they only supported [[DNS]] with `ALIAS` keyword, and thus because [[Cloudflare]] does not support the `ALIAS` keyword, there was no way to configure the root domain.

But apparently it **was** indeed possible! Using CNAME-flattening on [[Cloudflare]], I was able to configure root domain directly to [[Cloudflare]] (or [[AWS]], under the hood?). More info here: [[Configuring Root Domain on FlightControl with CloudFlare]]. I reported this information to [[FlightControl]], and they responded:

import DisplayFlex from '@site/src/components/DisplayFlex'

<DisplayFlex>

<figure>

![[5945C9.png]]

<figcaption>

Before

</figcaption>

</figure>

<figure>

![[A151E8.png]]

<figcaption>

After

</figcaption>
</figure>

</DisplayFlex>

I guess they'll update the docs soon. As I noted, I guess this is the charm of working with an early stage engineering product team! You also contribute to the product as a early adopter.

## Special thanks to the top-notch customer support

Along the way the Developer Support was **awesome**. Replies within 2 hours. Docs everywhere. I heard they were a very small team at the moment; I just hope they don't get Vercelized where their indie [[hacker]] dev support gets worse day after day.

## Conclusion

I'll slowly move toward all my hobby or work related stuff to [[FlightControl]]. I think I found a hidden gem. I am willing to pay Prosumer plan (like [[GitHub]]),
