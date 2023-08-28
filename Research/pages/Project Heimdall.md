---
lang: 'en'
slug: '/9DC5BA'
aliases: ['헤임달', 'Heimdall']
---

![[F7BA33.png]]

> Heimdall's All-Seeing Eyes — Heimdall sees and hears, all thanks to his extrasensory capabilities. His sight can extend across all Nine Realms, and he can see 10 trillion souls from the Bifrost Observatory. Asgardians call him from other worlds, such as Earth, Jotunheim, and Sakaar. [Heimdall On Screen Powers, Enemies, History](https://www.marvel.com/characters/heimdall/on-screen)

## [[2023-04-19]]

- [[Project Heimdall Initial Planning]]

## [[2023-05-11]]

- [[Boring Report]]

## [[2023-05-16]]

- [[Project Heimdall Random Names]]

## [[2023-05-18]]

- [[Simple Analytics War Room]] on [[Hacker News]]

## [[2023-06-17]]

- [[Project Heimdall Table Structure]]

## [[2023-06-18]]

- Honestly, the [[Go To Market|GTM]] [[strategy]] for Heimdall is a considerable concern. How are we going to do that?
- [[Project Heimdall Locale Transition Strategy]]
- [[Project Linguine]]

## [[2023-06-20]]

import DisplayFlex from '@site/src/components/DisplayFlex'

<DisplayFlex>

![[EBD79C.png]]

![[AC5118.png]]

</DisplayFlex>

Implemented Nav bar!

## [[2023-06-21]]

- Implemented Login with Clerk
- ![[7BF55A.gif]]
- The `useLocaleRedirect` caused some problems when a user landed on Heimdall in a non-English locale context and logged in
  - Clerk needs some initial load time, for example, 2s, for the Clerk Login SDK to load
  - After logging in, conditionally loading `<SignIn>` caused an Error on Clerk, that rendering `<SignIn>` when users are logged in is illegal. Thus, Clerk was redirected to the default locale. This happened within the next 2 seconds when Clerk figured that it was logged in and when [[React]] was unmounting the `<SignIn>` widget.
  - Because `useLocaleRedirect` sends to English by default, the original locale will be lost
  - To get over this, I created two features:
    - Save to local storage on the user's locale
    - [[redirect]] within the `useEffect` hook (Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.)
    - ![[11C976.png]]
- Also used HOC to inject callback when `<SignIn>` gets dismissed. Do I have to do this? Really?

  ````tsx
  const withUnmountFunction = (WrappedComponent, onUnmount) => {
    return function (props) {
      useEffect(() => {
        return () => {
          if (typeof onUnmount === 'function') {
            onUnmount()
          }
        }
      }, [])
      return <WrappedComponent {...props} />
    }
  }
  ```

  ```tsx
  const SignInWithUnmountFunction = withUnmountFunction(SignIn, () => {
    setSignInOpen(false)
  })
  ````

## [[2023-06-26]]

- Implemented [Create PostgreSQL DB Tables and ORM · Issue #24 · anaclumos/heimdall](https://github.com/anaclumos/heimdall/issues/24)
- How can we scrape the web with [[JavaScript]] enabled? Problems are Access Restricted SPAs like [[Twitter]].
- [Inngest - Effortless serverless queues, background jobs, and workflows](https://www.inngest.com/)
- [Turns websites into data — Microlink](https://microlink.io/)
- [microlinkhq/browserless](https://github.com/microlinkhq/browserless): browserless is an efficient way to interact with a [[headless]] [[Web Browser|browser]] built in top of Puppeteer.
- [Creating a Background Worker with Exec and Faktory](https://redwoodjs.com/docs/how-to/creating-a-background-worker-with-exec-and-faktory)
- [adamschwartz/web.scraper.workers.dev](https://github.com/adamschwartz/web.scraper.workers.dev): Scrape websites for text by [[CSS]] selector.
- [anaclumos/parser-api](https://github.com/anaclumos/parser-api): 🚀 A drop-in replacement for the Postlight Parser API.

## [[2023-06-27]]

Created an [[Microservices Architecture|MSA]]-style micro worker that will continuously fetch, load, and summarize [[Hacker News|HN]] contents!

![[3E60AC.gif]]

## [[2023-07-11]]

I was very close to shutting down all small locales. It costs too much while driving me so little value. People are spamming the [[newsletter]] mailing list by enrolling in all lists. I thought all small locale lists were like that so far. But then... I found one Danish user.

![[6D3186.png]]

This person was the only one on the Danish list.

But... it changed my mind. I was moved. Ok... I'll keep the small-medium sprachraums.

Every hour, the processor will:

- For all [[newsletter]] that is
  - non-deleted
  - has a non-deleted subscriber
- Get content from the web
- Generate Summary
- Send [[Mail|Email]]

Also, instead of having one [[newsletter]] that could be transformed into many languages, let's start with 30 different [[Newsletter|newsletters]] covering the same content. That is, separating the linguistic [[UIUX|UI]] from the [[newsletter]] content. So in a [[한국어|Korean]] interface, you can go to [[Hacker News]] [[일본어|Japanese]] version and read the content accordingly.

## [[2023-07-13]]

Completed the [[Project Linguine]] [[Engine]]. [[Linguine Engine Test Drive Result 2023-07-13]]

## [[2023-07-15]]

[[twitter]]과 마스토돈 따로 다루기

## [[2023-07-16]]

[Float UI - Free open source Tailwind UI components & Templates](https://floatui.com/)

## [[2023-07-17]]

I am having trouble dealing with the Subscription Recurrence [[problem]]. Given a subscription table, how would I find all currently scheduled jobs?

- iCalendar RFC 5545?
- Cron notation?

## [[2023-07-30]]

Halted, switched to a more conventional [[Docusaurus]] with [[Listmonk]]. Consider [[Project]] [[Done]].

- Impossible to create subscriptions with [[Toss Payments]] with international audience
- Burnt out
- Will seek out sponsorships more

## [[2023-08-01]]

![[AA6185.png]]

## [[2023-08-02]]

[[Heimdall Bogus Subscribers Attack Incident]]

## [[2023-08-07]]

Added RSS Support. [RSS Support · Issue #16 · anaclumos/heimdall](https://github.com/anaclumos/heimdall/issues/16)

## [[2023-08-08]]

- Resend made SMTP, will try it out
- [isCategoryIndex function does not propagate to URL generations · Issue #9213 · facebook/docusaurus](https://github.com/facebook/docusaurus/issues/9213)
-
