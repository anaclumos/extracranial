---
lang: 'en'
slug: /C26E1C
---

TL;DR:

> Can we VFL MNIST?

- [anaclumos/fiesole: Project Fiesole aims to demonstrate the feasibility of integrating CNN architectures within Vertical Federated Learning.](https://github.com/anaclumos/fiesole)

Project Fiesole aims to demonstrate the feasibility of integrating CNN architectures within Vertical Federated Learning to enhance data-driven models without compromising data privacy. In this context, data exists in islands, meaning various entities or organizations possess distinct features for the same sample population. Rather than consolidating these diverse datasets, Vertical Federated Learning allows for collaborative model training where each entity contributes its unique feature set. This approach not only upholds data privacy but also leverages the richness of diverse input parameters, offering a holistic perspective that a singular dataset might miss. Fiesole is a subproject of [[Project Florence]].

## Method

In VFL, each island has different "input parameters" for the same "subject". Thus, we split the original image (here, 9) into four distinct pieces in this demo. Each of them will necessarily work as a "distinct input."

![[63E892.png]]

I created four training sets, one for each quadrant, with masking.

## Control Group

Ran entire ten epochs with the original dataset

- MNIST CNN: 99.16 %

<details>

<summary>One by One</summary>

I ran ten epochs on one dataset and have yet to come back. Then I moved on to the next one.

- TL(10): 26.82 %
- TL(10), TR(10): 36.44 %
- TL(10), TR(10), BL(10): 30.66 %
- TL(10), TR(10), BL(10), BR(10): 47.24 %

</details>

<details>
<summary>Round-robin</summary>

I ran one epoch on TL and moved on to TR, BL, and BR. Then came back. Ran four cycles, thus 16 epochs.

- Cycle 1
  - TL(1): 59.37 %
  - TL(1), TR(1): 79.6 %
  - TL(1), TR(1), BL(1): 88.51 %
  - TL(1), TR(1), BL(1), BR(1): 79.88 %
- Cycle 2
  - TL(1): 85.68 %
  - TL(1), TR(1): 87.69 %
  - TL(1), TR(1), BL(1): 91.4 %
  - TL(1), TR(1), BL(1), BR(1): 88.52 %
- Cycle 3
  - TL(1): 82.21 %
  - TL(1), TR(1): 86.56 %
  - TL(1), TR(1), BL(1): 90.98 %
  - TL(1), TR(1), BL(1), BR(1): 89.07 %
- Cycle 4
  - TL(1): 85.24 %
  - TL(1), TR(1): 86.33 %
  - TL(1), TR(1), BL(1): 91.99 %
  - TL(1), TR(1), BL(1), BR(1): 90.12 %

</details>

<details>
<summary>
Round Robin, 10 cycles
</summary>
Still around 92%, max. Never goes above 95%.
</details>

## Federated Learning

import DisplayFlex from '@site/src/components/DisplayFlex'

<details>
<summary>
Results
</summary>

<DisplayFlex>

![[E0ED4F.png]]

![[DA87AB.png]]

</DisplayFlex>

<DisplayFlex>

![[2289D2.png]]

![[EC12E1.png]]

</DisplayFlex>

<DisplayFlex>

![[7147C6.png]]

![[AB6E91.png]]

</DisplayFlex>

<DisplayFlex>

![[C6F843.png]]

![[EEF724.png]]

</DisplayFlex>

<DisplayFlex>

![[E2D67A.png]]

![[DFF919.png]]

</DisplayFlex>

<DisplayFlex>

![[A1DAA5.png]]

![[BC3839.png]]

</DisplayFlex>

</details>

- The averaged model maxes its accuracy around 10-15 federations. Before each federation, each learner trains ten epochs from their corresponding dataset.
- It never reaches over 95% accuracy.
- This contrasts with the full CNN, where it quickly reaches 98% accuracy
- I think this comes from the lack of understanding "across quadrants."
- I didn't implement optimizing features (dropout, reducing LR, etc.)

## Adjustments

- Instead of just blacking out the three quadrants (i.e., only leaving one quadrant), I'll try to add some noise (i.e., a random number from 0-255) to the blacked-out three quadrants to see any differences. _I hypothesize that this can mimic or simulate knowledge across quadrants, slightly improving performance._
- 4 ![[3674F2.png]]
- 5 ![[E9C47C.png]]
- ![[D7DC98.png]]
- Update: Adding ambient noise decreases the accuracy a lot, both when I use the same ambient pattern (throughout the federations, uses the same ambient pattern over and over) or dynamically generate them (throughout the federations, create a new ambient pattern)

## Next Steps

- I'll start working on implementing CIFAR-10 with a similar architecture.
