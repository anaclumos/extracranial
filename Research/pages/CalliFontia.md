---
lang: 'ko'
slug: '/3B14B7'
---

[[Someday]] [[Project]]. [[Apple]] Pencil Handwriting → [[Font]].

## 기존 Pain Point

온글잎 등은 기술적으로는 뛰어난데,

1. 서비스 존재를 내가 알아야함
2. 내가 폰트를 만들기로 결심해야함
3. 사이트까지 접속해야함
4. 종이와 카메라 준비해서 이거저거 준비해야함
5. 며칠을 기다려서 폰트 파일을 받는다

### 아이디어

- 영문 폰트 핵심으로
- 아이패드와 [[Apple|애플]]펜슬만으로 쉽고 빠르게
- PencilKit 적극 활용
- [[Apple]] [[Neural Engine]] 적극 활용, 기기 자체에서 폰트 추론하기
- [[Project]] 기반 (like Procreate)
- 추출 전 미리보기 (텍스트 쳐보기) 가능
- 추출 전 여러가지 [[Font Features]]을 켜고 끄며 미리보기 대조 가능
- 추출 후 [[Project|프로젝트]]는 Freeze되며 수정할 수 없음. 대신 다운로드 무제한 가능

## [[Fiercely Overpriced]]

- 비영리 라이센스 $9.99
- 영리 라이센스 $99.99
- 수정할 수 있는 마스터파일 $299.99 (or [[App Store|앱스토어]] 상한선 있는가?)

## Slack Thread & 리소스

- [periannath/neural-fonts: GAN을 활용한 한글 폰트 제작 프로젝트](https://github.com/periannath/neural-fonts)
- 새로운 나눔손글씨 글꼴 - [[Naver|네이버]] 클로바: https://clova.ai/handwriting
- [List of typographic features](https://en.wikipedia.org/wiki/List_of_typographic_features)
- [Implementing OpenType features on the web - Fonts Knowledge - Google Fonts](https://fonts.google.com/knowledge/using_type/implementing_open_type_features_on_the_web)
- 영문 폰트에 대해서 조금 찾아봤어요. 확실히 훠얼씬 쉽네요. 나이브하게 접근해도 아스키에 해당하는 128개 글자만 있으면 되니까요.
- 근데 — 손글씨에 진짜 가까운 폰트를 만들려면 같은 character라도 variation이 좀 있어야 할 것 같아요. 예를 들어서 a가 단어의 시작에 있을때랑 끝에 있을때랑 가운데에 있을때랑 글자의 모양새가 조금씩 달라질 것 같거든요?
- 뿐만 아니라 폰트에는 다이나믹 피쳐 기능으로 조합에 따라 자간, 글자모양, 높낮이 등을 다이나믹하게 바꿀 수 있는데 진정 손글씨스럽게 만들려면 이거까지 생각해야할 것 같아요
- 오히려 국문 폰트는 한글 자체의 극악의 난이도에 빠진 나머지 이런 폰트 피쳐에는 별로 신경을 쓰고 있는 것 같지 않군요
