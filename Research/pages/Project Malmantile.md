---
lang: 'en'
slug: '/7309CF'
---

TL;DR:

> Can we VFL CIFAR?

Malmantile is a subproject of [[Project Florence]]. Supercedes [[Project Fiesole]]

## Method

We cut the images into four pieces like [[Project Fiesole]].

## Control Group

Ran entire ten epochs with the original dataset with CIFAR CNN: 87.76 %

![[69EB87.png]]

## Cutting the images

![[678078.png]]
![[1A7FA1.png]]
![[59886D.png]]
![[803F4A.png]]

## Status

![[27804D.png]]

![[5E20D4.png]]

## Malmantile 4x4

![[A8DD8E.png]]
![[4B7913.png]]

## Malmantile 16x1

![[CABECF.png]]
![[26FE23.png]]

## Results

✅ SUCCESS

- Centralized: 87.7%
- FedAvg - full images: 85.02%
- FedAvg VFL 4 squares: ~75%
- FedAvg VFL 16 squares: ~46%
- FedAvg VFL 16 vertical stripes: ~30%

## Further Actions

Superceded by [[Project Impruneta]]
