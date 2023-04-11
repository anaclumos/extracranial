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

## [[2023-04-10]]

트위터와 링크드인에 자동 업그레이드 기능을 만들었다.

받은 피드백:

> I subscribed for a bit and appreciated the detail, but I felt the descriptions were lengthy. I like this AI [newsletter](https://www.bensbites.co/): pretty easy-to-follow section, and it feels super readable. Understanding whether you are trying to source lesser-known information, summarize long-form, or do both might be helpful.

- [Ben's Bites](https://www.bensbites.co/)

모델 파인 튜닝과 더 정교한 번역이 갈수록 필요해진다. 아무래도 GPT-4가 나오면 번역 작업을 DeepL에서 GPT-4로 갈아타고, 그리고 몇 가지 좋은 예시를 이용해서 파인튜닝 작업을 해야겠다.

## [[2023-04-11]]: DeepL vs. GPT 3.5 vs. GPT 4 벤치마크

<details>
<summary>원문</summary>
Microsoft fixes 5-year-old Defender bug, reducing Firefox-related CPU use by 75%

Microsoft fixed a 5-year-old Defender bug reducing Firefox CPU use. Anti-virus products caused similar but less severe CPU impact. Optimizing small things vs. CO2 footprint discussed. HN users discuss energy efficiency of web browsers, ad-blockers, browser compatibility on Windows. Turning off YouTube's "ambient mode" on Firefox saves 30% CPU on a Mac. Mac vs. Linux for troubleshooting discussed. Criticisms and suggestions for Firefox generating high CPU usage compared to Chrome. ETW bug and Defender performance drop in PowerShell operations noted.

Ever-expanding animation of the life of the 796th floor of a space station

An ever-expanding animation showcasing the life of a space station's 796th floor has been created. The project, named Floor796, was made by an artist and programmer and is a fictional overview of a space station's daily routine. The animation covers areas such as farming, recreational activities, and scientific experiments. The creators hope that the project will inspire and encourage future generations to explore space and promote a more optimistic and positive view of the future. A hand-animated, open-source space station animation has gained viral attention for its pop culture references. An HN user notes the historical Russian allusions. The animation project is an indie endeavor that avoids excessive use of frameworks and dependencies. Users suggest improvements, but some defend the artist's creativity. The animation editor used is recommended as a useful tool.

Night of the living brain fog dead or how I hacked myself better via open source

A blogger shares their journey of using open source software to manage severe sleep apnea after trying various sleep hygiene "hacks" and being prescribed CPAP. They discover an online community using open source OSCAR software to gain deeper insights into sleep metrics and buys a unit that exports data in the right format. Another blogger recommends an adaptive servo-ventilator (ASV) as a more effective treatment for central sleep apnea, with positive results seen through restored breathing patterns and healthy blood oxygenation. The author encourages others to seek treatment for undiagnosed sleep apnea. An individual's journey to tackling health issues highlights need to take charge of health instead of relying solely on traditional medical systems. HN users discuss issues and barriers around medical system's adherence to proven treatments and reluctance to adopt new methods. Patients should not solely rely on unproven treatments and should incorporate traditional care. Users discuss acceptable degree of risk among different industries and importance of open medical equipment and data accessibility. Some users report mixed results with various sleep remedies and methods. Post discusses potential causes of "brain fog" and importance of open medical devices and knowledge. Personal account of positive experience with CPAP treatment and alternatives to CPAP discussed. YouTube channel reviewing health tracking devices and difficulty obtaining medical care and sleep studies also discussed. Diagnosis and treatment of sleep apnea can be lengthy and costly process. Tongue posture exercises and personal recovery methods may aid in managing symptoms.

</details>

| DeepL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | GPT 4                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | GPT 3.5                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Microsoft, 5년 된 Defender 버그를 수정하여 Firefox 관련 CPU 사용량을 75% 줄였습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 마이크로소프트, 5년 된 디펜더 버그 수정으로 파이어폭스 관련 CPU 사용량 75% 감소                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 마이크로소프트, 5년전 디펜더 버그 수정으로 파이어폭스 CPU 사용량 75% 감소                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Microsoft는 5년 된 Defender 버그를 수정하여 Firefox CPU 사용량을 줄였습니다. 안티 바이러스 제품은 비슷하지만 덜 심각한 CPU 영향을 유발했습니다. 작은 것의 최적화와 CO2 발자국 비교 논의. HN 사용자가 웹 브라우저의 에너지 효율성, 광고 차단기, Windows의 브라우저 호환성에 대해 논의합니다. Firefox에서 YouTube의 '주변 모드'를 끄면 Mac에서 CPU를 30% 절약할 수 있습니다. 문제 해결을 위한 Mac과 Linux 비교. Chrome에 비해 높은 CPU 사용량을 발생시키는 Firefox에 대한 비판과 제안. PowerShell 작업에서 ETW 버그 및 Defender 성능 저하가 발견되었습니다.                                                                                                                                                                                                                                                                                     | 마이크로소프트는 5년 된 디펜더 버그를 수정하여 파이어폭스 CPU 사용량을 줄였습니다. 안티바이러스 제품도 유사한 CPU 영향을 미치지만, 정도가 약간 덜했습니다. 작은 것들을 최적화하는 것과 CO2 발자국 간의 논의가 이어졌습니다. HN 사용자들은 웹 브라우저의 에너지 효율, 광고 차단기, 윈도우에서의 브라우저 호환성에 대해 논의했습니다. 맥에서 파이어폭스에서 유튜브의 "앰비언트 모드"를 끄면 CPU 사용량이 30% 절약됩니다. 맥 대 Linux 문제 해결 논의가 이어졌습니다. 크롬과 비교하여 파이어폭스의 높은 CPU 사용량에 대한 비판과 제안이 제기되었습니다. ETW 버그 및 디펜더 성능 저하와 PowerShell 작업에서의 문제가 지적되었습니다.                                                                         | 마이크로소프트가 5년전 버그를 수정하여 디펜더를 통해 파이어폭스의 CPU 사용량을 줄였습니다. 안티바이러스 제품은 유사하지만 덜 심한 CPU 영향을 미칩니다. 작은 것을 최적화하거나 탄소발자국 줄이기에 대해 논의되었습니다. HN 사용자들은 웹 브라우저의 에너지 효율성, 광고 차단기, Windows에서의 브라우저 호환성 등을 논의하고 있습니다. Firefox에서 YouTube의 "ambient mode"를 끄면 Mac에서 CPU 사용량이 30% 절약된다는 것을 알리는 게시물이 올라왔습니다. Mac과 Linux에서의 문제 해결에 대한 논의도 진행되었습니다. Chrome에 비해 Firefox가 높은 CPU 사용량을 발생시키는 것에 대한 비판과 제안도 있었습니다. PowerShell 작업에서의 ETW 버그와 디펜더 성능 하락도 언급되었습니다.          |
| 우주 정거장 796층 생활에 대한 계속 확장되는 애니메이션                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 우주 정거장 796층의 삶을 확장하는 애니메이션                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 우주 정거장 796층 생활을 보여주는 애니메이션                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 우주 정거장 796층의 생활을 보여주는 계속 확장되는 애니메이션이 제작되었습니다. 플로어796(Floor796)이라는 이름의 이 프로젝트는 아티스트와 프로그래머가 만든 것으로, 우주 정거장의 일상을 가상의 시각으로 보여줍니다. 이 애니메이션은 농사, 레크리에이션 활동, 과학 실험과 같은 분야를 다루고 있습니다. 제작자는 이 프로젝트가 미래 세대에게 우주 탐험에 대한 영감과 용기를 주고 미래를 보다 낙관적이고 긍정적으로 바라볼 수 있도록 장려하기를 희망합니다. 수작업으로 제작된 오픈소스 우주 정거장 애니메이션은 대중문화에서 영감을 얻어 입소문을 타고 있습니다. 한 HN 사용자가 러시아의 역사적 암시에 주목하고 있습니다. 이 애니메이션 프로젝트는 프레임워크와 종속성을 과도하게 사용하지 않는 인디 프로젝트입니다. 사용자들은 개선점을 제안하지만 일부는 아티스트의 창의성을 옹호합니다. 사용 된 애니메이션 편집기는 유용한 도구로 권장됩니다. | 계속해서 확장되는 우주 정거장 796층의 삶을 보여주는 애니메이션이 만들어졌습니다. 이 프로젝트는 Floor796이라는 이름으로, 예술가와 프로그래머에 의해 만들어진 우주 정거장의 일상을 상상적으로 보여주는 작품입니다. 농업, 여가 활동, 과학 실험 등의 영역을 다루고 있습니다. 창작자들은 이 프로젝트가 미래 세대를 우주 탐험에 도전하도록 영감을 주고, 더 낙관적이고 긍정적인 미래를 홍보할 것이라 기대합니다. 수작업 애니메이션의 오픈 소스 우주 정거장 애니메이션이 대중문화 참조로 인해 인기를 얻었습니다. HN 사용자는 역사적인 러시아 참조를 주목합니다. 애니메이션 프로젝트는 과도한 프레임워크와 의존성 사용을 피하는 독립적인 작업입니다. 사용자들은 개선 방안을 제안하지만, 일부는 예술가의 창의력을 | 작가와 프로그래머가 제작한 'Floor796'이라는 프로젝트는 우주 정거장 796층의 일상 생활을 보여주는 애니메이션입니다. 이 애니메이션은 농업, 레크리에이션 활동, 과학 실험 등을 다루고 있습니다. 이 프로젝트의 창작자들은 이를 통해 우주 탐험에 대한 관심과 긍정적인 미래에 대한 확신을 불러일으키기를 바랍니다. 팝컬처 참조로 인해 바이럴한 수준까지 인기를 얻은 애니메이션 프로젝트입니다. HN 사용자 중 한 명은 이 애니메이션에 역사적인 러시아 언급이 있다고 언급했습니다. 이 프로젝트는 프레임워크와 의존성을 지나치게 사용하지 않는 인디 프로젝트입니다. 사용자들은 개선점에 대해 의견을 제시하며, 일부는 작가의 창의성을 지지했습니다. 이 애니메이션 에디터는 유용한 도구로 권장됩니다. |
