---
date: 2019-11-08
slug: '/B790F3'
---

최근 [Spoqa Han Sans](https://spoqa.github.io/spoqa-han-sans/ko-KR/)라는 글씨체를 알게 되었다. 간결하면서 가독성이 높아 매력적이었다. 반면 Spoqa Han Sans의 영어 글씨체는 매력적인 느낌이 덜했다 (나는 Noto Sans의 영문 글씨체도 그렇게 좋아하지 않았다.)

한참을 찾아본 결과 글씨체마다 언어 영역을 정의하는 방법을 알아냈다. 글씨체를 CSS 내에서 불러올 때 다음과 같이 `unicode-range`를 추가해주면 된다.

```css
@font-face {
  font-family: 'Spoqa Han Sans';

  /* 생략 */

  unicode-range: U+AC00-D7AF;
}
```

`U+AC00-D7AF`는 한글 문자의 유니코드 영역이다.

## `@font-face`는 어디에 있나요?

대부분 글씨체를 추가하는 경우 다음 두 방법 중 하나로 글씨체를 `import`한다.

```html
<link
  href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css"
  rel="stylesheet"
  type="text/css"
/>
```

```css
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css);
```

이 경우 내가 글씨체 업데이트를 하지 않아도 글씨체 서버에서 글씨체가 업데이트되면 자동으로 나도 업데이트된 글씨체를 쓸 수 있다는 장점이 있다 (물론 때론 단점이기도 하다). 하지만 위처럼 `unicode-range`를 지정할 수 없다. 그래서 위처럼 `import`하는 대신 그 실제 데이터를 가져오면 된다. `import`되는 URL 앞에 `https:`를 붙여 접속하면 라이선스와 함께 `@font-face`가 정의되어 있다.

이 값을 바로 복사해서 CSS에 추가해주고 `unicode-range`를 정의해주면 된다. 이 경우 글씨체 업데이트가 자동으로 되지 않으며, 글씨체 업데이트를 원한다면 `@font-face`를 가져온 링크에 다시 접속해서 업데이트된 글씨체의 `@font-face`를 다시 복사해오면 된다.
