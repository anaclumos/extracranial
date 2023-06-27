---
lang: 'en'
slug: '/9DC5BA'
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
- The `useLocaleRedirect` caused some problems when a user lands on Heimdall in a non-English locale context and logged in
  - Clerk needs some initial load time, for example, 2s, for the Clerk Login SDK to load
  - After logging in, conditionally loading `<SignIn>` caused an Error on Clerk, that rendering `<SignIn>` when users are logged in is illegal. Thus, Clerk was redirected to the default locale. This happened within the after 2 seconds when Clerk figured that it was logged in, and when React was unmounting the `<SignIn>` widget.
  - Because `useLocaleRedirect` sends to English by default, the original locale will be lost
  - To get over this, I created two features:
    - Save to local storage on the user's locale
    - redirect within the `useEffect` hook (Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.)
    - ![[11C976.png]]
- Also used HOC to inject callback when `<SignIn>` gets dismissed. I have to do this? Really?

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

- Implemented [Create PostgreSQL DB Tables & ORM · Issue #24 · anaclumos/heimdall](https://github.com/anaclumos/heimdall/issues/24)
- How can we scrape the web, with JavaScript enabled? Problems are Access Restricted SPAs like Twitter.
- [Inngest - Effortless serverless queues, background jobs, and workflows](https://www.inngest.com/)
- [Turns websites into data — Microlink](https://microlink.io/)
- [microlinkhq/browserless](https://github.com/microlinkhq/browserless): browserless is an efficient way to interact with a headless browser built in top of Puppeteer.
- [Creating a Background Worker with Exec and Faktory](https://redwoodjs.com/docs/how-to/creating-a-background-worker-with-exec-and-faktory)
- [adamschwartz/web.scraper.workers.dev](https://github.com/adamschwartz/web.scraper.workers.dev): Scrape websites for text by CSS selector.
- [anaclumos/parser-api](https://github.com/anaclumos/parser-api): 🚀 A drop-in replacement for the Postlight Parser API.
