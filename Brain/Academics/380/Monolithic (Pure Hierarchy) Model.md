---
title: 'Monolithic (Pure Hierarchy) Model'
slug: '/{{hex}}'
---

# Monolithic Model

```
PhysicsObject → StuffedAnimal
              → FloatingObject
              → DestructibleObject
```

## Problems

- Bubble Up Effect
	- What if we want to make `StuffedAnimal` floatable?
	- The **floating** behavior will be bubbled up.
- Solution [[Pure Component Model]]