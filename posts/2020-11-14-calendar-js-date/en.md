---
title: 'Creating Calendar with JavaScript Date Object'
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
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
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
const html = (s, ...args) =>
  s.map((ss, i) => `${ss}${args[i] || ''}`).join('')
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
const NAME_OF_DAYS = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
]
const LONG_NAME_OF_DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
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

import WIP from '@site/src/components/WIP'

<WIP />
