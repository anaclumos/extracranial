---
lang: 'en'
slug: '/DF5A6E'
---

Backlinks were not working for Korean Pages.

Found that:

```
>>> for char in "바이올린 켜면 바이올레이션":
...     print(ord(char))
...
48148
51060
50732
47536
32
53020
47732
32
48148
51060
50732
47112
51060
49496
>>> for char in "바이올린 켜면 바이올레이션":
...     print(ord(char))
...
4359
4449
4363
4469
4363
4457
4527
4357
4469
4523
32
4367
4455
4358
4455
4523
32
4359
4449
4363
4469
4363
4457
4527
4357
4454
4363
4469
4361
4455
4523
```

The backlink table was 완성형, but the text was 조합형.

So I added:

```js
const documentTitleEncoded = documentTitle.normalize('NFC')
```

Fixed the problem.
