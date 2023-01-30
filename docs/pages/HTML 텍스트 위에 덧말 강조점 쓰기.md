---
date: 2021-05-04
slug: '/7257B8'
---

그동안 글자 위에 글자를 어떻게 적는지 궁금했는데 [HTML](./../.././docs/pages/HTML.md)의 기본 기능 만으로도 해결 가능하다는 것을 알게 되었다. 참고로 이런 '글자 위의 글자'는 phonetic guide, 후리가나, 루비 문자, 덧말 (한컴오피스), 또는 윗주(MS Word)라고도 한다. [HTML](./../.././docs/pages/HTML.md)에서는 `<ruby>` 태그를 통해 이 기능을 사용할 수 있다.

<div>
  <ruby>大韓民國<rp>(</rp><rt>대한민국</rt><rp>)</rp></ruby>은
  <ruby>民主共和國<rp>(</rp><rt>민주공화국</rt><rp>)</rp></ruby>이다.
</div>

```html
<ruby>大韓民國<rp>(</rp><rt>대한민국</rt><rp>)</rp></ruby>은
<ruby>民主共和國<rp>(</rp><rt>민주공화국</rt><rp>)</rp></ruby>이다.
```

조금 귀찮기는 하지만 한 글자 위에 한 글자씩 대응해서 작성하는 것도 가능하다.

<div>
  <ruby>大<rp>(</rp><rt>대</rt><rp>)</rp></ruby>
  <ruby>韓<rp>(</rp><rt>한</rt><rp>)</rp></ruby>
  <ruby>民<rp>(</rp><rt>민</rt><rp>)</rp></ruby>
  <ruby>國<rp>(</rp><rt>국</rt><rp>)</rp></ruby>은
  <ruby>民<rp>(</rp><rt>민</rt><rp>)</rp></ruby>
  <ruby>主<rp>(</rp><rt>주</rt><rp>)</rp></ruby>
  <ruby>共<rp>(</rp><rt>공</rt><rp>)</rp></ruby>
  <ruby>和<rp>(</rp><rt>화</rt><rp>)</rp></ruby>
  <ruby>國<rp>(</rp><rt>국</rt><rp>)</rp></ruby>이다.
</div>

```html
<ruby>大<rp>(</rp><rt>대</rt><rp>)</rp></ruby>
<ruby>韓<rp>(</rp><rt>한</rt><rp>)</rp></ruby>
<ruby>民<rp>(</rp><rt>민</rt><rp>)</rp></ruby>
<ruby>國<rp>(</rp><rt>국</rt><rp>)</rp></ruby>은
<ruby>民<rp>(</rp><rt>민</rt><rp>)</rp></ruby>
<ruby>主<rp>(</rp><rt>주</rt><rp>)</rp></ruby>
<ruby>共<rp>(</rp><rt>공</rt><rp>)</rp></ruby>
<ruby>和<rp>(</rp><rt>화</rt><rp>)</rp></ruby>
<ruby>國<rp>(</rp><rt>국</rt><rp>)</rp></ruby>이다.
```

---

## 응용

매번 이렇게 쓰기 귀찮으니 나만의 문법을 만들어 util 함수를 작성해봤다.

```js
const processRuby = (text) => {
  if (text.includes('{{') && text.includes('^') && text.includes('}}')) {
    splitted = text.split(/{{|}}/)
    const rubified = splitted.map((s) => rubify(s))
    return rubified.join('')
  } else return text
}

const rubify = (text) => {
  if (text.includes('^^')) {
    caretSplitted = text.split('^^')
    if (caretSplitted[1] === '') {
      caretSplitted[1] = '•'.repeat(caretSplitted[0].length)
    }
    caretText = ''
    for (let x = 0; x < caretSplitted[0].length; x++) {
      if (caretSplitted[0][x] !== ' ')
        caretText +=
          '<ruby>' + caretSplitted[0][x] + '<rp>(</rp><rt>' + (caretSplitted[1][x] || '') + '</rt><rp>)</rp></ruby>'
      else caretText += ' '
    }
    return caretText
  } else if (text.includes('^')) {
    caretSplitted = text.split('^')
    return '<ruby>' + caretSplitted[0] + '<rp>(</rp><rt>' + caretSplitted[1] + '</rt><rp>)</rp></ruby>'
  } else return text
}
```

---

`{{`와 `}}` 사이에 `^`를 기준으로 오른쪽을 왼쪽 위에 중앙 정렬해서 올려 준다.

```js
processRuby('{{大韓民國^대한민국}}은 {{民主共和國^민주공화국}}이다.')
```

<div>
<ruby>大韓民國<rp>(</rp><rt>대한민국</rt><rp>)</rp></ruby>은 <ruby>民主共和國<rp>(</rp><rt>민주공화국</rt><rp>)</rp></ruby>이다.
</div>

---

`^^`를 사용하면 글자마다 맞춰준다.

```js
processRuby('{{大韓民國^^대한민국}}은 {{民主共和國^^민주공화국}}이다.')
```

<div>
<ruby>大<rp>(</rp><rt>대</rt><rp>)</rp></ruby><ruby>韓<rp>(</rp><rt>한</rt><rp>)</rp></ruby><ruby>民<rp>(</rp><rt>민</rt><rp>)</rp></ruby><ruby>國<rp>(</rp><rt>국</rt><rp>)</rp></ruby>은 <ruby>民<rp>(</rp><rt>민</rt><rp>)</rp></ruby><ruby>主<rp>(</rp><rt>주</rt><rp>)</rp></ruby><ruby>共<rp>(</rp><rt>공</rt><rp>)</rp></ruby><ruby>和<rp>(</rp><rt>화</rt><rp>)</rp></ruby><ruby>國<rp>(</rp><rt>국</rt><rp>)</rp></ruby>이다.
</div>

---

대부분의 경우 `^^` 왼쪽과 오른쪽 글자 수를 같게 사용하겠지만, 아니라면 `^^` 왼쪽을 기준으로 왼쪽정렬된다. 왼쪽 글자 수를 넘어가면 무시된다.

```js
processRuby('{{大韓民國^^대한}}은 {{民主共和國^^민주공화국국}}이다.')
```

<div>
<ruby>大<rp>(</rp><rt>대</rt><rp>)</rp></ruby><ruby>韓<rp>(</rp><rt>한</rt><rp>)</rp></ruby><ruby>民<rp>(</rp><rt></rt><rp>)</rp></ruby><ruby>國<rp>(</rp><rt></rt><rp>)</rp></ruby>은 <ruby>民<rp>(</rp><rt>민</rt><rp>)</rp></ruby><ruby>主<rp>(</rp><rt>주</rt><rp>)</rp></ruby><ruby>共<rp>(</rp><rt>공</rt><rp>)</rp></ruby><ruby>和<rp>(</rp><rt>화</rt><rp>)</rp></ruby><ruby>國<rp>(</rp><rt>국</rt><rp>)</rp></ruby>이다.
</div>

---

`^` 를 사용할 때는 좌우 글자 수가 달라도 중앙 정렬되기에 상관 없다.

```js
processRuby('{{大韓民國^대한}}은 {{民主共和國^민주공화국국}}이다.')
```

<div>
<ruby>大韓民國<rp>(</rp><rt>대한</rt><rp>)</rp></ruby>은 <ruby>民主共和國<rp>(</rp><rt>민주공화국국</rt><rp>)</rp></ruby>이다.
</div>

---

`^^` 오른쪽을 비워두면 강조점을 자동으로 왼쪽 길이에 맞춰 넣어준다. 강조점은 글자 위에 `•`가 매칭되어야 하므로 `^^`를 사용해야 강조점을 제대로 삽입할 수 있다.

```js
processRuby('{{大韓民國^^}}은 {{民主共和國^^}}이다.')
```

<div>
<ruby>大<rp>(</rp><rt>•</rt><rp>)</rp></ruby><ruby>韓<rp>(</rp><rt>•</rt><rp>)</rp></ruby><ruby>民<rp>(</rp><rt>•</rt><rp>)</rp></ruby><ruby>國<rp>(</rp><rt>•</rt><rp>)</rp></ruby>은 <ruby>民<rp>(</rp><rt>•</rt><rp>)</rp></ruby><ruby>主<rp>(</rp><rt>•</rt><rp>)</rp></ruby><ruby>共<rp>(</rp><rt>•</rt><rp>)</rp></ruby><ruby>和<rp>(</rp><rt>•</rt><rp>)</rp></ruby><ruby>國<rp>(</rp><rt>•</rt><rp>)</rp></ruby>이다.
</div>

---

하루키처럼 강조점을 길게 넣는 것도 가능하다.

- 무라카미 하루키, 〈직업으로서의 소설가〉, 현대문학(2015), 248쪽.

```js
processRuby('{{분할한 나 자신을 타자에 위탁할 수 있다^^}}는 것입니다.')
```

<quote>
<ruby>분<rp>(</rp><rt>•</rt><rp>)</rp></ruby><ruby>할<rp>(</rp><rt>•</rt><rp>)</rp></ruby><ruby>한<rp>(</rp><rt>•</rt><rp>)</rp></ruby> <ruby>나<rp>(</rp><rt>•</rt><rp>)</rp></ruby> <ruby>자<rp>(</rp><rt>•</rt><rp>)</rp></ruby><ruby>신<rp>(</rp><rt>•</rt><rp>)</rp></ruby><ruby>을<rp>(</rp><rt>•</rt><rp>)</rp></ruby> <ruby>타<rp>(</rp><rt>•</rt><rp>)</rp></ruby><ruby>자<rp>(</rp><rt>•</rt><rp>)</rp></ruby><ruby>에<rp>(</rp><rt>•</rt><rp>)</rp></ruby> <ruby>위<rp>(</rp><rt>•</rt><rp>)</rp></ruby><ruby>탁<rp>(</rp><rt>•</rt><rp>)</rp></ruby><ruby>할<rp>(</rp><rt>•</rt><rp>)</rp></ruby> <ruby>수<rp>(</rp><rt>•</rt><rp>)</rp></ruby> <ruby>있<rp>(</rp><rt>•</rt><rp>)</rp></ruby><ruby>다<rp>(</rp><rt>•</rt><rp>)</rp></ruby>는 것입니다.
</quote>

<head>
  <html lang="en-US"/>
</head>
