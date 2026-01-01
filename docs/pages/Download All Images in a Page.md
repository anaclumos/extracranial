---
lang: 'en'
slug: '/E1F0F5'
---

```js
// Find all elements with the class 'slide'
const slideElements = document.getElementsByClassName('slide')

// Iterate over each slide element and clear its style
for (let i = 0; i < slideElements.length; i++) {
  slideElements[i].removeAttribute('style')
}

function downloadImages() {
  const images = document.getElementsByTagName('img')
  let index = 0

  function downloadNextImage() {
    if (index >= images.length) {
      console.log('All images downloaded.')
      return
    }

    console.log(`Downloading image ${index + 1} of ${images.length}`)

    const link = document.createElement('a')
    link.href = images[index].src

    const fileExtension = images[index].src.split('.').pop()
    link.download = `image${index}.${fileExtension}`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    index++
    setTimeout(downloadNextImage, 500) // Delay of 500ms between each download
  }

  downloadNextImage()
}

downloadImages()
```
