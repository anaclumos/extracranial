---
lang: 'ko'
slug: '/70114A'
aliases: ['COOP']
---

- See [Cross-Origin-Opener-Policy - HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy).

## Translation • 번역

[[HTTP]] `Cross-Origin-Opener-Policy` 응답 헤더는 최상위 문서가 Cross-Origin 문서와 Browsing Context를 공유하지 않도록 보장합니다.
COOP는 (설령 문서가 팝업으로 열리더라도) 문서를 계산적으로 격리하여, 문서의 전역 객체(Global Object)가 다른 공격자에게 노출되지 않도록 보호합니다.
이 공격은 [XS-Leaks](https://github.com/xsleaks/xsleaks)라고도 알려져 있습니다.

만일 COOP를 가진 Cross Origin 문서 (보호하고자 하는 문서, 가칭 A 문서)가 B 창(공격자 문서)에 의해 새 창에서 열려도, B 창은 A 창에 접근 혹은 레퍼런스를 가지지 못하고, `window.opener` 값 또한 `null`이 됩니다.
이는 단순하게 외부 네비게이션을 제어하는 `rel=noopener`보다 더 많은 통제권을 줍니다.
