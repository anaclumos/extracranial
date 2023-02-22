---
date: 2019-11-07
slug: '/A11B23'
---

Ghost CMS는 기본적으로 모든 외부 URL을 같은 창에서 연다. 이 경우 방문자의 관심이 분산되고 방문자 이탈률이 높아진다. Ghost 내에 외부 링크를 새로운 창에서 열 수 있도록 설정해주는 기본 옵션은 아직 없는 것 같으나 짧은 코드를 주입함으로써 이를 쉽게 해결할 수 있다.

```js
<script>
var links = document.querySelectorAll('a');
for (var i = 0; i < links.length; i++) {
  if (links[i].hostname != window.location.hostname) {
    links[i].target = '_blank';
    links[i].rel = 'noopener';
  }
}
</script>
```

이 코드를 Ghost Settings → Code injection → Site Footer에 붙여넣으면 된다.

## 원리

```js
<script>

// 모든 a 태그를 배열에 담는다.
var links = document.querySelectorAll('a');

// 모든 링크에 대해서,
for (var i = 0; i < links.length; i++) {

  // 만약 그 링크의 hostname이 나의 블로그 주소의 hostname과 다르다면,
  // = 외부 URL이라면,
  if (links[i].hostname != window.location.hostname) {

    // 그 링크의 target과 rel을 각각 다음 값들로 변경한다.
    links[i].target = '_blank';
    links[i].rel = 'noopener';

  }
}

</script>
```

링크의 `target`을 `_blank`로 바꾸게 되면 외부 링크가 새로운 창에서 열리게 된다. 하지만 이 값만 설정해주면 새로운 창이 기존 창과 같은 프로세스에서 실행되어 성능 저하가 일어날 수 있고 보안이 취약해진다. 이를 방지하기 위해 추가로 `rel` 값을 `noopener` 로 설정해준다.

물론 이렇게 매번 [[JavaScript]]를 통해 링크를 조작하는 방법은 웹 성능에 영향을 줄 수 있으나 많은 양의 링크를 첨부하지 않는 이상 유의미한 차이는 없을 것이다. Ghost가 외부 링크를 새로운 창에서 열 수 있도록 설정해주는 옵션을 제공하기 전까지는 유용하게 사용할 수 있는 방법이다.

## 추가 자료

- Links to cross-origin destinations are unsafe, _Google Developers_\
  <https://developers.google.com/web/tools/lighthouse/audits/noopener>
