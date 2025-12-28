---
lang: 'en'
slug: '/1DA0F7'
---

```
Federation 1, Epoch 1
torch.Size([128, 3072])
tensor([ 0.0134, -0.0129, -0.0139,  ..., -0.0115, -0.0179, -0.0077],
       grad_fn=<SelectBackward0>)
torch.Size([128, 3072])
tensor([ 0.0136, -0.0128, -0.0141,  ..., -0.0117, -0.0180, -0.0077],
       grad_fn=<SelectBackward0>)
torch.Size([128, 3072])
tensor([ 0.0139, -0.0135, -0.0144,  ..., -0.0114, -0.0183, -0.0081],
       grad_fn=<SelectBackward0>)
torch.Size([128, 3072])
tensor([ 0.0135, -0.0128, -0.0143,  ..., -0.0120, -0.0188, -0.0079],
       grad_fn=<SelectBackward0>)
torch.Size([128, 3072])
tensor([ 0.0136, -0.0130, -0.0142,  ..., -0.0117, -0.0182, -0.0079],
       grad_fn=<SelectBackward0>)
```

Is it possible to have the first element updated to something 0.0136 when there are transparent pixels? - Yes. At first it randomly initializes the pixels.

→ Seems like it's the filter being not uniform throughout the dataset. Pegged it to be equal.
