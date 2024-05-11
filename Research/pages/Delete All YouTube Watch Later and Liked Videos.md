---
lang: 'en'
slug: '/2D37B7'
---

![[7EA246.gif]]

Go to the page and run this in the console.

Sometimes after completion, if you refresh the page, there still might be some videos. This is a YouTube bug. Run it multiple times until you're satisfied.

```js
;(async () => {
  // Function to wait for an element to be present in the DOM
  const waitForElement = (selector, timeout = 10000) => {
    return new Promise((resolve, reject) => {
      const element = document.querySelector(selector)
      if (element) {
        resolve(element)
      } else {
        const observer = new MutationObserver((mutations) => {
          const element = document.querySelector(selector)
          if (element) {
            resolve(element)
            observer.disconnect()
          }
        })
        observer.observe(document.body, {
          childList: true,
          subtree: true,
        })
        setTimeout(() => {
          reject(new Error(`Element ${selector} not found`))
        }, timeout)
      }
    })
  }

  // Function to scroll to the bottom of the page until the number of list items doesn't change
  const scrollToBottom = async () => {
    let previousCount = 0
    let currentCount = 0

    while (true) {
      previousCount = currentCount
      currentCount = document.querySelectorAll('ytd-playlist-video-renderer').length

      window.scrollTo(0, document.documentElement.scrollHeight)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (currentCount === previousCount) {
        break
      }
    }
  }

  // Function to scroll to the very top of the page
  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  // Function to remove videos from the playlist
  const removeVideos = async () => {
    // Wait for the playlist items to load
    await waitForElement('ytd-playlist-video-renderer')

    // Find all ytd-playlist-video-renderer tags
    const playlistItems = document.querySelectorAll('ytd-playlist-video-renderer')

    // Iterate over each playlist item
    for (const item of playlistItems) {
      // Click the yt-icon-button within the playlist item
      item.querySelector('yt-icon-button').click()

      // Wait for the dropdown menu to appear
      await waitForElement('tp-yt-paper-listbox')

      // Find the "Remove" option and click it
      const removeOption = Array.from(document.querySelectorAll('tp-yt-paper-listbox yt-formatted-string')).find(
        (option) => option.textContent.includes('Remove')
      )
      removeOption.click()

      // Wait before proceeding to the next playlist item
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }

  // Main function to handle scrolling and video removal
  const main = async () => {
    await scrollToBottom()
    scrollToTop()
    await removeVideos()
    alert('All videos have been removed from the playlist.')
  }

  await main()
})()
```
