---
lang: 'en'
slug: '/86587B'
aliases:
  [
    'Las Vegas Algorithms',
    '라스 베가스 알고리즘',
    '라스베가스 알고리즘',
    '라스베이거스 알고리즘',
    '라스 베이거즈 알고리즘',
  ]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId='lang' queryString>
<TabItem value='en' label='English 🇺🇸' lang='en-US' default>
<div lang='en-US'>

A Las Vegas algorithm is a randomized algorithm that always produces a correct result or outputs that it has failed to find a solution. Randomness comes into play regarding the time taken to get a result. Unlike the [[Monte Carlo Algorithm|Monte Carlo algorithms]], which may produce incorrect results with a certain [[probability]], a Las Vegas algorithm ensures that it is correct when it does have an impact.

An illustrative example is the [[Quickselect]] algorithm, a cousin of the Quicksort algorithm. [[Quickselect]] finds the $k$-th smallest element of an unordered list. While it uses randomness to achieve its expected runtime, it always provides the correct element as an answer.

Interestingly, Las Vegas always gives the correct results but sometimes gives a very slow answer. You **bet** (risk) on time on the promise of accurate results—another exciting property in [[Computational Theory]].

</div>
</TabItem>
<TabItem value='ko' label='한국어 🇰🇷' lang='ko-KR'>
<div lang='ko-KR'>

라스베가스 알고리즘은 무작위 알고리즘으로, 항상 올바른 결과를 산출하거나 해결책을 찾지 못했다고 출력한다. 결과를 얻는 데 걸리는 시간과 관련하여 무작위성이 작용한다. 특정 확률로 잘못된 결과를 생성할 수 있는 [[Monte Carlo Algorithm|몬테카를로 알고리즘]]과 달리, 라스베가스 알고리즘은 정확한 결과를 보장한다.

퀵소트 알고리즘의 변형인 퀵셀렉트 알고리즘을 예로 들 수 있다. 퀵셀렉트는 정렬되지 않은 목록에서 $k$번째로 작은 요소를 찾는다. 예상 실행 시간을 달성하기 위해 무작위성을 사용하지만, 항상 올바른 요소를 정답으로 제공한다.

마찬가지로 흥미로운 점은, 라스베가스 알고리즘은 추산치의 값은 매우 정확하지만 아주 낮은 확률로 시간이 엄청나게 오래 걸린다는 것이다. 즉 정확도를 약속 받는 대신 시간에 리스크를 거는 것이다. 마찬가지로 [[Computational Theory|계산 이론]]에서 흥미로운 점이 아닐 수 없다.

</div>
</TabItem>
</Tabs>

[[Monte Carlo and Las Vegas Algorithm]]
