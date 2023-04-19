---
lang: 'en'
slug: '/AB7939'
---

[No longer working on Chrome (gives "Open in Microsoft Edge" window) · Issue #74 · anaclumos/bing-chat-for-all-browsers](https://github.com/anaclumos/bing-chat-for-all-browsers/issues/74)

## The Problem

- A lot of people can still use Bing with this extension. This includes my friends and me; we could not replicate the problem.
- However, the number of people reporting issues about being blocked spiked.
- This is possibly Bing slowly rolling out a new type of browser detection. We are still determining what this is at the moment.
- While some reported that CR/FF version did not work and changing the user agent manually worked, others said changing the user agent did not. The methods provided did not work for these few users except for using the native Edge.

## What went wrong?

After 12 hours of investigation, I found that Bing added a _somewhat_ proprietary header that encodes the User Agent: `UserAgentReductionOptOut`. After faking that as well, it now works again.

![[38BB75.png]]
![[FF32E1.png]]

What the hell, Bing...

More info: https://webtechsurvey.com/response-header/useragentreductionoptout

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Ok, so my Bing Chat extension had global unavailability for the past 12 hours. It&#39;s now fixed.<br/><br/>Turns out, Bing wrote their proprietary header? After faking that as well, it now works again. What the hell, <a href="https://twitter.com/bing?ref_src=twsrc%5Etfw">@bing</a> <a href="https://t.co/HE6j1mZgIM">pic.twitter.com/HE6j1mZgIM</a></p>&mdash; Sunghyun Cho (@anaclumos) <a href="https://twitter.com/anaclumos/status/1648582022649233408?ref_src=twsrc%5Etfw">April 19, 2023</a></blockquote>
