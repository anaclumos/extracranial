---
lang: 'en'
slug: "/37C60E"
---

[[Lesser Known Trick]].

Use [[Apple]] [[GPU]] Acceleration ([[Metal]] Performance [[Shader]]) on [[PyTorch]]

```py
if torch.cuda.is_available():
    print(f"Using NVIDIA GPU")
    self.device = torch.device("cuda")
elif torch.backends.mps.is_available():
    print(f"Using Metal Acceleration (MPS) on Apple GPU")
    self.device = torch.device("mps")
else:
    print("Using CPU")
    self.device = torch.device("cpu")
```