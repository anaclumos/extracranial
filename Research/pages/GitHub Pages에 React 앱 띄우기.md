---
date: 2020-10-05
slug: '/7DE619'
---

최근 React 앱을 GitHub Pages에 띄우면 좋겠다는 생각을 했다. 그렇게 된다면 배포 과정을 GitHub 상에서 처리함으로써 대역폭도 절약하고 서버 구조도 단순화 시킬 수 있을 것이라 생각했다. 그래서 이를 위한 boilerplate 코드를 만들어보았다.

## 요점

- GitHub에는 `docs` 폴더를 자동으로 랜딩 페이지처럼 만들어주는 [기능](https://pages.github.com/)이 있다.
- Create-React-App은 완성본을 `build` 폴더에 저장한다.
- 앱을 빌드할 때마다 자동으로 `/build` 폴더에서 `/docs` 폴더로 내용물을 옮긴다면 마치 CI/CD를 구축한 효과를 얻을 수 있을 것이다.

## 구현

```
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build && rm -rf docs && mv build docs",
  "test": "react-scripts test --verbose",
  "eject": "react-scripts eject"
},
```

`yarn build` 명령을 통해 `docs` 폴더 안의 앱을 최신 빌드로 업데이트 할 수 있다.

## 결과

- [anaclumos/react-on-github-pages](https://github.com/anaclumos/react-on-github-pages)

### Updated Nov 19, 2020

- 만약 빌드된 웹앱의 폴더나 파일에 `_` 가 들어간다면 루트 `index.html` 옆에 `.nojekyll` 파일을 추가해줘야 한다. 업데이트에 약간 시간이 걸리니 최소 10분을 기다려 보자. [Reference](https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/)
