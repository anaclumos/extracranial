---
slug: /9D9DB9
last_modified: 2026-01-01T00:00:00.000Z
---

[[Lesser Known Trick]]

```js
// Set the desired scroll speed
const scrollSpeed = 0.2

// Set the delay before starting the scroll (in milliseconds)
const startDelay = 5000

// Calculate the total distance to scroll
const totalScrollDistance = document.documentElement.scrollHeight - window.innerHeight

// Calculate the scroll duration based on the scroll speed and total distance
const scrollDuration = totalScrollDistance / scrollSpeed

// Get the start time
let startTime = null

// Function to handle the scrolling animation
function scrollAnimation(currentTime) {
  if (startTime === null) {
    startTime = currentTime
  }

  const elapsedTime = currentTime - startTime
  const scrollPosition = (elapsedTime / scrollDuration) * totalScrollDistance

  window.scrollTo(0, scrollPosition)

  if (elapsedTime < scrollDuration) {
    window.requestAnimationFrame(scrollAnimation)
  }
}

// Function to start the scrolling animation after the specified delay
function startScrolling() {
  setTimeout(() => {
    window.requestAnimationFrame(scrollAnimation)
  }, startDelay)
}

// Call the startScrolling function to begin the scrolling animation after the delay
startScrolling()
```
