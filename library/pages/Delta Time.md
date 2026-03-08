---
lang: 'en'
slug: '/AD18E8'
last_modified: 2022-10-13
---

- Using Frames for updating game logic can break when different frame rates.
- Use Delta Time for updating game logic.

```cpp
position += velocity * deltaTime
```
