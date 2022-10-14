---
slug: '/AD18E8'
---

- Using Frames for updating game logic can break when different frame rates.
- Use Delta Time for updating game logic.

```cpp
position += velocity * deltaTime
```
