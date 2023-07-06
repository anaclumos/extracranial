---
date: 2020-11-27
slug: '/E0C34F'
---

## Source

이 글은 아래 튜토리얼을 공부하고 분석한 글이다. 이 글이 도움이 되었다면 내 저장소 대신 아래 저장소에 스타를 눌러주자.

- [https://fireship.io/lessons/wasm-video-to-gif/](https://fireship.io/lessons/wasm-video-to-gif/)
- [GitHub 저장소](https://github.com/fireship-io/react-wasm-gif-maker)
- [Fireship.io 유튜브 채널](https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA)

## 과정

- 다음 문장을 통해 `create-snowpack-app`으로 gif-converter라는 [[Project|프로젝트]]를 생성한다.

```bash
npx create-snowpack-app gif-converter --template @snowpack/app-template-react
```

- 다음 문장을 통해 `ffmpeg.wasm`을 설치한다. (실제 [[WebAssembly|WASM]] 파일은 사용자의 웹페이지에서는 [[CDN]]을 통해 async하게 로딩됨. 여기서 설치하는 것은 Wrapper인 것 같다.)

```bash
npm install @ffmpeg/ffmpeg @ffmpeg/core
```

- 그 다음 `snowpack`을 설치한다.

```bash
npm install snowpack --save-dev
```

- 다음 명령어로 테스트 가능하다. snowpack을 위 문장으로 설치하는 대신 `npm i -g snowpack`으로 글로벌하게 설치했다면 `snowpack dev`를 하면 된다.

```bash
npm start
```

- src/App.jsx

```jsx
import React, { useState, useEffect } from 'react'
import './App.css'

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
const ffmpeg = createFFmpeg({ log: true })

function App() {
  const [ready, setReady] = useState(false)
  const [video, setVideo] = useState()
  const [gif, setGif] = useState()

  const load = async () => {
    await ffmpeg.load()
    setReady(true)
  }

  useEffect(() => {
    load()
  }, []) // blank [] makes it run once.

  const convertToGif = async () => {
    // Write the file to memory
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video))

    // Run the FFMpeg command
    await ffmpeg.run(
      '-i', // input flag
      'test.mp4', // video source input
      '-t', // time flag
      '2.5', // for 2.5 seconds
      '-ss', // starting secont flag
      '2.0', // offset for 2 seconds
      '-f', // file
      'gif', // encode as gif file
      'out.gif' // write file to out.gif
    )

    // Read the result
    const data = ffmpeg.FS('readFile', 'out.gif')

    // Create a URL
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }))
    setGif(url)
  }

  return ready ? (
    <div className="App">
      {video && <video controls width="250" src={URL.createObjectURL(video)}></video>}
      <input type="file" onChange={(e) => setVideo(e.target.files?.item(0))} />
      <h3>Result</h3>
      <button onClick={convertToGif}>Convert</button>
      {gif && <img src={gif} width="250" />}
    </div>
  ) : (
    <p>Loading...</p>
  )
}

export default App
```

- FFMpeg는 in-memory file system을 사용한다.
- 다음과 같은 형태의 JS 문법을 사용하여 `gif`가 JS 기준 false(null, undefined, false...)가 아닐 때만 렌더링되도록 만들 수 있다.

```jsx
{
  gif && <img src={gif} width="250" />
}
```

## [[GitHub]] Pages에 Snowpack App 호스팅 및 시행착오

- [기존에 사용하던 방식](https://blog.chosunghyun.com/kr-react-app-on-github-pages/)으로 GitHub Pages에 띄우려고 했다. 그런데 `_dist_` 폴더의 `index.html`에서 404 Not Found가 발생했다.
- 빌드하면서 `docs` 폴더 및 `build` 폴더를 초기화하는 스크립트 추가 (기존 방식에서도 포함하고 있는 기능인데 처음에는 단순히 폴더명을 `build`에서 `docs`로 바꾸는 기능만 넣고 이 부분을 포함하지 않았다.) 문제가 해결되지 않았다.
- `gh-pages`를 사용해보았다. 문제가 해결되지 않았다.
- 그 다음 `touch docs/.nojekyll`해보았다. 작동하지 않았다. (나중에 알게 됐지만 이게 해결책이었다. GitHub Pages가 Environment 탭에서는 Deploy 되었다고 나타나는데 반해 실제로는 업데이트되지 않아서 이게 해결책이 아닌 줄 알았다.)
- 또 다음과 같이 `snowpack.config.js`에서 `baseUrl`을 변경해주었다. (이것도 필요한 해결책이었다. 나의 GitHub Pages는 subdirectory에 호스팅하기 때문에 이와 같은 옵션이 필요하다. [참고 링크 1](https://github.com/snowpackjs/snowpack/discussions/848), [참고 링크 2](https://github.com/snowpackjs/snowpack/discussions/1377))

```js
buildOptions: {
  baseUrl: '/ffmpeg-wasm-gif-converter-study/',
},
```

- Production 폴더의 `_dist_` 디렉토리의 이름을 `static`으로 변경했다. 이는 snowpack.config.js에서 다음 코드를 변경함으로써 가능하다. (실제로는 불필요한 변경이었다.)

```js
mount: {
  public: '/',
  src: '/static',
},
```

- 이는 또한 public/index.html에서 src를 변경해주었다. 위의 Discussion Post들을 볼 때 여기를 `%PUBLIC_URL%`으로 해야하는 것 같은데, 일단 ./static/index.js을 사용했다. 이를 통해서 index.[[html]]은 로딩되었다.

```html
<script type="module" src="./static/index.js"></script>
```

- 하지만 여전히 `_snowpack_` 폴더 내부의 파일이나 `web_modules` 폴더 내의 결과물은 404 Not Found 상태였다.
- 이때부터 GitHub Pages가 `_` 폴더를 인식하지 못한다는 것을 알게 되었다.
- 약간의 조사를 해 보니 GitHub Pages에 기본으로 포함된 Jekyll 전처리 기능 때문이라는 것을 알게 되었다. [참고 링크](https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/)
- 때문에 다시 `.nojekyll` 파일을 추가해보았다. `npm run build` 명령어를 다시 수정해 다음 명령어를 추가했다. 이를 통해 [[Project|프로젝트]]를 build할 때마다 자동으로 `.nojekyll` 파일이 추가되도록 만들었다.

```bash
... && touch docs/.nojekyll
```

- 여전히 문제가 발생했다. 조사를 해보니 [[GitHub]] Pages가 Environment 탭에서는 Deploy 되었다고 나오는데 실제로는 업데이트되는데 시간이 더 걸리는 문제인 것 같았다. [참고 링크](https://stackoverflow.com/questions/47356997/pushed-nojekyll-file-to-github-pages-no-effect)
- 웹앱의 `title`도 바꿔봤는데 Production 웹사이트에서는 변경되지 않는 것을 볼 때 업데이트에 약간의 시간이 걸리는 것이라고 판단했다.
- 웹앱이 업데이트되고 난 후 `_snowpack_/env.js`가 정상적으로 로딩됨을 확인했다. 하지만 여전히 `web_modules`는 404 Not Found가 나타났다.
- create-snowpack-app을 쓸 경우 `.gitignore`에 `web_modues`가 추가되는 문제 때문이었다. 원래 `web_modules`는 GitHub에 `node_module`처럼 안 올라가야 맞는데, 지금의 경우에는 GitHub을 [[CDN]]처럼 활용하는 것으므로 `web_modules`가 필요하다.
- 정상적으로 동작함을 확인했다.
- 다만 [[Safari]]와 [[Firefox]]에서는 작동되지 않았다. "[[SharedArrayBuffer]] is not defined"이라는 오류가 발생했다.
- 조사해본 결과 ffmpeg.wasm은 현재 [[Chrome]]에서만 동작하기 때문이라고 한다 ([참고 링크 1](https://github.com/ffmpegwasm/ffmpeg.wasm/issues/63#issuecomment-621103820).) [ffmpeg.wasm 공식 데모 사이트](https://ffmpegwasm.github.io/#demo)에 [[Safari]]나 [[Firefox]]로 접근하면 다음 오류가 나타난다.

> Your [[Web Browser|browser]] doesn't support [[SharedArrayBuffer]], thus ffmpeg.wasm cannot execute. Please use latest version of [[Chromium]] or any other [[Web Browser|browser]] supports [[SharedArrayBuffer]].

## 해결책 정리

Create-Snowpack-App을 GitHub Pages에 올리기 위해서는 다음을 해야한다.

- 빌드 결과물에 .nojekyll 파일 추가하기
- snowpack.config.js에 buildOptions.baseUrl 추가하기
- GitHub Pages는 업데이트에 시간이 조금 걸리니 충분히 기다리기
- ffmpeg.[[WebAssembly|wasm]]은 [[Chrome]]을 사용해 구동하기 (2020/11 기준)

## 완성본

- [github.com/anaclumos/ffmpeg-wasm-gif-converter-study/](https://github.com/anaclumos/ffmpeg-wasm-gif-converter-study/)
- [chosunghyun.com/ffmpeg-wasm-gif-converter-study/](https://chosunghyun.com/ffmpeg-wasm-gif-converter-study/) ([[Chrome]] Only)

## 아쉬운 점

- Random Commit이 많았다. [[GitHub]] Pages에 정상적으로 결과가 반영되는지를 확인하기 위해 일단 업로드해야했기 때문이다. 결과적으로 [[GitHub]]의 설정 (`.nojekyll` 등) 때문에 오류가 발생됐던 것이라 불가피했다고 생각한다.
