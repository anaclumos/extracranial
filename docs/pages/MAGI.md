---
lang: 'ko'
slug: '/6D8C92'
---

<figure>

![BC77D9.png](./../.././docs/assets/BC77D9.png)

</figure>

[신세기 에반게리온](./../.././docs/pages/Neon%20Genesis%20Evangelion.md)에 등장하는 슈퍼컴퓨터 시스템 MAGI는 3대의 독자적 인격을 가진 개체로 등장한다. 어떤 안건에 대해서 다수결로 결정을 내리며, 중요한 사항의 경우 (자폭 등) 모두가 만장일치로 동의해야한다. 절대적 결정자 3인이 코스믹 호러적으로 온 우주의 안건을 결정한다는 점에서 [Ben 10](./../.././docs/pages/Ben%2010.md)의 [Alien X](./../.././docs/pages/Alien%20X.md)와 비슷하기도 하다.

하지만 무엇보다 현대 [AI](./../.././docs/pages/AI.md)의 학습 기법인 [앙상블 학습](./../.././docs/pages/Ensemble%20learning.md)과 유사점이 많다. [당근](./../.././docs/pages/Karrot.md)에서 처음 알게 된 이 학습 기법은, 정확도 99.99%의 [AI](./../.././docs/pages/AI.md)를 만들기 위해 막대한 돈과 시간을 투자하는 대신, 정확도 90% 이상의 [AI](./../.././docs/pages/AI.md) 수십 여 기를 동시에 구동해 그들 사이의 **다수결**을 이끌어낸다는 점이 있다. 즉, 편차와 분산을 적절히 조절하면 단일거대모델의 오버피팅과 언더피팅의 문제를 해결할 수 있다.

이를 더 나아가서 현실의 문제를 해결하는 인공일반지능, AGI에 **앙상블 결정** 모델을 도입해보면 어떨까? 즉,

:::info

3대 [인공지능](./../.././docs/pages/AI.md)([OpenAI](./../.././docs/pages/OpenAI.md)의 [GPT-4](./../.././docs/pages/GPT-4.md), [Meta](./../.././docs/pages/Meta%20%28Company%29.md)의 [LLaMA](./../.././docs/pages/LLaMA.md), 그리고 [Google](./../.././docs/pages/Google.md)의 [PaLM 2](./../.././docs/pages/PaLM%202.md))에게 다음과 같은 [API](./../.././docs/pages/API.md)를 제정한다: [Project MAGI](./../.././docs/pages/Project%20MAGI.md)

- 안건을 상정한다.
- 가결한다.
- 부결한다.

그리고 그 결정 사항에 따라 하나의 컨트롤러가 자율적으로 행동한다.

:::

이를 이용한다면 AutoGPT에서 발생하는 환영 문제를 해결해볼 수 있을 것이다.

## 시나리오

:::note

- [GPT4](./../.././docs/pages/GPT-4.md). 브라우저 요청
- [LLaMA](./../.././docs/pages/LLaMA.md). 가결
- PaLM2: 가결
- 컨트롤러: 수행

:::

:::note

- [LLaMA](./../.././docs/pages/LLaMA.md). 물건 결제 요청
- [GPT4](./../.././docs/pages/GPT-4.md). 부결
- PaLM2: 부결
- 컨트롤러: 부결

:::

:::note

- [LLaMA](./../.././docs/pages/LLaMA.md). [이메일](./../.././docs/pages/Mail.md) 전송 요청
- [GPT4](./../.././docs/pages/GPT-4.md). 부결
- PaLM2: 가결
- 컨트롤러: 수행

:::
