---
lang: 'en'
slug: '/A01101'
---

- [[Graphics]]. How to pass instructions from [[CPU]] to [[GPU]].
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
