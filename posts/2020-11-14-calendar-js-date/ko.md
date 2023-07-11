---
title: 'JS로 달력 만들기 🗓'
date: 2020-11-14
authors: anaclumos
slug: '/F522B3'
---

다른 라이브러리 없이 Vanilla JS만으로 달력을 작성해보자. 우아한테크캠프 당시 3번째 프로젝트 "뱅크샐러드 클론 만들기"에서 내가 담당했던 파트이다. 복습하고 정리하는 차원에서 다시 작성해보기로 했다.

## 완성본 미리보기

- [github.com/anaclumos/vanilla-js-calendar](https://github.com/anaclumos/vanilla-js-calendar)
- [demo.cho.sh/calendar.js/](https://demo.cho.sh/calendar.js/)

## 목표

- DOM 생성 이후 DOM 조작하지 않기. 즉 모든 작업은 페이지를 생성하는 시점에서 끝내기. document.querySelector와 같은 DOM API를 사용하고자 않고자 하는 것이다. 이는 "이쪽에서 A로 조작하고 저쪽에서 B로 조작하고 또 반대편에서 C로 조작하고 순서 꼬이고 코드 엉키고" 같은 현상을 방지하기 위함이다. 단, 처음 앱을 선택하여 initialize할 때만 `document.querySelector('#App')`을 사용한다.
- OOP 자바스크립트 대신 작은 함수들로 작성하기

## 사용할 스택

- Date Object (Vanilla JS)
- Display: Grid (CSS)

## 1. index.html 작성하기

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calendar + Grid</title>
  </head>

  <body>
    <div id="App"></div>
  </body>
</html>
```

VS Code의 보일러 플레이트를 사용했다.

## 2. calendar.js 작성하기

우선 `index.html`의 `head` 태그 안에 코드를 연결하자.

```html
<script src="calendar.js"></script>
```

### 2-1. calendar.js에 사용할 util 함수 작성하기

`html` string highlighting을 위한 html 함수를 추가한다. 이 함수를 추가하고 backtick으로 감싸진 JS String 앞에 html 글자를 추가하면 JS String을 html처럼 하이라이팅하여 사용할 수 있다.

```js
const html = (s, ...args) => s.map((ss, i) => `${ss}${args[i] || ''}`).join('')
```

매직넘버를 없애기 위해 `const`들을 추가해주었다. 코드 중 갑자기 `7`이 튀어나오면 어느 맥락의 7인지 알기 어렵기 때문이다.

```js
const NUMBER_OF_DAYS_IN_WEEK = 7
const NAME_OF_DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
```

가장 기초가 될 `renderCalendar`를 작성해주었다. 또한 `renderCalendar`를 기존 `index.html` 최하단에 연결해주었다.

```js
const renderCalendar = ($target) => {
  $target.innerHTML = getCalendarHTML()
}
```

```html
<script>
  renderCalendar(document.querySelector('#App'))
</script>
```

달력을 그리기 위해서 총 4개의 Date 객체가 필요했다. 물론 더 적은 Date 객체로 처리할 수**도** 있다. 달력에 구현할 기능들에 따라 필요한 Date 객체의 개수가 달라진다.

- 지난 달 마지막 날: 달력에 지난 달을 그릴 때 일요일을 하이라이트하기 위해 필요하다.
- 이번 달 첫 날: 이번 달의 토요일과 일요일의 파악하여 하이라이트 하기 위해 필요하다. 또한 이번 달 첫 날의 요일을 통해 지난 달 마지막 주를 달력에 표시할 때 필요하다.
- 이번 달 마지막 날: 이번 달의 달력을 for statement로 그릴 때 필요하다.
- 다음 달 첫 날: 달력에 다음달을 그릴 때 토요일을 하이라이트하기 위해 필요하다.

이 4개의 날짜를 object로 묶어 `return`해주는 함수를 만들었다. `argument`로 Date 객체 1개를 받으며 이 달력에서는 "오늘"에 해당하는 Date 객체를 넣어줄 것이다.

```js
const processDate = (day) => {
  const date = day.getDate()
  const month = day.getMonth()
  const year = day.getFullYear()
  return {
    lastMonthLastDate: new Date(year, month, 0),
    thisMonthFirstDate: new Date(year, month, 1),
    thisMonthLastDate: new Date(year, month + 1, 0),
    nextMonthFirstDate: new Date(year, month + 1, 1),
  }
}
```

### 2-2. getCalendarHTML 만들기

이제 본격적으로 달력을 그려보자. 달력에 들어갈 내용을 HTML로 반환해주는 `getCalendarHTML` 함수를 만들었다. `getCalendarHTML` 함수는 조금 거대해서 먼저 틀을 잡아주었다.

```js
const getCalendarHTML = () => {
  let today = new Date()
  let { lastMonthLastDate, thisMonthFirstDate, thisMonthLastDate, nextMonthFirstDate } = processDate(today)
  let calendarContents = []

  // ...

  return calendarContents.join('')
}
```

맨 위에 요일을 표시할 줄을 추가하자. 처음에 추가한 `const`를 사용해서 매직넘버를 제거한다.

```js
for (let d = 0; d < NUMBER_OF_DAYS_IN_WEEK; d++) {
  calendarContents.push(html`<div class="${NAME_OF_DAYS[d]} calendar-cell">${NAME_OF_DAYS[d]}</div>`)
}
```

그 다음 지난 달을 그리자. 예를 들어 이번 달의 첫 날이 수요일이라면 일요일, 월요일, 화요일에 해당하는 지난 달을 그려주는 역할이다. 일요일에 해당하는 날은 `sun` HTML Class를 추가해준다.

```js
for (let d = 0; d < thisMonthFirstDate.getDay(); d++) {
  calendarContents.push(
    html`<div
      class="
          ${d % 7 === 0 ? 'sun' : ''}
          calendar-cell
          past-month
        "
    >
      ${lastMonthLastDate.getMonth() + 1}/${lastMonthLastDate.getDate() - thisMonthFirstDate.getDay() + d}
    </div>`
  )
}
```

비슷한 원리로 이번 달을 그리자. 오늘에 해당하는 날은 `today` HTML Class와 " today" String을 추가해준다. 마찬가지로 토요일과 일요일에는 각각 `sat`과 `sun` HTML Class를 추가해준다.

```js
for (let d = 0; d < thisMonthLastDate.getDate(); d++) {
  calendarContents.push(
    html`<div
      class="
          ${today.getDate() === d + 1 ? 'today' : ''}
          ${(thisMonthFirstDate.getDay() + d) % 7 === 0 ? 'sun' : ''}
          ${(thisMonthFirstDate.getDay() + d) % 7 === 6 ? 'sat' : ''}
          calendar-cell
          this-month
        "
    >
      ${d + 1} ${today.getDate() === d + 1 ? ' today' : ''}
    </div>`
  )
}
```

마지막으로 남은 칸들에 다음 달의 날짜들을 그려준다.

```js
let nextMonthDaysToRender = 7 - (calendarContents.length % 7)

for (let d = 0; d < nextMonthDaysToRender; d++) {
  calendarContents.push(
    html`<div
      class="
          ${(nextMonthFirstDate.getDay() + d) % 7 === 6 ? 'sat' : ''}
          calendar-cell
          next-month
        "
    >
      ${nextMonthFirstDate.getMonth() + 1}/${d + 1}
    </div>`
  )
}
```

## 3. CSS 작성하기

### 3-1. display: grid 이용하기

하나의 element에 `display: grid`를 사용하면 그 자식 element들을 그리드(표) 안에 깔끔하게 넣을 수 있다.

- `grid-template-columns`: column을 어떻게 배치시킬지에 대한 정보. `1fr`은 `1 fraction`이라는 뜻으로 여기서는 총 7번 작성했으니 너비가 동일한 7개의 column이 생성된다.
- `grid-template-rows`: row의 크기를 정의해줄 수 있다. 여기서는 `3rem` 하나만 있으니 **첫번째** row를 3rem이라고 정의한 것이다.
- `grid-auto-rows`: 이후의 row를 크기를 정의해줄 수 있다. 여기서는 `6rem`이라고 되어 있으니 이후의 모든 row는 row 크기가 6rem인 것이다.

아래에는 추가적인 스타일을 정의해주었다.

```css
#App {
  /* grid */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 3rem;
  grid-auto-rows: 6rem;

  /* style */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  border: 1px solid black;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}
```

- 표 등을 그릴 때 마치 엑셀처럼 모든 칸을 균일한 테두리로 감싸고 싶은데 가장 바깥쪽의 셀들만 선이 얇은 경우가 있다. HTML로 따지자면 `th`와 `td`에만 border를 적용한 상태다.
- 나는 이것을 "모든 셀들 테두리에 n px, 표 테두리에 n px" border를 적용하는 것을 선호한다. 이렇게 하면 전체적으로 `2n px`의 균일한 테두리가 생긴다.

```css
.calendar-cell {
  border: 1px solid black; /* #App에 적용한 border와 함께 2px의 균일한 테두리가 생긴다.*/
  padding: 0.5rem;
}
```

### 3-2. 토요일과 일요일, 오늘 하이라이팅

```css
.past-month,
.next-month {
  color: gray;
}

.sun {
  color: red;
}

.sat {
  color: blue;
}

.past-month.sun {
  color: pink;
}

.next-month.sat {
  color: lightblue;
}

.today {
  color: #e5732f;
}
```

## 느낀 점

- 처음에 JS와 연결하여 달력을 "initialize"할 때 살짝 헤맸다. `renderCalendar`를 `body` 상단에 연결했기 때문이다. DOM은 순차적으로 실행되기 때문에 상단에 연결할 경우 `#App` div가 나타나지 않았을 때 `renderCalendar`가 실행되어 DOM element를 찾지 못한다.
- 또 JS의 연관 관계로 표현될 수 있는 코드들을 어떻게 화면에 렌더링하는지 기억이 잘 나지 않았다. 단순히 가장 첫 index.js 역할을 하는 js에서 앱을 querySelect한 후 innerHTML로 넣어주는 것이었다.
- 우아한테크캠프 프로젝트에서는 매직 넘버를 사용했었다. 이번에는 매직 넘버를 제거하여 가독성을 향상시켰다.
- 우아한테크캠프 프로젝트는 Object Oriented한 자바스크립트(더 정확하게는 Singleton 패턴)로 작성되어 있었는데, 이번에는 작은 함수들로 쪼개서 작성했다.
- ES6+ 문법을 사용하기 위해 노력했다. 예를 들어 백틱에 변수를 넣거나 processDate의 반환 데이터를 destructuring해서 사용했다. 또 let과 const를 주로 사용했다.
- `getCalendarHTML`를 조금 더 짧게 작성할 수 없었는지 아쉬움이 남는다.
