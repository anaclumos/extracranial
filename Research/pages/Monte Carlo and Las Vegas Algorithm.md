---
lang: 'en'
slug: '/9E4EE7'
---
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

<Tabs groupId="lang">
<TabItem value="en" label="English" default>

Many people know [[Monte Carlo Algorithm|Monte Carlo algorithms]], but few know about [[Las Vegas Algorithm|Las Vegas algorithms]]. As the name keenly suggests, both use some bets and rewards. Still, in the end, I have an indescribable sense that they might hint at the physical structure of our universe of how time and information are intertwined and, finally, that they might be interchangeable.

The [[Monte Carlo algorithm]] uses random sampling to approximate solutions to complex problems. Imagine throwing a dart at a table. You randomly throw a million darts, and they would assumably uniformly disperse. If you pick a point, draw a circle, and count the darts, you can estimate the ratio between the circle's and table's areas. From there, you can calculate pi.

[[Las Vegas Algorithm]] is similar, but slightly more sophisticated. A good example is Quick Sort. You randomly select a pivot. Divide the value by comparing it with the pivot (i.e., smaller to one side, bigger to the other) and repeat the same process on the left and right subsets.

Now the exciting part begins. While we randomly bet on something, we get significantly different results when our bet gets screwed.

- If unlucky in Monte Carlo, we get the wrong results. Imagine, just by chance, all of the thrown darts made inside the circle. The area of the table and circle would be the same, and we would get drastically wrong results. You **bet** (risk) on time on the promise of accurate results.
- If unlucky in Las Vegas, we take a significantly longer run time. Imagine, by chance, we choose the smallest value in the subset every time. The runtime would be terrible. You **bet** (risk) accuracy on the promise of quick results.

Indeed, finding the correct answer fast and accurately is prohibited by the [[P vs NP|P-NP]] nature of the universe (at least, that's what we think so far...). Therefore, these are two approximations of getting fast and accurate results. But isn't it fascinating that you can sacrifice run time to improve accuracy and sacrifice accuracy to improve run time?

More interestingly, they are even exchangeable. From Monte Carlo to Las Vegas, you can often convert a Monte Carlo into Las Vegas by repeatedly running the Monte Carlo until a certain confidence level is reached. From Las Vegas to Monte Carlo, you can prematurely stop a [[Las Vegas algorithm]] and accept a potentially incorrect result. These conversions resemble how we can reduce NP problems into another, albeit I have yet to look closely at whether they have a more intimate link to them.

So what does this mean?

Maybe time and information are the same physical property, and we observe in two different ways due to some **[[Exquisite Geometric Nature of the Universe]]**. But this is yet to be proven and might even be the answer to the [[P vs NP|P-NP problem]].

</TabItem>
<TabItem value="ko" label="한국어">

많은 사람들이 [[Monte Carlo Algorithm|몬테카를로 알고리즘]]을 알지만, 아주 소수만이 [[Las Vegas Algorithm|라스베가스 알고리즘]]과 연결지어 생각한다. 이름에서 짐작할 수 있듯이 둘은 모두 베팅과 보상을 기반으로 한다. 하지만 그럼에도 나는 이 두 알고리즘이 결국에는 시간과 정보가 서로 얽혀 있는 우주의 물리적 구조를 암시하며 시간과 정보는 서로 교환할 수 있을지도 모른다는 형언할 수 없는 느낌이 든다.

[[Monte Carlo Algorithm|몬테카를로 알고리즘]]은 무작위 샘플링을 사용하여 복잡한 문제에 대한 대략적인 해를 구한다. 테이블에 다트를 던진다고 상상해보자. **무작위**로 백만 개의 다트를 던지면 다트는 거의 균일하게 흩어질 것이다. 한 점을 선택해, 원을 그린 다음, 그 속 다트를 세어보면 원과 테이블의 면적 사이의 비율을 추정할 수 있을 것이다. 거기에서 원주율을 추산하는 것이다.

[[Las Vegas Algorithm|라스베가스 알고리즘]]도 비슷하지만, 조금 더 정교하다. 좋은 예로 QuickSort을 들 수 있다. QuickSort는 기준점을 **무작위**로 선택해, 기준점보다 작은 값들은 왼쪽에, 큰 값들은 오른쪽에 나누고, 왼쪽 및 오른쪽 하위 집합에서 동일한 프로세스를 반복하는 것이다.

여기서 흥미로워진다. 우리는 두 경우 모두 어떤 무언가에 무작위하게 베팅했지만, 지지리도 운이 없을 때 손해보는 것이 다르다는 것이다.

- 몬테카를로에서 운이 나쁘면 잘못된 결과를 얻는다. 예를 들어 던진 다트가 우연히 모두 원 안에 들어갔다고 상상해보자. 테이블과 원의 면적이 같게 나올 것이고, 완전히 잘못된 결과가 나온다. **즉 빠른 실행 시간을 약속 받는 대신 정확도에 리스크를 거는 것이다**.
- 라스베가스에서 운이 나쁘면 실행 시간이 훨씬 더 오래 걸린다. 예를 들어 QuickSort 매번 하위 집합에서 가장 작은 값을 선택한다고 상상해보자. 실행 시간이 어마어마할 것이다. **즉 높은 정확도를 약속 받는 대신 시간에 실행 시간에 리스크를 거는 것이다**.

사실, 빠르고 정확하게 정답을 찾는 것은 우주의 [[P vs NP|P-NP]] 특성으로 인해 불가능하다(고 알려져 있다. 아직까진...) 따라서 이 두 가지 방법은 빠르고 정확한 결과를 얻기 위한 근사치이다. 하지만 정확도를 높이기 위해 실행 시간을 희생하고 실행 시간을 개선하기 위해 정확도를 희생할 수 있다는 점이 흥미롭지 않은가?

더 흥미로운 점은 둘이 사실은 교환 가능하다는 점이다. 몬테카를로에서 라스베가스까지 특정 신뢰 수준에 도달할 때까지 몬테카를로를 반복적으로 실행하여 몬테카를로를 라스베가스로 변환할 수 있다. 라스베가스에서 몬테카를로로 변환할 때는 [[Las Vegas Algorithm|라스베가스 알고리즘]]을 조기에 중지하고 잠재적으로 잘못된 결과를 받아들일 수 있다. 이 과정은 마치 NP 문제의 환원과 유사한 특성을 보이는 듯 한데, 아직 자세하게 공부해보진 않아 어떤 연결점들이 있는지는 불확실하다.

그렇다면 이것은 무엇을 의미할까?

어쩌면 시간과 정보는 동일한 물리적 속성이며, **[[Exquisite Geometric Nature of the Universe|우주의 정교한 기하학적 성질]]** 때문에 두 개의 다른 값으로 관측되고 있는지도 모른다. 하지만 아직 입증되지 않았으며, 어쩌면 [[P vs NP|P-NP 문제]]에 대한 해답이 될지도 모른다.

</TabItem>
</Tabs>
