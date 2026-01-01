---
lang: 'en'
slug: '/18043C'
---

> React (also known as React.js or ReactJS) is a free and open-source [front-end](./../.././docs/pages/Front-end.md) [JavaScript](./../.././docs/pages/JavaScript.md) library for building user interfaces based on [UI](./../.././docs/pages/UI%20and%20UX.md) components. It is maintained by [Meta](./../.././docs/pages/Meta%20%28Company%29.md) (formerly [Facebook](./../.././docs/pages/Facebook.md)) and a community of individual developers and companies. React can be used as a base in the development of single-page, mobile, or server-rendered applications with frameworks like [Next.js](./../.././docs/pages/Next.js.md). However, React is only concerned with state management and rendering that state to the [DOM](./../.././docs/pages/DOM.md), so creating React applications usually requires additional libraries for routing and certain client-side functionality. [React (JavaScript library)](<https://en.wikipedia.org/wiki/React_(JavaScript_library)>)

## Articles

### [New React docs pretend SPAs don't exist anymore | Wasp](https://wasp-lang.dev/blog/2023/03/17/new-react-docs-pretend-spas-dont-exist)

- React just released their new docs at [https://react.dev/](https://react.dev/). While it looks great and packs a lot of improvements, one section that caught the community's attention is "[Start a New React Project](https://react.dev/learn/start-a-new-react-project)". The strongly recommended way to start a new React project is to use a framework such as [Next.js](./../.././docs/pages/Next.js.md), while the traditional route of using bundlers like Vite or [CRA](./../.././docs/pages/Create%20React%20App.md) is fairly strongly discouraged
- Traditionally, React was only a [UI](./../.././docs/pages/UI%20and%20UX.md) library in your stack of choice. You would use [CRA](./../.././docs/pages/Create%20React%20App.md) (or Vite nowadays) as a bundler/starter for your React project
- There are also new frameworks emerging that focus on this particular use case (e.g., [RedwoodJS](https://redwoodjs.com/) and [Wasp](https://wasp-lang.dev) (disclaimer: this is us!)) whose flagship feature is not [SSR](./../.././docs/pages/Server-side%20Rendering.md), but rather the abstraction of [API](./../.././docs/pages/API.md) and CRUD on data models, and getting full-stack functionality from [UI](./../.././docs/pages/UI%20and%20UX.md) to the [database](./../.././docs/pages/Database.md), with extra features such as easy authentication and deployment out of the box
- With a "go for Next or you are unusual" and "you need [SSR](./../.././docs/pages/Server-side%20Rendering.md)" message, React is making a strong signal against other solutions that don't emphasize [SSR](./../.././docs/pages/Server-side%20Rendering.md) as their main feature
