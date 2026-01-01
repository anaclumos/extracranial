---
lang: 'en'
slug: '/A01101'
---

- [Graphics](./../.././docs/pages/Graphics.md). How to pass instructions from [CPU](./../.././docs/pages/CPU.md) to [GPU](./../.././docs/pages/GPU.md).
- In DirectX, it is ID3D11Buffer

```cpp
mVertexBuffer = mGraphics.CreateGraphicsBuffer(
    vert,
    sizeof(vert),
    D3D11_BIND_VERTEX_BUFFER,
    D3D11_CPU_ACCESS_WRITE,
    D3D11_USAGE_DYNAMIC
);
```
