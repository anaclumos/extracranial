---
lang: 'ko'
slug: '/D14970'
---

[onemillioncheckboxes.com](https://onemillioncheckboxes.com/)

실시간으로 너무 많이 누르면 경고 띄우고

![[138857.png]]

전체 데이터는 소켓으로 받아오고요. 데이터 관리는 Uint8Array에서 하나로 하는 듯..?!

![[EB2D7A.png]]

```
import { FixedSizeGrid as Grid } from "react-window";
```

FixedSizeGrid로 눈에 보이는 곳들만 Lazy하게 렌더합니다

데이터 자체는 BitSet라는 것으로 추상화된 Uint8Array에서, Bit Operation (>>, <<) 같은 것들로 진행.

이렇게 하면 1비트씩 썼을 때 100만개 해도 125 KB만 사용.
