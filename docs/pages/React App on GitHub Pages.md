---
date: 2020-10-05
slug: '/01460C'
---

- GitHub Pages에 React 앱 띄우기

Recently I came across the idea of publishing a [React](./../.././docs/pages/React.md) App on GitHub Pages. I can distribute my [React](./../.././docs/pages/React.md) App using GitHub, further saving server bandwidth and simplifying the API server structure. I have created a boilerplate for this structure.

## Key points

- GitHub has a [feature](https://pages.github.com/) that automatically posts the `docs` folder into a small landing page.
- Create-React-App builds its results into a `build` folder.
- So if I can automatically move files from `/build` to `/docs` whenever I build the app, it would work as if I have set up a CI/CD structure.

## Implementation

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build && rm -rf docs && mv build docs",
  "test": "react-scripts test --verbose",
  "eject": "react-scripts eject"
},
```

The `yarn build` command will replace the docs folder with a newer build of the app.

## Result

- [anaclumos/react-on-github-pages](https://github.com/anaclumos/react-on-github-pages)

<head>
  <html lang="en-US"/>
</head>
