---
lang: 'en'
slug: '/81D3BC'
---

> While recent work on text-conditional [[3D]] object generation has shown promising results, the state-of-the-art methods typically require multiple [[GPU]] hours to produce a single sample. This contrasts with state-of-the-art generative image models, which make samples in several seconds or minutes. In this paper, we explore an [[alternative]] method for [[3D]] object generation which makes [[3D]] models in only 1-2 minutes on a single [[GPU]]. Our process first generates a single synthetic view using a text-to-image diffusion model. Then it produces a [[3D]] point cloud using a second diffusion model, which conditions the generated image. While our method still needs to improve sample quality, it is one to two orders of magnitude faster to sample from, offering a practical trade-off for some use cases. We release our pre-trained point cloud diffusion models and evaluation code and models at [this HTTPS URL](https://github.com/openai/point-e). [[2212.08751] Point-E: A System for Generating 3D Point Clouds from Complex Prompts](https://arxiv.org/abs/2212.08751)

- [[Generative AI]]
- [[3D]]
- [DreamFusion: Text-to-3D using 2D Diffusion](https://dreamfusion3d.github.io/)
- [[Prompt Engineering]]
