---
lang: 'en'
slug: '/786F87'
---

- [[Letter to Mr. Matt Rickard on 2022-11-28]]

### Resources

- [openai/CLIP: Contrastive Language-Image Pretraining](https://github.com/openai/CLIP)
- [CLIP: Connecting Text and Images](https://openai.com/blog/clip/)
- Vision Transforms (ViT)
- [CLIP Interrogator - a Hugging Face Space by pharma](https://huggingface.co/spaces/pharma/CLIP-Interrogator)

### Implementation Suggestion from Mr. [[Matt Rickard]]

- CLIP inference server + Library that wraps an image component (raw `img` or `next/image`)

```js
function AltTextImage() {
...hash image on the client
...check if a hash exists on AltTextDB
...if it does, set alt text
...if it doesn't, upload the image and the alt text will be returned (hash + maybe image is stored in DB)
}
```

### Transparency Logs

- Possible incorporation of a transparency log like Let's Encrypt.
- Maybe a log of image hash → `alt` that anyone can contribute?
- Maybe Common Crawl is a better model?

### Perceptual Hashing

- [Perceptual Hashing](https://matt-rickard.com/perceptual-hashing): Intentionally maximizes the change of hash collision, to detect similar images. Used by [[Google]]'s Search by Image feature or [[Apple]]'s CSAM.
