---
lang: 'en'
slug: '/37C60E'
---

[Lesser Known Trick](./../.././docs/pages/Lesser%20Known%20Trick.md).

Use [Apple](./../.././docs/pages/Apple.md) [GPU](./../.././docs/pages/GPU.md) Acceleration ([Metal](./../.././docs/pages/Metal.md) Performance [Shader](./../.././docs/pages/Shader.md)) on [PyTorch](./../.././docs/pages/PyTorch.md)

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
