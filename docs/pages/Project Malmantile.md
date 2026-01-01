---
lang: 'en'
slug: '/7309CF'
---

TL;DR:

> Can we VFL CIFAR?

Malmantile is a subproject of [Project Florence](./../.././docs/pages/Project%20Florence.md). Supercedes [Project Fiesole](./../.././docs/pages/Project%20Fiesole.md)

## Method

We cut the images into four pieces like [Project Fiesole](./../.././docs/pages/Project%20Fiesole.md).

## Control Group

Ran entire ten epochs with the original dataset with CIFAR CNN: 87.76 %

<figure>

![69EB87.png](./../.././docs/assets/69EB87.png)

</figure>

## Cutting the images

<figure>

![678078.png](./../.././docs/assets/678078.png)

</figure>

<figure>

![1A7FA1.png](./../.././docs/assets/1A7FA1.png)

</figure>

<figure>

![59886D.png](./../.././docs/assets/59886D.png)

</figure>

<figure>

![803F4A.png](./../.././docs/assets/803F4A.png)

</figure>

## Status

<figure>

![27804D.png](./../.././docs/assets/27804D.png)

</figure>

<figure>

![5E20D4.png](./../.././docs/assets/5E20D4.png)

</figure>

## Malmantile 4x4

<figure>

![A8DD8E.png](./../.././docs/assets/A8DD8E.png)

</figure>

<figure>

![4B7913.png](./../.././docs/assets/4B7913.png)

</figure>

## Malmantile 16x1

<figure>

![CABECF.png](./../.././docs/assets/CABECF.png)

</figure>

<figure>

![26FE23.png](./../.././docs/assets/26FE23.png)

</figure>

## Results

✅ SUCCESS

- Centralized: 87.7%
- FedAvg - full images: 85.02%
- FedAvg VFL 4 squares: ~75%
- FedAvg VFL 16 squares: ~46%
- FedAvg VFL 16 vertical stripes: ~30%

## Further Actions

Superceded by [Project Impruneta](./../.././docs/pages/Project%20Impruneta.md)
