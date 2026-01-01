---
lang: 'en'
slug: '/BB5C13'
---

Positional encoding augments token embeddings with information about their order so a model that uses only attention can distinguish sequence positions.

For position $p \in \{0,\dots,L-1\}$ and even dimension index $2i$:

$$
\text{PE}(p,2i) = \sin\left(\frac{p}{10000^{2i/d_\text{model}}}\right),
$$

$$
\text{PE}(p,2i+1) = \cos\left(\frac{p}{10000^{2i/d_\text{model}}}\right).
$$

## Properties

- Adds deterministic, continuous vectors; no learned parameters.
- Sinusoids at different frequencies make any distance between two positions representable as a linear function of their encodings.

## Alternatives

- **Learned absolute encodings** a trainable lookup table of size L × d.
- **Relative encodings** (e.g., Shaw et al., 2018, T5, Transformer-XL): inject pairwise distance directly into attention logits; generalizes to longer sequences.
- **Rotary positional embedding (RoPE)** rotates query/key vectors in complex space by an angle proportional to position; preserves distance under dot product.
- **ALiBi, xPos, μPPE, etc.** linear bias, axis-scaled sinusoids, or mixture-of-experts to extend context or stabilize extrapolation.

Use: add (or concatenate) the positional vector to each token's embedding before the first transformer layer, or incorporate it inside the attention score computation for relative variants.
