---
title: '차세대 디지털 브레인 만들기 🧠'
date: 2022-05-14
authors: anaclumos
slug: '/D8FB8E'
---

<!-- truncate -->

:::note

이 글의 원문은 영어입니다. 이 글은 기계번역되었습니다.

:::

몇 년간 기술 글을 쓰면서, 최고 수준의 글을 쓰는 데 방해가 되는 글쓰기 플랫폼의 한계를 느꼈습니다. 기술 지식은 역동적이고 상호 연결되어 있어서 현재의 어떤 형식(학술 논문, 강의 영상, 코드 예제 또는 직접적인 게시물)도 그 지식을 가장 잘 표현할 수 없습니다. 이 문제를 해결하려는 몇 가지 시도, 즉 **제2의 뇌** 또는 **디지털 정원**이라고 불리는 것들을 살펴보고 관찰했지만, 그 중 어느 것도 문제를 올바르게 해결하지 못하는 것 같았습니다. 그래서 저는 제 불편함을 이 거대한 메가 포스트로 정리하고 **_제가 새로운 디지털 브레인을 만들었다면 어떻게 했을지_** 상상해 보았습니다.
:::info **2022-06-12 업데이트**
이 포스트 이후로 저는 [Roam](https://roamresearch.com/), [Obsidian](https://obsidian.md), [Logseq](https://logseq.com/), [Foam](https://foambubble.github.io/foam/)과 같은 비선형 PKM 소프트웨어를 광범위하게 연구했습니다. 수동 링크 개념을 오해했다는 것을 인정합니다. PKM 소프트웨어는 연결된 참조와 연결되지 않은 참조를 지능적으로 식별하기 위해 퍼지 검색을 수행합니다. [Saga](https://saga.so)나 [Weavit](https://www.weavit.ai/)과 같은 자동 링크 기능이 있는 일부 PKM 소프트웨어를 발견했습니다. 하지만 제가 기대한 대로 작동하지는 않았습니다. 수동 링크는 데이터베이스를 정제하는 데 도움이 됩니다. 그래서 차세대 디지털 브레인을 만들더라도 링크 프로세스는 제거하지 않을 것입니다.
:::
:::tip **2022-07-01 업데이트**
자, 이제 제 차세대 디지털 브레인을 보고 계십니다! 지난 2주 동안 이 웹사이트를 구축한 [WWW 프로젝트](https://github.com/anaclumos/extracranial)에서 작업했습니다. 이 포스트에 자세히 설명된 거의 모든 사항을 충족합니다!
:::

<details>
<summary>요약</summary>
- **코드**-**이미지**-**저장소**-**텍스트**의 **심미적**-**대화형**-**자동** 더미를 만들어 스스로 **구성**-**제시**-**제안**합니다.
- 수동 태깅, 링크, 이미지 처리 등이 **없습니다**.
- 무작위 지식을 던지기만 하면 **지식 메시 네트워크**가 생성됩니다.
- **알고리즘**이 모든 것을 운영합니다. 전 세계 **다른 언어**로 포함, 처리, 구성 및 배포됩니다.
- 지식을 **관리**하지 않습니다. 알고리즘은 오래된 콘텐츠에 불이익을 줍니다(이를 피하려면 게시물을 **상록수**로 표시할 수 있습니다).
</details>
## 그래서 문제가 뭔가요?
대중적인 믿음과는 달리, 디지털 정원을 관리하는 가장 좋은 방법은 **관리하지 않는 것**이라는 것을 알게 되었습니다. 대신 **디지털 정글**을 만들어 보세요. 당신이 돌보지 않아도 자연이 자동으로 키워줄 것입니다.
다시 말해, 디지털 브레인은 마찰을 최소화해야 합니다.
관리할수록 글을 적게 씁니다.
### 특히,
저는 소위 제2의 뇌(obsidian, dendron, ...)에서 널리 사용되는 `[[keyword]]` 패턴을 경멸합니다.
알파벳이 아닌 문서에 대해 성능이 좋지 않다는 점은 말할 것도 없고,
수동이라는 점에서 많은 마찰을 일으킵니다.
괄호로 명시적으로 묶어야 한다는 사실이 말이 되지 않습니다... 200개의 게시물을 작성하면서 사용해 온 용어에 대한 링크를 만들고 싶다는 것을 깨달으면 어떻게 될까요?
돌아가서 하나씩 모두 연결하시겠습니까?
아니요! 해결책은 알고리즘적 키워드 추출에 있어야 합니다.
## 콘텐츠 구성
### 상호 연결된 엔티티
실용적인 지식은 단순한 게시물에 존재하지 않습니다(비록 간단할 수 있지만). GitHub 저장소, 코드, GitHub README 및 동일한 브레인 네트워크의 다른 게시물을 상호 연결하는 지식 번들을 만듭니다.
[Victor](https://victordibia.com/blog/alpha-code/)의 게시물이 논문, 데이터 세트, 데모 및 게시물에 대한 풍부한 메타데이터를 어떻게 가지고 있는지 살펴보세요. 이것이 제가 **상호 연결된 엔티티**로 보는 것입니다.
- [강력하고 유연한 Markdown 기반 저작 프레임워크](https://markdoc.io/)
### 대화형 콘텐츠 및 애니메이션
![victordibia.com. MDX를 사용하는 것 같습니다.](B717F8.gif)
![bluewings.github.io. MDX 사용 확인.](FB685B.gif)
![pomb.us. 사용자 스크롤에 반응합니다.](8F78C9.gif)
![qubit.donghwi.dev. 이것은 블로그가 아니라 양자 컴퓨터의 핵심 개념을 시연하는 웹 앱입니다. 그래도 흥미롭습니다.](ED77BD.gif)
### 비정형 그래핑
믿어 주세요, 수동으로 태그를 만지작거리는 것은 최악입니다.
필연적으로 게시물에 태그를 지정하고 하위 디렉토리로 게시물을 구성하는 것은 컴퓨터를 정리하는 것과 유사합니다.
그러나 수천 개의 게시물이 있는 경우에는 이 작업을 하고 싶지 않을 것입니다. 또한 경계가 느슨해집니다. 게시물에 두 가지 속성이 있다면 어떻게 될까요? 무엇이 기본 태그가 되고 무엇이 보조 태그가 될까요?
[주목할 만한 트렌드. Z세대는 더 이상 폴더를 정리하지 않습니다!](https://www.theverge.com/22684730/students-file-folder-directory-structure-education-gen-z)
최근 트렌드는 모든 것을 거대 폴더에 덤프하고 필요할 때마다 검색하는 것이라고 말할 수 있습니다.
저도 예전에는 폴더를 훨씬 더 많이 정리했지만, 최근 Spotlight나 Alfred와 같은 검색이 개선되면서 파일을 열기 위해 항상 해당 검색 명령을 사용하는 것을 고려할 때 직접 관리할 필요성을 느끼지 못합니다.
알고리즘이 모든 텍스트를 읽고 사용자를 위해 구성할 수 있을 때 모든 파일을 수동으로 구성할 필요가 없습니다!
알고리즘 검사를 사용하여 게시물이 서로 어떻게 적절하게 상호 관련될 수 있는지 분석하세요.
![한국판 dev.to인 Velog.io는 모든 게시물에 대해 관련 게시물을 연결합니다.](8E5E49.png)
따라서 제가 아닌 봇과 알고리즘에 의해 분류된 게시물 클러스터를 만듭니다.
[WordPress에도 이 플러그인이 있습니다.](https://wordpress.org/plugins/related-posts-for-wp/)
이는 [[Obsidian]]과 [Dendron](https://www.dendron.so/)과 같은 소위 디지털 브레인이 하고 있는 백링킹과 유사합니다.
![Dendron의 백링킹 예](D9987E.png)
지식 부스러기를 상호 연결하는 것의 중요성에는 동의하지만, 그들의 방법에는 전적으로 동의할 수 없습니다.
수동으로 게시물을 연결하는 것은 일관성이 없고 번거롭습니다. Wikipedia와 같은 대규모 공동체 규모에서만 가능합니다.
개별 디지털 브레인 시스템에 동일한 논리를 적용할 수는 없습니다.
## SEO 및 오픈 그래프
### 메타 설명을 위한 Precis 봇
위의 상호 연결 기술을 메타 태그 설명을 위한 TL;DR 봇에 적용할 수 있습니다.
### 자동 오픈 그래프 이미지 삽입
예를 들어 GitHub는 메타데이터를 사용하여 자동 오픈 그래프 이미지를 생성합니다.
![GitHub의 오픈 그래프 이미지 예](7D9CF1.png)
이 기술을 사용하는 서비스가 꽤 있습니다.
GitHub는 이 기능 구현에 대한 훌륭한 [게시물](https://github.blog/2021-06-22-framework-building-open-graph-images/)을 작성했습니다.
저도 Ghost CMS 위에 이것을 구현하려고 했지만 Ghost Core Engine이 이것을 지원해야 한다는 것을 알고 포기했습니다. 그러나 나중에 확장할 수 있는 [포크](https://github.com/vercel/og-image/compare/main...anaclumos:main)를 만들었습니다. [http://og-image.cho.sh/](http://og-image.cho.sh/)
[GitHub - anaclumos/cho-sh-og-image: 서비스로서의 오픈 그래프 이미지 - Twitter, Facebook, Slack 등을 위한 카드 생성](https://github.com/anaclumos/cho-sh-og-image)
## 다국어
### 적절한 다국어 지원
**자동 언어 감지**. 기본은 작업량을 줄이는 것입니다. 무작위로 글을 쓰면 알고리즘이 자동으로 해당 데이터를 구성합니다.
**[hreflang](https://developers.google.com/search/docs/advanced/crawling/localized-versions) 태그 및 [HTTP 콘텐츠 협상](https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation)**. 대기업 i18n 제품을 제외하고는 이 트릭을 제대로 사용하는 서비스를 찾지 못했습니다.
### 번역
이 시점에서 저는 하나의 영어 게시물을 작성하고 Google 번역이 무거운 작업을 수행하도록 할 수 있습니다.
또한 GitHub에서 기여를 받을 수 있습니다.
다국어 및 번역을 지원하면서 3D WebGL 지구본 그래픽을 넣고 싶습니다. 2019년 [infrastructure.aws](https://infrastructure.aws)를 기억하시나요? AWS의 글로벌 네트워크에 대한 멋진 3D 그래픽을 보여주곤 했습니다. [AWS Edge Cloud Continuum](https://apps.kaonadn.net/5181491956940800/index.html)
저도 이것을 다시 원합니다. 한편, 이것도 멋져 보입니다:
- [GitHub - shuding/code: 5kB WebGL 지구본 라이브러리](https://github.com/shuding/cobe)
또한 일부 [기여](https://github.com/shuding/cobe/pull/30)를 했습니다...
### 글꼴 및 이모티콘
강력한 새로운 글꼴인 Pretendard와 함께 표준 SF Pro 시리즈를 사용하고 싶습니다.
```css
font-family:
ui-sans-serif,
 -apple-system,
 BlinkMacSystemFont,
 'Apple SD Gothic Neo',
 Pretendard,
system-ui -system-ui,
sans-serif,
 'Apple Color Emoji';
```
그러나 다른 옵션도 탐색하고 있습니다.
이모티콘의 경우 [TossFace](https://toss.im/tossface)가 한국적 가치를 일본 기반 이모티콘 시스템에 주입하려는 대담한 시도를 좋아했습니다(하하, 그러나 그들은 그것을 취소했습니다).
![Tossface 원본 이모티콘](9DF9E8.png)
솔직히 저는 이것이 다시 돌아오기를 원합니다. 그들은 유니코드 [사용자 정의 영역](https://en.wikipedia.org/wiki/Private_Use_Areas#:~:text=In%20Unicode%2C%20a%20Private%20Use,characters%20by%20the%20Unicode%20Consortium.)을 사용할 수 있습니다. 그러나 Toss는 WOFF 버전 웹폰트를 만들지 않은 것을 고려할 때 그렇게 하기에는 너무 게으릅니다.
그래서 저는 [Twemoji](https://twemoji.twitter.com/)를 사용할 수도 있습니다.
## 도메인 및 경로
### URL 구조
URL 구조가 SEO에 중요할까요? sitemap.xml을 통해 광범위한 도메인 목록이 제공된다면 그렇지 않다고 생각합니다.
SEO 목적으로(여전히 효과에 대해 의심스럽지만) Notion처럼 URLified 제목을 끝에 자동으로 삽입하면 도움이 될 수 있습니다.
### 이름 없는 경로
[영숫자 ID로 자동 링크 | GitHub Changelog](https://github.blog/changelog/2022-07-01-autolinks-with-alphanumeric-ids/)
저는 `cho.sh/blog/how-to-make-apple-music-clone`과 같은 경로 이름 짓기를 좋아하지 않습니다. 제목을 업데이트하고 URL 구조를 업데이트하려면 어떻게 해야 할까요?
URL 구조를 변경하면 SEO에 영향을 미치므로 SEO를 유지하기 위해 엔티티 제목을 변경한 후에도 원래 도메인을 고수해야 합니다. 그러나 그렇게 되면 제목과 URL이 일치하지 않게 됩니다.
따라서 각 상호 연결된 엔티티에 대한 해시가 될 UID를 엔티티에 부여할 것입니다. 무작위 해시 UID는 엔티티의 [테마 색상](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color)이 될 수 있는 색상 16진수일 수 있습니다.
이모티콘 경로는 멋져 보이죠? Chrome이 유니코드 URL 복사를 지원하지 않으므로 Web Share API도 필요할 것입니다.
제가 생각하고 있는 몇 가지 후보는 다음과 같습니다:
- cho.sh/♥/e5732f/ko
- cho.sh/🧠/e5732f/en
![Twitter도 유니코드 URL을 지원하지 않는다는 것을 발견했습니다.](E14405.png)
## 기타
### 오래된 게시물의 헤드라인
오래된 게시물에 불이익을 주는 방법이 있어야 합니다. 데이터베이스에는 존재하지만 데이터 체인에는 그다지 많이 나타나지 않아야 합니다. 즉, 게시물에 수명 또는 "유효 기간"을 넣습니다.
![홍민희 블로그](AEFFCB.png)
![Kat Huang](85AF78.png)
### 각주
훌륭한 추가 기능입니다. 그러나 필수는 아닙니다.
각주 시스템을 만들어야 한다면 [namu.wiki](https://namu.wiki)가 잘 처리한 것처럼 마우스를 올려 볼 수 있게 만들고 싶습니다. 아래로 점프해서 다시 연결하기 위해 신경질적인 ↩️ 아이콘을 넣고 싶지 않습니다.
### 목차
좋은 추가 기능입니다. 그러나 필수는 아닙니다.
### 댓글
Giscus로 갈 것입니다.
