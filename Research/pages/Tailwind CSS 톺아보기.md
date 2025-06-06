---
slug: '/4B15E0'
---

[[2021-07-14]]

## [[Project|프로젝트]] 목표

- [[Tailwind]] [[CSS]]를 임의의 [[Next.js|TypeScript Next]] [[Project|프로젝트]]에 적용
- [[Tailwind]] [[CSS]] 디자인 패턴에 대한 기초적인 이해
- [[Tailwind]] [[CSS]] 디자인 시스템에 대한 기초적인 이해

## 완성본 미리 보기

- https://design-cho-sh.vercel.app/tailwind-docs/chatbubble
- https://design-cho-sh.vercel.app/tailwind-docs/case-study-card
- https://design-cho-sh.vercel.app/tailwind-docs/user-email-form

## 원본 자료

[Documentation - Tailwind CSS](https://tailwindcss.com/docs/)

### #0 [[Project|프로젝트]] 설정

- 기초적인 [[TypeScript]] [[Next.js|Next]] App 설정

```bash
 yarn create next-app --typescript
```

- `./styles/*` 삭제
- `pages/_app.tsx` [[CSS]] 관련 코드 삭제 (또는 아래와 같이 입력)

```ts
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

export default App
```

- `pages/index.tsx` [[CSS]] 관련 코드 삭제 (또는 아래와 같이 입력)

```ts
import Head from 'next/head'

const index = () => (
  <>
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1>H1 Title</h1>
  </>
)

export default index
```

## #1 [[Tailwind]]를 Next에 추가

- 필수 요소 설치

```bash
yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest
```

- 다음 명령으로 `tailwind.config.js`와 `postcss.config.js` 생성

```bash
yarn tailwindcss init -p
```

- 사용하지 않은 Style 코드에 대한 삭제 옵션 추가

```js
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

- 최종적으로 Tailwind [[CSS]]를 `pages/_app.tsx`에 추가

```ts
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

const App = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

export default App
```

## #2 디자인 코드 분석

### 1\. Chat Bubble

[https://design-cho-sh.vercel.app/tailwind-docs/chatbubble](http://design-cho-sh.vercel.app/tailwind-docs/chatbubble)

```ts
import Image from 'next/image'
import Favicon from '../../public/favicon.ico'

const chatbubble = () => (
  <div className="flex h-screen">
    <div className="p-6 max-w-sm m-auto bg-white rounded-xl shadow-md flex items-center space-x-4 border-2">
      <div className="shrink-0 relative">
        <div className="h-12 w-12">
          <Image layout="fill" src={Favicon} alt="Favicon" />
        </div>
      </div>
      <div>
        <div>
          <div className="text-xl font-medium text-black">Chat Bubble</div>
          <p className="text-gray-500">You have a message.




        </div>
      </div>
    </div>
  </div>
)

export default chatbubble
```

### [원본 코드](https://tailwindcss.com/docs/utility-first)와 변경점

- `class` 대신 `className` 사용 (React)
- `next/image` 사용. `next/image`는 여전히 [[HTML]] `<img>`를 생성하지만 이미지 최적화 등에서 강점을 지님. 다만 [[Tailwind]] 자체의 `h-12`, `w-12` 등의 `className`이 지원되지 않아 Wrapper Div가 필요함.

```ts
- <img class="h-12 w-12" src="../../public/favicon.ico" alt="Favicon">
+ <div className='h-12 w-12'>
+   <Image layout='fill' src={Favicon} alt='Favicon' />
+ </div>
```

- Wrapper Div 추가로 화면에 중앙 정렬

```ts
<div className='flex h-screen'>
-  <div className='mx-auto'>
+  <div className='m-auto'>
</div>
```

- `border-2`로 2px 테두리 추가

### 키워드 분석

- `flex`: display flex
- `h-screen`: 컴포넌트 높이를 화면에 맞춰줌 ( `height: 100vh;` )
- `p-6`: 컴포넌트 padding 1.5rem (24px)
- `max-w-sm`: 컴포넌트 최대 너비 24rem (384px)
- `m-auto`: margin-auto. Wrapper Div의 `flex h-screen`과 함께 컴포넌트를 중앙 정렬. `mx-auto`는 좌우로 `margin-auto`, `my-auto`는 상하로 `margin-auto`.
- `bg-white`: background white
- `rounded-xl`: 컴포넌트 border-radius를 0.75rem로 설정 (12px)
- `shadow-md`: `0 4px 6px -1px rgba(0, 0, 0, 0.1)` 중간 사이즈 그림자 적용. 이들은 각각 `offset-x | offset-y | blur-radius | spread-radius | color`를 뜻함. [참고](https://tailwindcss.com/docs/box-shadow)
- `items-center`: align-items: center
- `space-x-4`: 컴포넌트 사이의 좌우 간격 설정
- `border-2`: border 2px
- `shrink-0`: 컴포넌트를 `shrink`하거나 `wrap`하지 않음.
- `relative`: position relative
- `h-12`, `w-12`: height, width를 3rem (48px)로 설정
- `layout: fill`: `next/image`에서 이미지를 상위 컴포넌트에 맞게 Stretch. Stretch하지 않으려면 `layout: responsive` 사용.
- `text-xl`: 폰트 사이즈 1.25rem (20px) 그리고 line-height 1.75rem (28px)
- `font-medium` font-weight 500

### 2\. [[Case Study]] Card

```ts
import Image from 'next/image'

const CaseStudyCard = () => (
  <div className="flex h-screen">
    <div className="max-w-md m-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl border-2">
      <div className="md:flex">
        <div className="md:shrink-0">
          <div className="h-48 object-cover md:h-full md:w-48 relative">
            <Image src="https://cataas.com/cat" alt="Man looking at item at a store" layout="fill" objectFit="cover" />
          </div>
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>
          <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
            Finding customers for your new business
          </a>
          <p className="mt-2 text-gray-500">
            Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your
            first customers.





        </div>
      </div>
    </div>
  </div>
)

export default CaseStudyCard
```

### [원본 코드](https://tailwindcss.com/docs/responsive-design)와 변경점

- 위와 동일
- `next/image`에서 `layout='fill'`과 `objectFit='cover'`을 동시에 사용하면 상위 컴포넌트에 가득 차도록 확대되며( `layout='fill'` ) 사진을 stretch하지 않고 넘치는 부분을 잘라낸다 ( `objectFit='cover'` )

### 키워드 분석

- `md:flex`: 미디어쿼리로 `@media (min-width: 768px)`가 넘어가는 순간 display: flex가 적용됨.
- 나머지는 위와 유사

### 3\. User Email Form

```ts
const UserEmailForm = () => {
  const signupUser = async (event: React.FormEvent) => {
    event.preventDefault()
  }
  return (
    <div className="flex h-screen p-6 bg-green-100">
      <div className="m-auto space-y-3">
        <div className="w-full px-6 py-5 mx-auto space-y-1 overflow-hidden transition duration-500 transform border-2 border-green-500 border-opacity-25 rounded-lg cursor-pointer select-none hover:border-2 group hover:shadow-lg motion-reduce:transform-none hover:scale-105">
          <p className="text-lg font-semibold text-green-600">New Project




          <p className="text-green-500">Create a new project from a variety of starting templates.




        </div>
        <form className="flex w-full m-auto mx-auto space-x-3" onSubmit={signupUser}>
          <input
            className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 transition duration-500 transform bg-white border-2 border-green-500 border-opacity-25 rounded-lg appearance-none hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent motion-reduce:transform-none hover:scale-105"
            placeholder="Your Email"
            type="email"
          />
          <button
            className="shrink-0 px-4 py-2 text-base font-semibold text-white transition duration-500 transform bg-green-600 rounded-lg hover:shadow-lg focus:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200 motion-reduce:transform-none hover:scale-105 tramsform"
            type="button"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserEmailForm
```

### [원본 코드](https://tailwindcss.com/docs/hover-focus-and-other-states)와 변경점

- 위와 동일
- Hover & Focus 디자인 변화
- Transition & Transform 사용
- [Headwind](https://marketplace.visualstudio.com/items?itemName=heybourn.headwind) 사용

### 키워드 분석

- `cursor-pointer`
- `motion-reduce:transform-none`: 사용자의 디바이스가 Reduce Motion으로 설정된 경우 Transform 동작들을 실행하지 않음
- `transition`: 기본적으로 `background-color`, `border-color`, `color`, `fill`, `stroke`, `opacity`, `box-shadow`, `transform`, `filter`, `backdrop-filter`에 150ms의 `cubic-bezier(0.4, 0, 0.2, 1)` transition을 걸음
- `duration-500`: `transition-duration: 500ms;`으로 변경함
- `transform`
- `cursor-pointer`
- `hover:scale-105` & `hover:shadow-lg`: 개인적으로 가장 마음에 드는 조합. 컴포넌트가 공중으로 떠오르는 느낌을 준다. [직접 테스트](https://design-cho-sh.vercel.app/tailwind-docs/user-email-form)

## 분석

개인적으로 매우 마음에 들었다. 이전에는 [TypeScript Next에](https://github.com/anaclumos/typescript-next-styled-component) [`styled-component`](https://github.com/anaclumos/typescript-next-styled-component)를 집중적으로 사용했었는데 그에 비한 [[Tailwind]]의 장점으로 다음 느낌이 들었다.

(개인적인 분석으로, 개발자 혹은 기업체의 코딩 스타일과 컨벤션에 따라 크게 달라질 수 있음.)

1. 클래스 네이밍에 신경을 쓰지 않음. `styled-component`의 경우 `StyledContainer`, `StyledLink`, `StyledContent` 등의 이름을 반복해서 작성했었다.
2. 짧아진 코드. 코드가 위아래로 길어지는 것을 방지한다. `styled-component`의 경우 ```으로 [[CSS]] 코드를 감싼 후 [[CSS]] 코드를 줄바꿈하여 작성하기 때문에 코드가 길어지곤 했었다.
3. 스타일의 변경이 비교적 안전. 스타일을 수정해도 컴포넌트의 `className`을 변경하는 것이기 때문에 다른 컴포넌트의 디자인이 바뀔 일이 없다.
4. 낮은 러닝커브. 예전에는 [[Tailwind]]의 `className` 속성 이름을 일일이 외워야 하는 줄 알고 러닝커브가 높을 줄 알았는데 대부분의 `className`이 [[CSS]] 속성들로 네이밍되어 있을 뿐만 아니라 확장 프로그램을 사용하여 자동완성을 사용하면 됐다.
5. [완성도 높은 기본 색상 템플릿](https://tailwindcss.com/docs/customizing-colors). `font-weight`를 고르듯이, 기본 색상 템플릿만으로도 충분히 완성도 높은 디자인이 완성된다.

그에 반해서 다음과 같은 단점이 있었다.

1. Style code를 간편하게 재활용하고 싶은 때가 있다. 예를 들어 `styled-component`로 `StyledButton`를 만든 후 하나의 `tsx` 페이지 안에서 재활용하고 싶은 경우가 있는데 [[Tailwind]]의 기본적인 사용법으로는 Style code를 빠르게 재활용할 수 없다. 물론 이 문제를 해결하기 위해서는 Template Literal로 코드를 분리해서 사용하면 된다.
2. 코드 `className`의 순서가 섞인다. 이 문제는 [[Visual Studio Code|VS Code]]를 사용할 경우 [Headwind](https://marketplace.visualstudio.com/items?itemName=heybourn.headwind)라는 확장 프로그램으로 해결할 수 있다.
3. [코드가 옆으로 길어지고 가독성이 떨어짐](https://github.com/anaclumos/tailwind-shadowboxing/blob/39ed43f0079645686a1321022b5820b3a5f9f828/pages/tailwind-docs/user-email-form.tsx#L22). 이 문제가 특히 신경 쓰였다. 물론 다음과 같이 강제로 접을 수는 있겠으나 조금 번거로웠다. 이 문제를 해결할 방법을 알아보고 있다.

```
className={`w-full px-6 py-5 mx-auto space-y-1 overflow-hidden
transition duration-500 transform border-2 border-green-500
border-opacity-25 rounded-lg cursor-pointer select-none hover:border-2
group hover:shadow-lg motion-reduce:transform-none hover:scale-105`}
```
