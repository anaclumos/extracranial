---
lang: 'en'
slug: '/FCE496'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId='lang' queryString>
<TabItem value='en' label='English 🇺🇸' lang='en-US' default>
<div lang='en-US'>

`stale-while-revalidate` is a cache-control directive that provides a mechanism to serve stale content from the cache while simultaneously updating the cache entry in the background. This can be useful for improving web applications' perceived performance and responsiveness by serving content immediately, even if it's stale, and then updating it asynchronously.

Here's a breakdown of how it works:

1. **Initial request** — When a user makes a request, if there's no cached content or if the cached content is fresh, the content is fetched from the server and delivered to the user.
2. **Stale content** — If the cached content is stale (i.e., it has exceeded its freshness lifetime) but the `stale-while-revalidate` period has not yet elapsed, the stale content is immediately returned to the user.
3. **Revalidation** — After serving the stale content in the background, the cache will request the origin server to fetch the fresh content. Once this new content is fetched, the cache is updated.
4. **Beyond the revalidation window** — If the cached content is stale and the `stale-while-revalidate` period has also passed, then the cache will typically wait for the fresh content before serving it to the user (this behavior might depend on other cache control directives and the cache's specific implementation).

This mechanism can be beneficial in scenarios where you prefer to have slightly outdated content displayed immediately rather than waiting for the most up-to-date content, especially when the freshness of the content isn't critical.

</div>
</TabItem>
<TabItem value='ko' label='한국어 🇰🇷' lang='ko-KR'>
<div lang='ko-KR'>

`stale-while-revalidate`는 오래된 캐시 콘텐츠를 제공하면서 백그라운드에서 캐시를 업데이트하는 캐시 제어 지시어다. 이 메커니즘은 웹 애플리케이션의 체감 성능과 응답성 향상에 도움을 준다.

작동 원리는 다음과 같다:

- 초기 요청: 사용자 요청 시 캐시에 콘텐츠가 없거나 최신일 경우 서버에서 콘텐츠를 가져와 사용자에게 제공한다.
- 오래된 콘텐츠: 캐시 콘텐츠가 오래되었지만 유효성 검사 기간 내라면 즉시 사용자에게 제공한다.
- 재검증: 오래된 콘텐츠 제공 후 캐시는 서버에 새 콘텐츠 요청을 하며, 새 콘텐츠를 받으면 캐시를 업데이트한다.
- 재검증 기간이 지나 캐시가 부실할 때, 캐시는 새 콘텐츠를 기다린 후 제공한다. 이는 캐시의 구현에 따라 다를 수 있다.

이 기법은 콘텐츠 최신성이 크게 중요하지 않은 시나리오에서 유용하다.

</div>
</TabItem>
</Tabs>
