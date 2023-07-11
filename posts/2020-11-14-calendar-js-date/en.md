---
title: 'Creating Calendar in JavaScript 🗓'
date: 2020-11-14
authors: anaclumos
slug: '/F522B3'
---

Let's create a calendar with JavaScript but without any external library. This project is based on my previous internship at [Woowa Bros, a unicorn food-delivery startup in Seoul](https://www.bloomberg.com/profile/company/0962533D:KS).

## Show me the code first.

[GitHub - anaclumos/calendar.js: Vanilla JS Calendar](https://github.com/anaclumos/calendar.js)

## Show me the demo first.

- [JavaScript Calendar](http://demo.cho.sh/calendar.js/)

## Goals

- **Use functional programming\*** instead of Object-oriented programming.
- **No DOM manipulation after initializing**. This philosophy is based on the React framework (or any other Single Page Application libraries.) DOM manipulation can be highly confusing if 30 different codes are trying to edit the same thing. So instead, we will rerender the components if we need to edit something.

💡

**Don't fix it. Buy a new one. **— Rerendering in Front-end

## Stack

- JavaScript `Date` Object
- CSS `display: grid` will be useful.

## Basic Idea

- There will be a global `displayDate` object that represents the displaying month.
- `navigator.js` will change this `displayDate` object, and trigger `renderCalendar()` function with `displayDate` as an argument.
- `renderCalendar()` will rerender with the calendar.

## Before anything, `prettier`!

Prettier helps write clean and neat codes with automatic formatting.

```json
// `.prettierrc`
{
  "semi": false,
  "singleQuote": true,
  "arrowParens": "always",
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 60,
  "trailingComma": "es5",
  "endOfLine": "lf",
  "bracketSpacing": true
}
```

## Now throw in some HTML.

```html
<!-- `index.html` -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JavaScript Calendar</title>
  </head>
  <body>
    <div id="navigator"></div>
    <div id="calendar"></div>
  </body>
  <script>
    // code for rendering
  </script>
</html>
```

I generated this boilerplate with VS Code.

## Then trick VS Code to read JS String as HTML Tags.

Since we use Vanilla JavaScript, we don't have access to fancy JSX-style highlighting. Instead, our generated HTML codes will live inside JavaScript String, which doesn't have syntax highlighting or Intellisense. Therefore, let's create a function that tricks VS Code to recognize JavaScript String as HTML Tags.

```js
// `util.js`
const html = (s, ...args) => s.map((ss, i) => `${ss}${args[i] || ''}`).join('')
```

to be added - screenshot of highlighting

## `calendar.js`

Then we connect `calendar.js` and `index.html`.

```html
<!-- `index.html` -->
<script src="calendar.js"></script>
```

Defining constants will help before writing `renderCalendar()`.

```js
// `calendar.js`
const NUMBER_OF_DAYS_IN_WEEK = 7
const NAME_OF_DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const LONG_NAME_OF_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const ACTUAL_TODAY = new Date()
```

Note that we use `NUMBER_OF_DAYS_IN_WEEK` to remove [magic numbers](<https://en.wikipedia.org/wiki/Magic_number_(programming)>) inside our code. It can be tough to decipher if we meet a random `7` during a code. Instead, using such constant increases the maintainability of the code.

```js
for (let d = 0; d < NUMBER_OF_DAYS_IN_WEEK; d++) {
  // do something
}
```

If there was a random `7`, who knows if we are iterating through [the number of Harry Potter Books](https://www.google.com/search?q=harry+potter+book+count)?

This code block will be the baseline for our calendar generation. We will pass in the HTML target and day object. `today` represents the month being displayed. The`today` object will come from `navigator,js`. Navigator will return the actual date for the current month and return on the first day of the month for other months.

```js
// `calendar.js`
const renderCalendar = ($target, today) => {
  let html = getCalendarHTML(today)
  // minify html
  html = html.replace(/\n/g, '')
  // replace multiple spaces with single space
  html = html.replace(/\s{2,}/g, ' ')
  $target.innerHTML = html
}
```

Now, we need four different Date objects for displaying the calendar. We could've used fewer objects, but it is up to the implementation. I think reducing date objects here would cause a minimal performance increase but spike the understandability of the code, so using four objects seems like a fair middle ground.

### Four Date objects we need

- **The last day of last month**: needed to highlight last month's weekend and display the correct date for last month's row.
- **The first day of this month**: needed to highlight this month's weekend and figure out how many days of last month we need to render.
- **The last day of this month**: needed for rendering this month with iteration.
- **The first day of next month**: needed to highlight the weekend of next month.

I made a function that would process these four dates when inputted a specific Date.

```js
// `calendar.js`
const processDate = (day) => {
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

I created a function that binds these 4 dates into an object and `return`s them. It receives a Date object as `argument`, and in this calendar, a Date object corresponding to "today" will be inserted.

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

### 2-2. Create getCalendarHTML

Now let's draw a calendar in earnest. I created a `getCalendarHTML` function that returns the contents of the calendar as HTML. The `getCalendarHTML` function is a bit bulky, so I framed it first.

```js
const getCalendarHTML = () => {
  let today = new Date()
  let { lastMonthLastDate, thisMonthFirstDate, thisMonthLastDate, nextMonthFirstDate } = processDate(today)
  let calendarContents = []

  // ...

  return calendarContents.join('')
}
```

Add a line at the top to display the day of the week. Use the `const` we added at the beginning to remove the magic number.

```js
for (let d = 0; d < NUMBER_OF_DAYS_IN_WEEK; d++) {
  calendarContents.push(html`<div class="${NAME_OF_DAYS[d]} calendar-cell">${NAME_OF_DAYS[d]}</div>`)
}
```

Then let's draw the last month. For example, if the first day of this month is Wednesday, the role of drawing the last month corresponding to Sunday, Monday, and Tuesday. For days corresponding to Sunday, `sun` HTML Class is added.

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

Let's draw this month on a similar principle. For today's day, `today` HTML Class and "today" String are added. Similarly, `sat` and `sun` HTML Class are added for Saturday and Sunday respectively.

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

Finally, draw the days of the next month in the remaining cells.

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

## 3. Writing CSS

### 3-1. Using display: grid

If you use `display: grid` on an element, you can neatly put its child elements into a grid (table).

- `grid-template-columns`: Information on how to arrange columns. `1fr` means `1 fraction`, and since it is written 7 times in total, 7 columns with the same width are created.
- `grid-template-rows`: You can define the size of rows. Here, there is only one `3rem`, so the **first** row is defined as 3rem.
- `grid-auto-rows`: You can define the size of the next row. Here, it says `6rem`, so all subsequent rows have a row size of 6rem.

Below we define additional styles.

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

- When drawing a table, you want to wrap all cells with a uniform border, just like Excel, but there are cases where only the outermost cells have thin lines. In terms of HTML, borders are applied only to `th` and `td`.
- I prefer to apply this "n px to all cell borders, n px to table borders" border. This will give you a uniform border of `2n px` overall.

```css
.calendar-cell {
  border: 1px solid black;
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

## I felt that

- At first, I got a little lost when connecting with JS to "initialize" the calendar. This is because you connected `renderCalendar` to the top of `body`. Since the DOM is executed sequentially, if you connect it to the top, if the `#App` div does not appear, `renderCalendar` will be executed and the DOM element will not be found.
- Also, I couldn't remember how to render codes that can be expressed in JS associations on the screen. It was simply to querySelect the app in js, which plays the role of index.js, and then insert it into innerHTML.
- In the Woowa Tech Camp project, magic numbers were used. This time, the magic number was removed to improve readability.
- The Woowa Techcamp project was written in Object Oriented JavaScript (more precisely, Singleton pattern), but this time it was written in small functions.
- Tried to use ES6+ syntax. For example, I used it by putting variables in backticks or destructuring the return data of processDate. Also let and const were mainly used.
- I regret that `getCalendarHTML` could not have been written a little shorter.
