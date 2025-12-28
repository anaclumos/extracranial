---
lang: 'en'
slug: '/9189C7'
---

```js
function download(url) {
  return new Promise((res, rej) => {
    fetch(url)
      .then((res) => res.blob())
      .then((file) => {
        const tempUrl = URL.createObjectURL(file)
        const aTag = document.createElement('a')
        aTag.href = tempUrl
        aTag.download = url.replace(/^.*[\\\/]/, '')
        document.body.appendChild(aTag)
        aTag.click()
        URL.revokeObjectURL(tempUrl)
        aTag.remove()
        res()
      })
      .catch((err) => {
        rej(err)
      })
  })
}

// Get all the video elements on the page.
const videos = document.querySelectorAll('video')

// Iterate over the video elements and download each video.
videos.forEach((video) => {
  // Get the video URL.
  const videoUrl = video.src
  download(videoUrl)
})
```
