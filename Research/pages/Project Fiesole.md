---
lang: 'en'
slug: '/C26E1C'
---

TL;DR:

> Can we VFL MNIST?

Project Fiesole aims to demonstrate the feasibility of integrating CNN architectures within Vertical Federated Learning to enhance data-driven models without compromising data privacy. In this context, data exists in islands, meaning various entities or organizations possess distinct features for the same sample population. Rather than consolidating these diverse datasets, Vertical Federated Learning allows for collaborative model training where each entity contributes its unique feature set. This approach not only upholds data privacy but also leverages the richness of diverse input parameters, offering a holistic perspective that a singular dataset might miss.

Subproject of [[Project Florence]].

## Control Group

- MNIST CNN: 99.16 %

## One by One

- TL(10): 26.82 %
- TL(10), TR(10): 36.44 %
- TL(10), TR(10), BL(10): 30.66 %
- TL(10), TR(10), BL(10), BR(10): 47.24 %

## One Epoch by One ("Seasonal")

### Season 1

- TL(1): 59.37 %
- TL(1), TR(1): 79.6 %
- TL(1), TR(1), BL(1): 88.51 %
- TL(1), TR(1), BL(1), BR(1): 79.88 %

### Season 2

- TL(1): 85.68 %
- TL(1), TR(1): 87.69 %
- TL(1), TR(1), BL(1): 91.4 %
- TL(1), TR(1), BL(1), BR(1): 88.52 %

### Season 3

- TL(1): 82.21 %
- TL(1), TR(1): 86.56 %
- TL(1), TR(1), BL(1): 90.98 %
- TL(1), TR(1), BL(1), BR(1): 89.07 %

### Season 4

- TL(1): 85.24 %
- TL(1), TR(1): 86.33 %
- TL(1), TR(1), BL(1): 91.99 %
- TL(1), TR(1), BL(1), BR(1): 90.12 %
