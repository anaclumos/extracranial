---
lang: 'en'
slug: /B32F9A
---

> Ladies and gentlemen, I pleased to announce my latest app:
>
> Introducing Explode  
> · Send disappearing texts & photos inside iMessage  
> · Only the sender needs the app: Drop them right into your chats  
> · Screenshots are blocked too
>
> Why did we build it? Explode is a spite app. Yes, an… [pic.twitter.com/mGwmoN28T8](https://t.co/mGwmoN28T8)
>
> -- Nikita Bier (@nikitabier) [January 14, 2025](https://twitter.com/nikitabier/status/1879206793118658974?ref_src=twsrc%5Etfw)

On [2025-01-15](./../.././docs/journals/2025-01-15.md), Nikita Bier released his newest app Explode. I was seemingly building with the exact concept, most notably:

- Disappearing messages that 100% rely on iMessage App Toolkits
- Screenshot Prevention
- [App Clips](./../.././docs/pages/App%20Clips.md) integration so that the receiver doesn't need to download the app
  - (though, at the end I decided to drop this so that people will be "forced" to download, which I think has pros and cons)

I did have some nice friends to tell me about this launch:

;

<Horizontal>

<figure>

![EAE392.png](./../.././docs/assets/EAE392.png)

</figure>

<figure>

![CFC7AF.png](./../.././docs/assets/CFC7AF.png)

</figure>

</Horizontal>

As much as I feel [ideas are worthless](./../.././docs/pages/Ideas%20are%20worthless.md); in this very specific example, it required some very specific knowledge on Apple's Ecosystem, such as utilizing [App Clips](./../.././docs/pages/App%20Clips.md) or [Block Screenshots in iOS](./../.././docs/pages/Block%20Screenshots%20in%20iOS.md). iOS MessageKit was severely underutilized still to this day, and these were small [remora](./../.././docs/pages/The%20Paradoxical%20Moon%20Philosophy.md) products that sometimes the idea itself makes a difference, such as how Flighty succeeded with its edge on utilizing the Dynamic Island.

<Horizontal>

<figure>

![AE6FB5.gif](./../.././docs/assets/AE6FB5.gif)

</figure>

<figure>

![7681FE.gif](./../.././docs/assets/7681FE.gif)

</figure>

</Horizontal>

As much as I feel some sour gripe that someone else has launched a successful product, I must acknowledge that he has been working on this to create the smoothest experience possible.

<Accordions>
<Accordion title="He basically pulled every single growth levers I could ever think of...">

<figure>

![6A9632.gif](./../.././docs/assets/6A9632.gif)

</figure>

<figure>

![4FBA41.png](./../.././docs/assets/4FBA41.png)

</figure>

<figure>

![53A5CE.png](./../.././docs/assets/53A5CE.png)

</figure>

<figure>

![738EF9.png](./../.././docs/assets/738EF9.png)

</figure>

> Ok hear me out.  
> Snapchat but it works in iMessage [pic.twitter.com/Aia984yZ6v](https://t.co/Aia984yZ6v)
>
> -- Explode App (@explodeapp) [January 14, 2025](https://twitter.com/explodeapp/status/1879253412539433060?ref_src=twsrc%5Etfw)

<figure>

![574079.png](./../.././docs/assets/574079.png)

</figure>

> naming your company Tap Get to boost app downloads is absolutely genius [https://t.co/5uzefnmbwX](https://t.co/5uzefnmbwX) [pic.twitter.com/kLCU3FACpE](https://t.co/kLCU3FACpE)
>
> -- juan (@juanbuis) [January 14, 2025](https://twitter.com/juanbuis/status/1879215293513572615?ref_src=twsrc%5Etfw)

> Using an ascii arrow on input placeholder + PiP instructions is also genius [@nikitabier](https://twitter.com/nikitabier?ref_src=twsrc%5Etfw) is truly built different [pic.twitter.com/cJqWZCbDzG](https://t.co/cJqWZCbDzG)
>
> -- Olivier (@StonkyOli) [January 14, 2025](https://twitter.com/StonkyOli/status/1879267066555056446?ref_src=twsrc%5Etfw)

<figure>

![246C13.png](./../.././docs/assets/246C13.png)

</figure>

<figure>

![9E72D2.png](./../.././docs/assets/9E72D2.png)

</figure>

- https://x.com/StonkyOli/status/1879267066555056446
- https://x.com/john_tans/status/1879310772289105967
- https://x.com/spottedinprod/status/1879290007288177007

</Accordion>
</Accordions>

I especially don't know how he got through the app store review process, considering that it technically breaks the Live Activity guidelines.

I do remember him asking on twitter how to show messages `+` button on a messages sheet, probably like couple months ago. So he must've been building this for months now...

Yet, it's an interesting implementation to analyze.
