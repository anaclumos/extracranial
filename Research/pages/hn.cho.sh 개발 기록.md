---
lang: 'en'
slug: '/8E98AE'
---

## 이전

아티팩트에 대한 내 대답.

- [[Artifact]]
- [[우린 텍스트 틱톡을 평생 만들 수 있을까]]
- [[Algorithmic Recommendation Engine for Texts]]
- [[Can we ever build TikTok for Text]]
- [[NewsGPT]]

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

![[8F40B3.png]]
![[D6FAB7.png]]

ㅋㅋㅋㅋㅋㅋ 진지해서 웃긴데 해결책은 찾아야겠다.

## [[2023-03-31]]

며칠 전의 문제는 프롬프트를 조금 더 정교하게 설계하는 방향으로 어느 정도 해결했다. 안되면 모델을 Fine-tuning하려고 알아보고 있다. 참고해볼만한 자료:

- [Fine-tune LLaMA to speak like Homer Simpson](https://replicate.com/blog/fine-tune-llama-to-speak-like-homer-simpson)
- [Fine-tuning - OpenAI API](https://platform.openai.com/docs/guides/fine-tuning)

OpenAI를 가지고 많이 놀았다.
그와중에 DeepL은 API를 열어주지 않고 있었다.
결제 과정에서 오류가 나는 것을 일주일 째 방치하는 SaaS 기업이라니.

## [[2023-04-02]]

[[Bing Chat for All Browsers]]가 10만 주간 사용자를 돌파하기 직전이다. 아마도 사이드바 채팅 AI를 추가하고 [[hn.cho.sh]]에 대한 셀프 프로모션을 추가해야겠다.

## [[2023-04-03]]

[[hn.cho.sh]]에 조금 더 예쁜 이름이 필요하다.
그리고 [[Bing Chat for All Browsers in Japan]]에서 알듯이 뭔가 일본에서 이런 프로덕트 반응이 잘 오는 것 같았다.
일본으로 진출하기 위해 오랜만에 일본인 친구들에게 이메일을 조금 돌렸다. 얘기를 들어보니 Zenn을 많이 쓴다는 것 같길래 여기에 가입해서 홍보를 해봤다. [Show Zenn: シリコンバレーを理解する最も簡単な方法](https://zenn.dev/anaclumos/scraps/5c6ffc58a1b1e9)

[[Twitter Link Preview]]를 추가했다.

그리고 GitHub Actions에는 현재 돌고 있는 액션의 로그가 보이지 않는 버그가 있다. [Log lines for an active step are inaccessible · Issue #2131 · actions/runner](https://github.com/actions/runner/issues/2131)

i18n을 Sitemap과 HTML Head `hreflang`으로 자동 생성되도록 만들었다. Nextra의 i18n 구조에 호환되게 만들려고 하니 링크 변형 함수를 많이 만들어야 했다.

![[719933.png]]
![[81E383.png]]

그리고 [[Bing Chat for All Browsers]]도 WAU 10만을 넘었다.

![[B0787B.png]]

## [[2023-04-04]]

구독자들의 이메일을 보며 되게 다양한 회사가 있음을 느꼈다.
유럽에 기반한 [Proton](https://proton.me/)이라는 회사 및 덕덕고 이메일이 존재한다는 것도 이번에 알게 되었고,
이메일에 `+tag` 오퍼레이터를 사용해서 이메일을 정리하는 사람들, 본인의 도메인을 사용하는 인디 해커들, 일회용 이메일이나 RSS 피드 변환 앱 ([Kill the Newsletter!](https://kill-the-newsletter.com/))을 적극 활용하시는 분도 있으셨다. 인공지능 회사, 자율주행 회사, 블록체인 회사, VC, 웹툰 회사, 고전적 자산운용사, 그 뿐만 아니라 연예기획사와 은행, 출판사 분들도 있었다.

![[39A2E8.png]]

그나저나 아직 조금 더 지켜봐야겠지만, 해외 시장에서는 전혀 반응이 없다. PMF에서 P랑 F는 찾았는데 아직 M을 뚫는 방법을 모르겠다.

미디어의 소유주에겐 항상 이렇게 많은 연결고리들이 열렸겠지?

## [[2023-04-05]]

꿈결에 진짜 기가 막힌 프로젝트 이름이 생각 났는데 사라지고 말았다.

링크드인과 레딧 광고를 시작했다. 트위터도 돌리기 위해서 노력하고 있는데 트위터 광고 기능도 엄청 망가졌다: [The Twitter API is now effectively unmaintained](https://news.ycombinator.com/item?id=35370152)

상단에 "공유" - "구독" - "오늘의 뉴스"?로 하려고 했는데 이거 `getStaticProps`로 하면 될 것 같았는데 이상하게 잘 안 돼서 일단 포기.

프롬프트를 조금 개선했더니 요약 품질이 많이 좋아졌다. 오늘거 좀 마음에 든다.

![[2A1312.png]]
![[17E092.png]]
![[E73E46.png]]

Jargon Manager를 만들어야겠다. Stable Diffusion을 '안정적인 확산'이라고 번역하다니! DeepL 기능에 Glossary를 지원하는 기능이 있는데, 문제는 API를 사용한다면 무조건 API를 사용해서 등록해야 한다고 🫤 이게 말이 되나 [DeepL API](https://www.deepl.com/docs-api/glossaries/list-glossaries/)

![[E9ED7C.png]]

## [[2023-04-06]]

덴마크에서 누군가 다녀가길래 드디어 완전 모르는 유럽 분이 구독하시나 했는데 아마 구독은 안 하신 듯 했다.

![[F15692.png]]

og.cho.sh로 OG 생성을 옮기면서 Pretendard를 적용하려고 했는데.

![[5FBC3A.png]]

폰트 파일 때문에 용량이 초과되었다. [Tips for optimizing font size? · vercel/satori · Discussion #434](https://github.com/vercel/satori/discussions/434)
