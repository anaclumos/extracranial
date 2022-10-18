---
lang: 'en'
slug: '/D7EA90'
---

- [[SharedArrayBuffer]]를 이용해 [[Web Worker]] 사이 메모리를 동기화하기 위해 사용됨.
- Thread-safe.
- Thread 사이 데이터를 복사하지 않아도 됨.
- 이벤트 루프 없이 통신 가능. 빠름.
- 생성자 없음. Static.
- 여러 Thread 사이 연산 정합성 보장.
- `wait()`와 `notify`로 blocking construct 만들 수 있음.
- Linux를 본따 만듦.
- See:
  - [Javascript - What's the actual use of the Atomics object in ECMAScript? - Stack Overflow](https://stackoverflow.com/questions/45870869/whats-the-actual-use-of-the-atomics-object-in-ecmascript)
  - [Atomics - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics)
