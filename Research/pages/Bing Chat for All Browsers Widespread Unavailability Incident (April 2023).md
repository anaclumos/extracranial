---
lang: 'en'
slug: '/AB7939'
---

[No longer working on Chrome (gives "Open in Microsoft Edge" window) · Issue #74 · anaclumos/bing-chat-for-all-browsers](https://github.com/anaclumos/bing-chat-for-all-browsers/issues/74)

## The Problem

- A lot of people can still use Bing with this extension. Unfortunately, this includes my friends; we could not replicate the problem.
- However, the number of people reporting issues about being blocked spiked.
- This is possibly Bing slowly rolling out a new type of browser detection. We are still determining what this is at the moment.
- While some reported that the [[Chrome]]/[[Firefox]] version did not work and changing the user agent manually worked, others said changing the user agent did not. Therefore, the methods provided did not work for these few users except for using the native Edge.

## What went wrong?

After 12 hours of investigation, I found that Bing added a _somewhat_ proprietary header that encodes the User Agent: `UserAgentReductionOptOut`. After faking that as well, it now works again.

![[38BB75.png]]
![[FF32E1.png]]

What the hell, [[Bing]]...

More info: [UserAgentReductionOptOut HTTP response header](https://webtechsurvey.com/response-header/useragentreductionoptout)

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">What the hell, <a href="https://twitter.com/bing?ref_src=twsrc%5Etfw">@bing</a> <br/><br/>My Bing Chat extension had global unavailability for the past 12 hours. It&#39;s now fixed.<br/><br/>Turns out Bing wrote their proprietary header. After faking that as well, it now works again. <a href="https://t.co/IpySsVodg5">pic.twitter.com/IpySsVodg5</a></p>&mdash; Sunghyun Cho (@anaclumos) <a href="https://twitter.com/anaclumos/status/1648582997678129154?ref_src=twsrc%5Etfw">April 19, 2023</a></blockquote><blockquote class="twitter-tweet"><p lang="en" dir="ltr">What the hell, <a href="https://twitter.com/bing?ref_src=twsrc%5Etfw">@bing</a> <br/><br/>My Bing Chat extension had global unavailability for the past 12 hours. It&#39;s now fixed.<br/><br/>Turns out Bing wrote their proprietary header. After faking that as well, it now works again. <a href="https://t.co/IpySsVodg5">pic.twitter.com/IpySsVodg5</a></p>&mdash; Sunghyun Cho (@anaclumos) <a href="https://twitter.com/anaclumos/status/1648582997678129154?ref_src=twsrc%5Etfw">April 19, 2023</a></blockquote>
