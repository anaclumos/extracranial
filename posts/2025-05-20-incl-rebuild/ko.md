---
title: '의료 인공지능을 위한 차세대 MLOps 프론트엔드 🦠'
date: 2025-05-20
authors: anaclumos
slug: '/493D6F'
unlisted: true
---

<!-- truncate -->

import ReactPlayer from 'react-player'

최근 가장 많은 노력을 쏟은 것은 루닛에서의 MLOps 업무이다. 첫 직장인 이곳에서 MLOps 플랫폼의 프론트엔드 전체를 현대적으로 재개발을 리드했는데, 결과적으로 성공 반, 실패 반으로 끝났다. 그 이야기를 조심스레 해보려 한다.

## MLOps

의료 AI 기업 루닛에서는 매일 수백 개의 ML 실험들이 일어난다. 초기에는 높은 용량의 계산 성능을 경제적으로 감당하기 위해 온 프레미스 서버를 사용했지만, 수많은 수동 작업 때문에 빈번한 공수가 들었다. 우선 온 프레미스 서버는 확장이 어렵다. 팀원 수가 늘면 자원 수요가 증가하고, 마감이 다가오면 학습 수요가 급증한다. 새 하드웨어 구매에는 비용, 시간이 많이 들며, 필요한 용량 예측도 어려워 과소, 과대 투자 위험이 있다. 또한 서버 노후화로 GPU 장애가 빈번하다. 구식 GPU는 성능 저하나 고장으로 이어져 다운타임과 유지비를 높인다.

이 때문에 클라우드로의 마이그레이션을 고민했으나, 가장 큰 문제는 클라우드를 사용함에 따라서 발생하는 별도의 번거로움이었다. 일반적으로 클라우드에서는 ① 가상 머신 생성 ② 학습 환경 설정 ③ 모델 학습 ④ 클라우드 스토리지 저장 ⑤ 가상 머신 삭제의 순서를 거치는데, 이 과정 내내 사람이 번거롭게 관리해 줘야 한다. 이뿐만이 아니라, ① 실험 결과 관리 ② 로그 모니터링 ③ 오류 처리 등에서 추가적인 공수가 훨씬 더 많이 필요하다.

이 번거로운 과정을 자동화하기 위해 2021년 경부터 루닛에서는 INCL이라는 MLOps 플랫폼을 구축했다. 시중에 존재하는 [Weight & Bias](https://wandb.ai/), [Vessl](https://vessl.ai/), [SkyPilot](https://github.com/skypilot-org/skypilot)과 유사하지만, 이를 의료 AI 도메인에 맞추어 구축했다고 이해하면 된다. 대표적으로 실험 코드와 추적할 지표 이름을 제공하기만 하면 자동으로 클라우드 환경에서 실험을 진행한 뒤 보기 좋은 그래프로 정리해주는 기능을 제공한다. 덕분에 실험의 속도가 압도적으로 빨라질 수 있었고, 출시된지 4년 정도 지난 지금까지 약 800만개의 실험이 일어났다. 이에 대해서 궁금하다면 [루닛의 공식 블로그 포스트](https://medium.com/lunit/intelligent-cloud-part-1-introduction-to-lunits-cloud-deep-learning-platform-for-efficient-94fd2da2a3f2) 또는 내 [요약본](/ko/r/FC0D3A)을 참고해보자.

<figure>

![서비스 다이어그램](./02AAEE.png)

<figcaption>

VM을 만들어주고 대신 관리하는 중간 서버로 이해하면 편하다.

</figcaption>

</figure>

그러나, 회사 안에서만 쓰는 인터널 앱이라는 특성 상 어쩔 수 없이 기술 부채가 심해져갔다. 그저 _동작만_ 하면 되는 상태였기 때문이다. 때문에 최적화 또는 코드 정리는 항상 뒷전일 수 밖에 없었고, 결과적으로 굉장히 크고 무거운 웹 서비스가 되었다.

루닛에 합류한 작년 5월부터 나는 이것을 개선하자는 의견을 줄곧 피력해왔다. 첫째는 모든 동작이 수 초간의 로딩이 걸리는 것이 쌓이고 쌓여 연구자들의 시간을 달마다 수십 시간씩 뺏고 있다는 계산이고, 두 번째는 이 서비스를 개편하면 오픈 서비스로 만들 수 있겠다는 기대 때문이었다. 팀에서도 오픈 서비스로 나아가는 좋은 방향성이라는 것에 대해서 동의했다. 팀 입장에서는, 더 나아가 새로 추가하고 싶었던 기능들이 다양하게 있었는데 기존의 거대해진 코드베이스 때문에 변경이 매우 어려워졌다는 점, 그래서 사용자들이 요청하는 기능들이 항상 계류되고 있다는 점을 타파하기 위한 좋은 기회로 보았다. **동상이몽**이었지만, 어찌 되었든 INCL을 가장 매력적인 MLOps 서비스로 만들자는 점에는 동의하고 있었다.

## 네덜란드와 데이터 페칭 패러다임

다른 점에 앞서, INCL 시스템에는 직관적으로는 쉽사리 이해되지 않는 치명적인 엔지니어링 부채가 존재했으니, 모든 클라우드 리소스가 네덜란드에 존재한다는 점이다. 가장 큰 이유는 처음에 서버 위치를 선정할 당시 네덜란드 GCP 서버에 유휴 자원이 가장 많았기 때문이다. 백엔드 서버 또한 컨테이너에서 돌아가는 수많은 데이터를 기록하고 추적해야하고, 외부에 있다면 외부통신 비용이 별도로 발생하기에, 네덜란드에 있을 수 밖에 없었고, 결과적으로 모든 자원이 네덜란드에 발이 묶여버리게 되었다. 사실상 지구 반대편에 있으니, 물리적으로 시간이 오래 걸릴 수 밖에 없었다.

import { KoreaNetherlandsGlobe } from './korea-netherlands'

<KoreaNetherlandsGlobe lang="ko" />

거리가 잘 상상이 되지 않는다면 위 버튼을 눌러 거리를 직접 가늠해보자. 일부 페이지는 네트워크 요청이 4번 체인되는 경우도 있었는데, 그러면 총 **8번 저 거리를 다녀와야 한다**! 

하지만 예로부터 독한 병엔 극약처방이 필요하다고 했었던가? 난세에는 영웅이 등장하는 법이다. 이번에는 pnpm init 부터 다시 했던 관계로, 이 기술 부채를 해결하기 위해 모든 것을 변경할 수 있는 기회였다. 새로운 Next.js와 리액트 기술인 앱 라우터와 리액트 서버 컴포넌트에 맞추어 초장부터 갈아엎을 절호의 기회였고 우리의 네덜란드 이슈를 단박에 해결할 수도 있는 기술적 돌파구일 수 있었다. 때문에 초기 탐색을 하며 어떻게 서버 컴포넌트와 SWR, 그리고 부분적 프리렌더링(Partial Prerendering)을 쓸 수 있을지 각양각색으로 연구했다.

<details>
<summary>

Client Side Fetching

</summary>

- 👍 실험 데이터를 실시간으로 볼 수 있음
- 👍 SWR이나 React Query 등을 사용해 정기적으로 최신 데이터를 가져올 수 있음
- 👎 Client Fetching만 사용하면 속도가 너무 느림.
- 👎 Chained Call 최적화로 약간의 속도 향상은 가능하나 큰 차이는 없음

```mermaid
sequenceDiagram
    title Client Side Fetching
    autonumber
    actor Client
    participant Server
    participant API
    participant API2

    Client->>Server: GET example.com
    Server-->>Client: HTML
    Note over Client: JS executes (spinner)
    Client->>API: fetch()
    API-->>Client: fresh data
    Client->>API2: fetch()
    API2-->>Client: fresh data
    Client-->>Client: render UI
```

</details>

<details>
<summary>

리액트 서버 컴포넌트 (Streaming SSR 및 Partial Pre-Rendering)

</summary>

- 👍 번들 사이즈 최적화로 매우 빠른 로딩 속도
- 👎 데이터 페칭 자체를 개선하지 않음 (네덜란드 왕복 문제 해결에 큰 도움 안 됨).
- 👎 Stale-While-Revalidate 패턴으로 옛날 데이터가 먼저 보이고 백그라운드에서 업데이트됨.
- 👎 최신 정보를 보려면 누군가의 선방문이 필요하기에, 개인화된 정보가 많은 앱에는 부적합

```mermaid
sequenceDiagram
    title Partial Pre-Rendering
    autonumber
    actor Client
    participant Edge
    participant Server
    participant API
    participant API2 as "API 2"

    %% build / ISR revalidate cycle
    loop ISR
        Server->>API: fetch()
        API-->>Server: data
        Server->>API2: fetch()
        API2-->>Server: data
        Server-->>Edge: Static HTML
    end

    %% request-time
    Client->>Edge: GET example.com
    Edge-->>Client: Static HTML
    Client-->>Client: progressive render
```


</details>

## 하이브리드

```mermaid
sequenceDiagram
    title Hybrid
    autonumber
    actor Client
    participant Edge
    participant Server as Next 서버 컴포넌트
    participant API

    %% revalidate
    loop revalidate
        Server->>API: fetch()
        API-->>Server: data
        Server-->>Edge: cache update
    end

    %% request-time flow
    Client->>Edge: GET example.com
    Edge-->>Client: Stream HTML + cached seed data
    Note over Client: SWR fallback seeded

    %% client-side live update
    Client-->>API: SWR revalidate fetch
    API-->>Client: fresh data
    Client-->>Client: UI update
```


결과적으로 당시의 편법적인 방식으로 SWR의 폴백 데이터에 서버에서 온 씨드 데이터를 넣어주고, SWR의 초기 isLoading 값을 의도적으로 꺼주는 방식을 택했다. Next.js의 캐시 레이어를 활용해 Next.js 서버 컴포넌트에서 데이터를 넣어주고, Streaming SSR로 서버 컴포넌트 데이터를 즉각 SWR에 폴백 데이터로 전달하면, 번들 사이즈를 희생해 **서버 컴포넌트의 빠른 초기 로딩 속도와 SWR의 라이브 데이터를 모두 얻을 수 있다**.


- 👍 데이터 페칭 자체를 개선 (최초로 보이는 데이터는 캐시되어 있음)
- 👍 Client-side SWR로 최신 정보로 몇 초 뒤 업데이트됨
- 👍 개인화된 정보가 많은 앱에도 적합
- 👎 번들 사이즈가 상대적으로 커짐


isLoading을 의도적으로 꺼주는 방식으로 제어한 이유는, 로딩 상태 제어를 SWR의 isLoading으로 일원화하고 싶었는데, SWR의 isLoading은 폴백 데이터가 있어도 최초 로딩에는 항상 참이기 때문에 서버에서 온 씨드 데이터가 있어도 로딩 화면이 보였기 때문이다. 현재는 여기서 더 발전한 패턴들이 존재하는데, 가장 대표적으로 Server에서 시작된 데이터로딩 프리페치 Promise를 클라이언트로 내려준 뒤 use 훅을 이용해 consume하는 방식이 있다. 다만 이 또한 서버 사이드 데이터 페칭이 오래 걸린다면 여전히 여러 방면으로 캐싱에 대한 고민을 해야한다.

결과적으로, 나는 PPR이나 서버 컴포넌트는 클라이언트에서 인터랙션이 많은 앱에는 부적합하다고 생각한다. 서버 컴포넌트를 쓴 이유가, Vercel에서 홍보하는 서버 컴포넌트의 이득보다는 Next.js Server Cache Directive를 쓰기 위함이 더 컸다. 만약 DB와 API 서버가 가까운 곳으로 옮겨지게 된다면, SWR만으로도 충분할 것 같다. 실험 데이터는 수십 MB가 되는 경우도 있는데, Next.js Cache의 최대 크기가 2MB이기에 추가적인 우회가 필요했다는 것도 아쉬웠다.

## 현대적인 웹을 향해

### 넥스트 앱 라우터

이번에 Next App Router를 전격적으로 도입했는데, 다른 것들은 기존의 Pages Router와 방식이 달라졌을 뿐 압도적인 편의를 느끼지는 못했는데, Nested Layout은 압도적으로 편리했다 (레이아웃과 children이 사각형이 아니면 그리기 어렵다는 문제가 있었지만 말이다). 이 패턴을 적극적으로 활용하여 다음과 같은 레이아웃도 구성할 수 있었는데...

### 밀러 컬럼: 


[밀러 컬럼](https://en.wikipedia.org/wiki/Miller_columns)이란, 여러 위계가 섞여있는 디렉터리에서 여러 컬럼들이 좌우로 길게 늘어선 것을 뜻한다.

<figure>

![맥 파인더 밀러 컬럼](./6FDB19.png)

<figcaption>

가령, 맥 파인더에서 볼 수 있는 이 화면도 밀러 컬럼의 일환이다.

</figcaption>

</figure>

유저, 프로젝트, 잡이 많고, 서로 다른 프로젝트의 많은 잡을 오고가야 하는 일이 있는데, 기존 구조는 이를 단순하게 Tree 구조 안에 엮어놓고, Tree 안에 Pagination까지 있는 구조라 Job을 찾기 매우 어려웠다.

때문에, 다음과 같은 구조를 만들어내고 싶었다.

<figure>

![구상했던 URL, 그리고 데스크톱, 모바일 뷰](./C868F8.jpeg)

<figcaption>

구상했던 URL, 그리고 데스크톱, 모바일 뷰

</figcaption>

</figure>

얼핏 보면 단순해보이지만 App Router의 Nested Layout 없이는 정말로 골치 아프며, 모바일에서 메인 컨텐츠가 아닌 **리스트 뷰**가 보이게 하는 것도 골치 아프다. 이는 Brandon Bayer님의 [메시지](https://x.com/flybayer/status/1818009089735279057)를 통해 큰 도움을 얻었는데, 바로 `layout.tsx`에 콘텐츠를 넣고, `page.tsx`를 의도적으로 비워놓는 것이다.

> The environment UI has to be inside the environment `layout.tsx`, with the environment `page.tsx` only containing `return null`.
>
> — [Brandon Bayer](https://www.flightcontrol.dev/blog/nextjs-app-router-migration-the-good-bad-and-ugly)

import video from './5F8BA9.mp4'

<figure>

<ReactPlayer playing controls autoPlay loop muted url={video} width='100%' height='100%'/>

<figcaption>

여러 위계가 구분되어야하는 복잡한 데이터를, UI 편의성에 대한 심도 있는 고민과, Nested `layout.tsx`이라는 신기술을 기술적으로 깊게 이해하여 단 수백줄 선에서 구현한 것이 뿌듯했다.

</figcaption>

</figure>

최종적으로는 위와 같이 구현할 수 있었다. 여러 컬럼이 겹쳐있고, 선택되어 있는 컬럼은 마치 책꽂이에 꽂힌 책처럼 세로로 글자가 나타나며 접힌다. 당연히 각 컬럼마다 인피니트 스크롤, 컨텍스트 메뉴 (점 세개 메뉴), 정렬 및 필터링도 지원한다.

아직 초기여서 새로운 인터페이스에 적응하지 못한 분들도 있고 개선 피드백도 받고 있지만, 이와 같은 사용자 UX를 모든 면에 걸쳐 배려심 많은 인터페이스를 개발했고, 전반적으로 사용자들도 좋아하신다는 점을 확인했다.

<figure>

<iframe src="https://antiagile.vercel.app/buttons" width="100%" height="120px" style={{border: '2px solid var(--ifm-color-gray-200)', borderRadius: '16px', padding: '38px'}} />

<figcaption>

만든 몇 가지 컴포넌트. 직접 사용해보자 (키보드 단축키는 위 `iframe`을 한 번 클릭하여 포커스를 줘야지만 동작한다.)

</figcaption>

</figure>

### 모바일 지원

어떤 작업을 하는 **작업 스튜디오** 앱은 주로 데스크톱 앱에만 집중하는 경향이 있다. 대부분의 작업이 데스크톱에서 이뤄질 것이기 때문이다. INCL도 그러했는데, 인공지능 훈련 작업은 기본 몇 시간 단위로 걸리기 때문에 이동 중에 짬짬이 훈련이 잘 되고 있는지 모바일에서 확인할 수요가 꾸준히 존재했다. 기존에는 모바일을 전혀 고려하지 않았기 때문에 사용자들이 매우 불편해했고, 이번에는 Tailwind의 반응형 UI를 활용해, **대부분의 코드를 공유하여** 데스크톱과 모바일에서 모두 잘 보이도록 개선했다.

인피니트 스크롤
확장성은 플러스
키보드 접근성
우클릭 등
멀티 액션 등

import DisplayFlex from '@site/src/components/DisplayFlex'

<figure>

<DisplayFlex>

<figure>

![메트릭 그래프 뷰](./4040C0.PNG)

<figcaption>

메트릭 그래프 뷰

</figcaption>

</figure>

<figure>

![잡 리스트 뷰](./B21ABE.PNG)

<figcaption>

잡 리스트 뷰

</figcaption>

</figure>

<figure>

![프로젝트 테이블 뷰](./493D6F.PNG)

<figcaption>

프로젝트 테이블 뷰

</figcaption>

</figure>

</DisplayFlex>

<figcaption>

모바일에서도 시인성과 가독성을 고려하여, 내 나름대로 Apple의 휴먼 인터페이스 가이드라인이 지향하는 바를 모방해 디자인했다.

</figcaption>

</figure>

## 오픈된 생태계를 향해

작업을 하면서 [Tanstack Table](https://github.com/TanStack/table), [shadcn-ui/ui](https://github.com/shadcn-ui/ui) 같은 대형 라이브러리는 물론 [toss/es-toolkit](https://github.com/toss/es-toolkit)나 [47ng/nuqs](https://github.com/47ng/nuqs)와 같은 비교적 작은 오픈소스 라이브러리들을 적극 차용하고 개선하여 적재적소에 활용했을 뿐만 아니라, 기여하여 그들의 로드맵을 빚는데 도움을 주기도 했다. **하다가 막히는 상황이 생기면 업스트림 코드에 기여하는건 일상이 됐다**. 아래는 몇 가지 예시.

- [toss/es-toolkit: (feature) Add Custom Delimiter Support to flattenObject Utility #933](https://github.com/toss/es-toolkit/pull/933)
- [47ng/nuqs: Server-side \`clearOnDefault\` and \`urlKeys\`](https://github.com/47ng/nuqs/issues/679)
- [juliencrn/usehooks-ts: useLocalStorage Hydration Mismatch — Need to setIsClient everywhere](https://github.com/juliencrn/usehooks-ts/issues/644)
- [vercel/next.js: Using Async Tags with Revalidate on Next.js Server Fetch Contaminates JSON Response](https://github.com/vercel/next.js/issues/73874)
- [vercel/swr: \`revalidateOnMount\` With Fallback triggers \`isLoading\` instead of \`isValidating\`](https://github.com/vercel/swr/issues/3046)
- [vercel/swr: Visiting 404 Not Found clears all SWR Cache](https://github.com/vercel/swr/issues/3002)

오픈 소스에 몇 가지 아쉬운 점을 적어보자면, TanStack 테이블은 데이터가 실시간으로 바뀌는 Row 데이터를 상정하고 제작한 것 같지 않았다. 예를 들어 Row 값이 변경되었을 때 테이블 페이지, 선택된 Row, 화면에 보여야하는 컬럼의 종류 등을 다루는 커스텀 로직들을 작성해줘야 한다. Shadcn의 경우, 다이얼로그가 React Portal로 나오는데, 드래그 앤 드랍을 구현할 때 화면의 마우스 offset을 계산하기 번거로워지는 문제가 있었다. 결국 드래그 앤 드랍 다이얼로그는 Shadcn 다이얼로그와 동일하게 생긴 다이얼로그로 구현했다.

![드래그 앤 드랍 다이얼로그](./3E96D2.png)

## 상태관리

SWR을 사용하게 되면서 내가 줄곧 주창했던 것은 상태 관리를 따로 하지 않아도 된다는 것이다. 어차피 모든 정보는 서버에서 관리되어야 하고, 서버 데이터를 직접 업데이트하고 그 데이터가 실시간으로 클라이언트에 SWR로 업데이트되면서 상태가 최신으로 유지될 것이기 때문에 굳이 상태 관리를 할 필요가 없다는 것이다.

흔히들 이런 말을 하면 "복잡한 앱을 만든 경험이 없어서 그렇다"고 논의가 일축되는 경향이 있고, 복잡한 앱에서 왜 그게 안 되는지 물어보아도 설득될만한 합당한 근거가 없었다. 나 또한 결국 이는 엄청난 착오임을 알게 되었다. 생각해보면, **프론트엔드 복잡성의 모든 문제는 API 통제의 부재에서 온다**.

SWR은 하나의 엔드포인트에서 오는 상태를 최신으로 유지하고 관리하는데 특화되어 있는데, 여러가지 데이터가 조합되어서 상태를 표시하는 그래프의 경우 여러 가지 SWR을 훅을 `청기🔵들어` `백기⚪들어` 하는 거대한 nested된 SWR 훅을 만들어야 했다. 이를 나중에 Custom Fetch 함수를 만들어 확연한 간소화를 하긴 했지만, 결과적으로 여러 API들에서 오는 정보들을 **조합해서** 관리해야할 경우는 SWR 자체 만으로는 상태관리가 어렵다는 것이 결론이었다.

SWR만으로 상태관리를 한다는 것은, 하나의 기능을 위한 하나의 통합 api가 있을 때만 할 수 있던 이상적인 그림이었다. 그런 면에서 API들의 조합 SWR 훅들이 늘어나 관리 포인트가 늘어난 것이 무척 아쉽다. API 사양을 철저하게 명세를 못 한 문제였고, 우리 팀에 아직 명시적인 기술 PM이 없다는 점이 크게 와닿았다.

또한 서버에 저장되지 않는 정보들도 있다는 것이 문제였다. 예를 들어 사용자들이 설정해둔 그래프의 값이나 테이블 뷰 설정 등은 나는 [처음부터 URL에 기록되어야 한다고 생각했고](https://x.com/leerob/status/1708280997488333078), 그 URL을 사용자들이 북마크해서 사용해야한다고 생각했다. 근데 URL에 담기 어려운 대용량 데이터가 생기기 시작했고, 결국 Local Storage의 Persistence와 URL State를 동기화해주는 코드를 작성할 수 밖에 없었다. 이는 URL을 로컬 상태의 원천으로 잡고 싶어하는 내 상황에서는 최선 같기도 했다. 허나, 테이블 정보 등의 데이터는 `useLocalStorage`만을 전적으로 사용해야 했다.

물론 나는 여전히 상태관리 라이브러리를 도입하는 것보다 하나의 View를 위한 하나의 API를 백엔드에서 구성해주거나, 최소한 여러 BE API를 조합해서 정리해주는 BFF를 구성해줘야 한다고 생각한다. 다만, 여러 현실적인 어려움으로, 다시 기회가 주어진다면 일부 정보들은 Local Storage Persistence를 사용하는 Zustand를 활용할 것 같다.

## 힘과 책임

나는 인간의 능력에 대한 불신이 있기에 (즉, 모든 사람은 결국 게을러진다) 그 전에 자율 운영 능력, 자정 작용을 갖춘 플랫폼을 구축하는 것이 중요하다고 생각하고, 그래서 자동화된 사용자 데이터 수집, 자동화된 테스팅 및 CI/CD 등을 갖추는 것을 선호하는 편이다. 즉 나는 인간이 꼼꼼하지 못하고 실수를 하더라도 안전할 수 있는 에어백, 또는 가드레일을 만드는 것이 중요하다고 생각한다. 하지만, 우리 팀은 인간의 능력과 성실함을 믿고 인간의 꼼꼼함에 기대는 성향이 강하다. 그래서 자동화된 사용자 데이터 수집보다는 1대1 유저 인터뷰를, 자동화된 테스팅보다는 개발자의 꼼꼼한 QA를 선호한다. 또한 나는 소소한 장점이 있는 개발자 툴링 도구를 우선 써보고 버릴지 결정하는 반면 우리 팀에서는 완전히 패러다임이 넘어가기 전까지는 그 도구를 쓰지 않는 편이었다. 그래서 Biome.js, Turborepo 같은 추가 개발자 편의 도구들을 도입해보지 못했다.

즉, 나는 빨리 부닥쳐보고 빨리 실패하는 것을 선호하는 반면, 팀은 조금 더 신중한 접근을 취하는 편이다. 두 의사 결정 방식 일장일단이 있는 방식이지만, 나로서는 유저 데이터를 못 얻고, 매번 꼼꼼한 테스팅이 강제되는 꼴이었기에 결정권도 없어서 나한테 전권이 없었는데, 모든 책임은 나에게 있었기에 매우 어려운 작업이었다. 가령, 이번 리빌드를 하면서 유저 사용량 데이터가 있었다면, 유저들이 가장 많이 쓰는 기능만 우선적으로 만들어 출시하고 사용하지 않는 기능은 가차없이 End Of Life을 때렸을 것이다. 하지만 팀은 과거에 1대1 인터뷰에 요청된 적이 있었다는 근거로 모든 기능의 1대1 기능 동등성을 원했고, 결국 실제로는 잘 사용되지 않을 법한데 고난이도인 개발들도 제외없이 진행해야만 했다. 

## 앞으로

리빌드에 대한 이야기를 했으니, 이제 왜 우리가 리빌드를 했고 어떤 꿈을 꾸고 있는지 알아보자. 또 나는 어떤 꿈을 꾸고 있는지 알아보자.

### 루닛의 비전, Automated ML에서 Autonomous ML을 향해


루닛은 ML의 Cursor를 만들고 싶어한다. 그 작업의 일환으로 INCL이라는 MLOps 플랫폼의 프론트엔드를 리빌드한 것이다. 이제 루닛은 여기에 여러 Agentic AI를 접목하여

> 지난번 하이퍼파라미터 최적화 실험에서, 서치 스페이스를 조금 늘려서 실험을 다시 해보자

라고 유저가 입력하면 실험이 알잘딱깔센 진행되는 플랫폼을 만들고, 그를 이용해 의료 AI 발전을 가속화하는 비전을 꿈꾸고 있다. 즉, AutoML의 의미를 Automated ML에서 Autonomous ML로 전환하고 싶어한다.

## 나의 비전, AI의 AWS

나는 그 과정에서 중간 단계 부산물 제품들, 가령 우리의 MLOps 제품들을 외부로 공개하여 플랫폼 기업으로 성장할 수 있다고 생각한다. 그 과정에서 이 중간 제품들을 의료 AI를 위한 캐시카우로 키울 수 있다고 생각한다.

예를 들어, 아마존이 AWS를 왜 공개했을까? 당시 아마존은 인터넷 상점 1등을 공고히 하기 전이었고, AWS 제품군의 공개는 오히려 다른 오프라인 경쟁사들의 클라우드 전환을 도움으로 아마존을 위협할 수 있는 위험한 결정이었다. 그럼에도 아마존이 AWS를 공개한 것은 AWS를 아마존에 독립적인 상품군으로 키워 포트폴리오를 다각화하여 재정 안정성을 키움과 동시에 AWS 외부 고객을 통해 플랫폼을 안정화할 수 있는 방법이었기 때문이다. 이제는 AWS의 압도적인 영업이익률이 아마존의 박리다매 전략을 사실상 든든하게 뒷받침하고 있고, 아마존이 명실상부한 1등 이커머스로 성장할 수 있는 마중물이 되었다. 이 모든 것은, AWS를 외부로 공개하지 않았다면 일어날 수 없는 일이라고 생각한다.

나는 루닛의 ML 제품군이 비슷한 역할을 할 수 있다고 생각한다. 비록 시장에 수많은 제품군이 존재하지만, 루닛만큼 엔드-투-엔드 비용 최적화에 진심인 회사는 거의 없다. 대부분의 MLOps 플랫폼 회사들은 고객이 손쉽게 최적화를 할 수 **없게** 하는 것에 집중한다. 때문에, 최소한의 비용 최적화만 해주고 고객에게 남은 금액을 청구하는 비즈니스 모델을 가진 반면, 루닛은 자신이 ML 트레이닝의 고객이기도 하고 ML 트레이닝 플랫폼의 제공자기도 하다. 양쪽의 정보를 모두 알고 있으니 전체 파이프라인에 걸쳐 모든 비용 최적화를 할 수 있고, INCL 또한 거기에 엄청나게 많은 투자를 했다.

이런 이유로 나는 루닛의 MLOps 제품군이 외부로 공개되어 플랫폼 기업으로 성장할 수 있다고 생각한다.

## 우리는 채용 중

우리 팀에서 나와 직접 일할 분을 채용 중이다. 가장 뛰어난 MLOps 플랫폼을 발전시키고, Agent를 접목시켜서 ML의 Cursor를 만들 사람을 찾고 있다. 이를 위해서는 백엔드, 프론트엔드, 인프라, AI 생태계 전반에 걸친 이해가 필요하다. 

하나의 예를 들자면, 나는 최근에 **LLM 트레이닝을 위한 유저 GPU의 백엔드 연동 작업**을 하는 중이다. 클라우드 트레이닝의 편리함과, 유저 개인이 보유한 GPU의 강력함을 결합하는 작업이다. [GitHub Action의 Self-hosted Runner](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners)와 비슷하다.

만약 자신이 플랫폼에 대한 전반적으로 이해하고 있는 엔지니어라면, 아래 채용 공고에 무작정 지원을 해보자. 이 글이 당신의 눈길을 끌어 글을 눌렀다는 것은 우선 당신은 개발 생태계에 대한 애착이 있는 사람이라는 것이다. 그러면 벌써 반은 합격이다.

- [시니어](https://wrkbl.ink/aw1ZHsB)
- [주니어](https://wrkbl.ink/6YGf3CJ)
- 키워드 (비슷한 것을 할 수 있으면 가능): React, Next.js, Django, Django REST Framework, MySQL, PostgreSQL, Redis, Celery, Nginx, PyTorch, Optuna, Google Cloud Platform, Kubernetes, Docker Compose
