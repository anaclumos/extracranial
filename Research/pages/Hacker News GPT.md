---
lang: 'en'
slug: '/8E98AE'
---

## [[2023-03-20]]

해커뉴스를 읽고 있다가 이걸 AI에게 요약해보고 있었다.
그냥 이걸 파이프라인으로 만들면 어때?

## [[2023-03-21]] — [[2023-03-23]]

Ghost로 간단하게 뉴스레터 웹사이트를 만들어보았다.
Stripe도 붙이려다가 한국이 지원되지 않아 포기했다.

## [[2023-03-24]]

Ghost를 버리고 Nextra로 만들기로 했다.
GitHub Actions로 빌드하는 방식으로.
간단하게 사이트를 만들고 시범적인 CI/CD를 돌려보았다.

## [[2023-03-25]]

![[819907.png]]
![[DF78E9.png]]

This is honestly funny... But will need to figure out a solution soon.

## [[2023-03-31]]

거의 완성했다.
OpenAI를 가지고 많이 놀았다.
그와중에 DeepL은 API를 열어주지 않고 있었다.
결제 과정에서 오류가 나는 것을 일주일 째 방치하는 SaaS 기업이라니.

## [[2023-04-02]]

[[Bing Chat for All Browsers]] is about to break 100K WAU. I should probably add a sidebar chat feature and a self-promotion of [[hn.cho.sh]].

## [[2023-04-03]]

[[hn.cho.sh]]에 조금 더 예쁜 이름이 필요하다.
그리고 [[Bing Chat for All Browsers in Japan]]에서 알듯이 뭔가 일본에서 이런 프로덕트 반응이 잘 오는 것 같았다.
일본으로 진출하기 위해 오랜만에 일본인 친구들에게 이메일을 조금 돌렸다. 얘기를 들어보니 Zenn을 많이 쓴다는 것 같길래 여기에 가입해서 홍보를 해봤다. [Show Zenn: シリコンバレーを理解する最も簡単な方法](https://zenn.dev/anaclumos/scraps/5c6ffc58a1b1e9)

[[Twitter Link Preview]]를 추가했다.

그리고 GitHub Actions에는 현재 돌고 있는 액션의 로그가 보이지 않는 버그가 있다. [Log lines for an active step are inaccessible · Issue #2131 · actions/runner](https://github.com/actions/runner/issues/2131)

i18n을 Sitemap과 HTML Head `hreflang`으로 자동 생성되도록 만들었다. Nextra의 i18n 구조에 호환되게 만들려고 하니 링크 변형 함수를 많이 만들어야 했다.

![[DCE7FC.png]]
![[DC371E.png]]

그리고 [[Bing Chat for All Browsers]]도 WAU 10만을 넘었다.

![[979B83.png]]
