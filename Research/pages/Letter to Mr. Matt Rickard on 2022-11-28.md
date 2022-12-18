---
lang: 'en'
slug: '/BD4464'
---

Dear Mr. [[Rickard]],

It's Sunghyun. I hope you had a great Thanksgiving break — I've been great! I hope to work on some projects on curating human knowledge and sentience, which I've been delving into these days.

I recently had an idea for a hypothetical product, "Let's Alter." I have a vision but need clarification on where to start.

Let's Alter is a non-profit product that uses Generative AIs to describe any image on the web. For example, given an idea of dogs playing frisbee, AI will put the following as such.

> ALT: Three white dogs are playing frisbee on a lawn with a woman wearing a red skirt

Facebook and Instagram have been doing this for a while, but AFAIK there are no open-source products. As Generative AIs evolved, I expected it to be possible to reverse Gen AIs to take images and spit out different variations of descriptive texts.

The final goal is to create a product like Let's Encrypt, which heavily contributed to removing unencrypted websites on the web. I imagine a future where no single image on the web is missing the `alt` tag with this technology.

What would be a logical first step to diving into this goal? Any ideas or meta-ideas that come to your mind?

Any help would be heavily appreciated.

Best Regards,
Sunghyun Cho

## Response on [[2022-11-29]]

### Resources

- [openai/CLIP: Contrastive Language-Image Pretraining](https://github.com/openai/CLIP)
- [CLIP: Connecting Text and Images](https://openai.com/blog/clip/)
- Vision Transforms (ViT)
- [CLIP Interrogator - a Hugging Face Space by pharma](https://huggingface.co/spaces/pharma/CLIP-Interrogator)

### Implementation Suggestion

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

- [[Perceptual Hashing]]