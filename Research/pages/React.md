---
lang: 'en'
slug: '/18043C'
---

> React (also known as React.js or ReactJS) is a free and open-source [[Front-end|front-end]] JavaScript library for building user interfaces based on [[UIUX|UI]] components. It is maintained by [[Meta (Company)|Meta]] (formerly [[Facebook]]) and a community of individual developers and companies. React can be used as a base in the development of single-page, mobile, or server-rendered applications with frameworks like [[Next.js]]. However, React is only concerned with state management and rendering that state to the [[DOM]], so creating React applications usually requires additional libraries for routing and certain client-side functionality. [React (JavaScript library)](<https://en.wikipedia.org/wiki/React_(JavaScript_library)>)

## Articles

### [New React docs pretend SPAs don't exist anymore | Wasp](https://wasp-lang.dev/blog/2023/03/17/new-react-docs-pretend-spas-dont-exist)

- React just released their new docs at [https://react.dev/](https://react.dev/). While it looks great and packs a lot of improvements, one section that caught the community's attention is "[Start a New React Project](https://react.dev/learn/start-a-new-react-project)". The strongly recommended way to start a new React project is to use a framework such as [[Next.js]], while the traditional route of using bundlers like Vite or [[Create React App|CRA]] is fairly strongly discouraged
- Traditionally, React was only a [[UIUX|UI]] library in your stack of choice. You would use [[Create React App|CRA]] (or Vite nowadays) as a bundler/starter for your React project
- There are also new frameworks emerging that focus on this particular use case (e.g., [RedwoodJS](https://redwoodjs.com/) and [Wasp](https://wasp-lang.dev) (disclaimer: this is us!)) whose flagship feature is not [[Server-side Rendering|SSR]], but rather the abstraction of API and CRUD on data models, and getting full-stack functionality from [[UIUX|UI]] to the [[database]], with extra features such as easy authentication and deployment out of the box
- With a "go for Next or you are unusual" and "you need [[Server-side Rendering|SSR]]" message, React is making a strong signal against other solutions that don't emphasize [[Server-side Rendering|SSR]] as their main feature
