---
lang: 'en'
slug: '/9D553C'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId='lang' queryString>
<TabItem value='en' label='English 🇺🇸' lang='en-US' default>
<div lang='en-US'>

Jaccard Distance is a measure used to quantify the dissimilarity between two sets. It is derived from the Jaccard index (also known as the Jaccard similarity coefficient), which measures the similarity between finite sample sets. The Jaccard index is calculated as the size of the intersection divided by the size of the union of the sample sets.

The Jaccard Distance, which quantifies how dissimilar two sets are, is calculated as the complement of the Jaccard index. It is defined as:

$$
\text{Jaccard Distance} = 1 - \text{Jaccard Index}
$$

Or, in terms of set notation:

$$
\text{Jaccard Distance} (A, B) = 1 - \frac{|A \cap B|}{|A \cup B|}
$$

where:

- $A$ and $B$ are two sets,
- $|A \cap B|$ is the size of the intersection of the sets $A$ and $B$, and
- $|A \cup B|$ is the size of the union of the sets $A$ and $B$.

The Jaccard Distance ranges from 0 to 1, where 0 indicates that the sets are identical, and 1 indicates that the sets have no elements in common. This measure is widely used in various fields such as computational biology, information retrieval, and machine learning, particularly in clustering and similarity measurement tasks.

</div>
</TabItem>
<TabItem value='ko' label='한국어 🇰🇷' lang='ko-KR'>
<div lang='ko-KR'>

Jaccard 거리는 두 집합 간의 불일치를 정량화하기 위해 사용되는 척도다. 이는 유한 샘플 집합 간의 유사성을 측정하는 Jaccard 지수(또는 Jaccard 유사성 계수)에서 파생된다. Jaccard 지수는 샘플 집합의 교집합 크기를 합집합 크기로 나눈 값으로 계산된다.

두 집합이 얼마나 다른지를 정량화하는 Jaccard 거리는 Jaccard 지수의 보완으로 계산된다. 이는 다음과 같이 정의된다:

$$
\text{Jaccard 거리} = 1 - \text{Jaccard 지수}
$$

또는 집합 표기법으로는:

$$
\text{Jaccard 거리} (A, B) = 1 - \frac{|A \cap B|}{|A \cup B|}
$$

여기서:

- $A$와 $B$는 두 집합이다,
- $|A \cap B|$는 집합 $A$와 $B$의 교집합 크기이며,
- $|A \cup B|$는 집합 $A$와 $B$의 합집합 크기다.

Jaccard 거리는 0에서 1 사이의 범위를 가지며, 0은 집합이 동일함을, 1은 집합이 공통의 요소가 없음을 나타낸다. 이 척도는 계산 생물학, 정보 검색, 기계 학습 등 다양한 분야에서 널리 사용되며, 특히 클러스터링과 유사성 측정 작업에서 중요하게 사용된다.

</div>
</TabItem>
</Tabs>
