---
lang: 'en'
slug: /B32F9A
---

![[6DDK8vCkasBE0QHU 2.gif]]

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Ladies and gentlemen, I pleased to announce my latest app:<br/><br/>Introducing Explode<br/>· Send disappearing texts &amp; photos inside iMessage<br/>· Only the sender needs the app: Drop them right into your chats <br/>· Screenshots are blocked too<br/><br/>Why did we build it? Explode is a spite app. Yes, an… <a href="https://t.co/mGwmoN28T8">pic.twitter.com/mGwmoN28T8</a></p>&mdash; Nikita Bier (@nikitabier) <a href="https://twitter.com/nikitabier/status/1879206793118658974?ref_src=twsrc%5Etfw">January 14, 2025</a></blockquote>

On [[2025-01-15]], Nikita Bier released his newest app Explode. I was seemingly building with the exact concept, most notably:

- Disappearing messages that 100% rely on iMessage App Toolkits
- Screenshot Prevention
- [[App Clips]] integration so that the receiver doesn't need to download the app
  - (though, at the end I decided to drop this so that people will be "forced" to download, which I think has pros and cons)

I did have some nice friends to tell me about this launch:

import DisplayFlex from '@site/src/components/DisplayFlex'

<DisplayFlex>

![[EAE392.png]]

![[CFC7AF.png]]

</DisplayFlex>

As much as I feel [[ideas are worthless]]; in this very specific example, it required some very specific knowledge on Apple's Ecosystem, such as utilizing [[App Clips]] or [[Block Screenshots in iOS]]. iOS MessageKit was severely underutilized still to this day, and these were small [[The Paradoxical Moon Philosophy|remora]] products that sometimes the idea itself makes a difference, such as how Flighty succeeded with its edge on utilizing the Dynamic Island.

<DisplayFlex>

![[AE6FB5.gif]]

![[7681FE.gif]]

</DisplayFlex>

As much as I feel some sour gripe that someone else has launched a successful product, I must acknowledge that he has been working on this to create the smoothest experience possible.

<details>
<summary>

He basically pulled every single growth levers I could ever think of

</summary>

![[6A9632.gif]]

![[4FBA41.png]]

![[53A5CE.png]]

![[738EF9.png]]

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Ok hear me out.<br/>Snapchat but it works in iMessage <a href="https://t.co/Aia984yZ6v">pic.twitter.com/Aia984yZ6v</a></p>&mdash; Explode App (@explodeapp) <a href="https://twitter.com/explodeapp/status/1879253412539433060?ref_src=twsrc%5Etfw">January 14, 2025</a></blockquote>

![[574079.png]]

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">naming your company Tap Get to boost app downloads is absolutely genius <a href="https://t.co/5uzefnmbwX">https://t.co/5uzefnmbwX</a> <a href="https://t.co/kLCU3FACpE">pic.twitter.com/kLCU3FACpE</a></p>&mdash; juan (@juanbuis) <a href="https://twitter.com/juanbuis/status/1879215293513572615?ref_src=twsrc%5Etfw">January 14, 2025</a></blockquote>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Using an ascii arrow on input placeholder + PiP instructions is also genius <a href="https://twitter.com/nikitabier?ref_src=twsrc%5Etfw">@nikitabier</a> is truly built different <a href="https://t.co/cJqWZCbDzG">pic.twitter.com/cJqWZCbDzG</a></p>&mdash; Olivier (@StonkyOli) <a href="https://twitter.com/StonkyOli/status/1879267066555056446?ref_src=twsrc%5Etfw">January 14, 2025</a></blockquote>

![[246C13.png]]

![[9E72D2.png]]

- https://x.com/StonkyOli/status/1879267066555056446
- https://x.com/john_tans/status/1879310772289105967
- https://x.com/spottedinprod/status/1879290007288177007

</details>

I especially don't know how he got through the app store review process, considering that it technically breaks the Live Activity guidelines.

I do remember him asking on twitter how to show messages `+` button on a messages sheet, probably like couple months ago. So he must've been building this for months now...

Yet, it's an interesting implementation to analyze.
