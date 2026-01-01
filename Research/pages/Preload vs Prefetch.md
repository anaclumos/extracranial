---
lang: 'en'
slug: '/A5B9F3'
---
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

<Tabs groupId="lang">
<TabItem value="en" label="English" default>

1. Preload:
   - The `preload` directive is used to indicate that a resource should be loaded as early as possible in the page load process.
   - When you use `preload`, the browser prioritizes the loading of the specified resource, making it available sooner.
   - Preloading is particularly useful for critical resources that are needed immediately, such as CSS files or fonts.
   - By preloading CSS files, you ensure that the styles are available as soon as possible, preventing flash of unstyled content (FOUC) and improving the perceived performance.
   - Preloading fonts is beneficial because it allows the browser to start downloading the font files early, reducing the time until the text is rendered with the correct font.

2. Prefetch:
   - The `prefetch` directive is used to indicate that a resource might be needed in the future, but not immediately.
   - When you use `prefetch`, the browser fetches the specified resource in the background, during idle time, without blocking the page load.
   - Prefetching is useful for resources that are likely to be needed on subsequent pages or later in the user's journey.
   - Prefetching CSS files can be helpful if you have different styles for different pages, and you want to preload them in advance.
   - However, prefetching is not recommended for fonts because fonts are typically needed immediately on the current page, and prefetching them might delay their loading.

For fonts, it is generally recommended to use the `preload` directive instead of `prefetch`. Preloading fonts ensures that they are loaded as early as possible, reducing the time until the text is rendered with the correct font. This improves the user experience by avoiding the display of fallback fonts or invisible text while the actual font is being loaded.

```html
<link rel="preload" href="path/to/font.woff2" as="font" type="font/woff2" crossorigin />
```

By specifying `rel="preload"`, `as="font"`, and the appropriate `type` attribute, you instruct the browser to preload the font file with the correct context.

Remember to use the `crossorigin` attribute when preloading fonts from a different origin to ensure proper security measures are in place.

</TabItem>
<TabItem value="ko" label="한국어">

1. Preload:
   - `preload` 키워드는 페이지 로드 프로세스의 초기에 리소스를 가능한 한 빨리 로드해야 함을 나타내는 데 사용된다.
   - `preload`를 사용하면 브라우저는 지정된 리소스의 로딩을 우선시하여 더 빨리 사용할 수 있도록 한다.
   - Preloading은 특히 CSS 파일이나 폰트와 같이 즉시 필요한 중요한 리소스에 유용하다.
   - CSS 파일을 미리 로드하면 스타일이 가능한 한 빨리 사용 가능해져서 스타일이 적용되지 않은 콘텐츠의 깜빡임(FOUC)을 방지하고 보이는 성능을 향상시킬 수 있다.
   - 폰트를 미리 로드하는 것은 브라우저가 폰트 파일을 일찍 다운로드하기 시작하여 올바른 폰트로 텍스트가 렌더링될 때까지의 시간을 단축할 수 있기 때문에 유용하다.

2. Prefetch:
   - `prefetch` 키워드는 리소스가 미래에 필요할 수 있지만 즉시 필요하지는 않음을 나타내는 데 사용된다.
   - `prefetch`를 사용하면 브라우저는 페이지 로드를 차단하지 않고 유휴 시간 동안 백그라운드에서 지정된 리소스를 가져온다.
   - Prefetching은 후속 페이지나 사용자의 경로에서 나중에 필요할 가능성이 있는 리소스에 유용하다.
   - 서로 다른 페이지에 대해 다른 스타일이 있고 미리 로드하려는 경우 CSS 파일을 미리 가져오는 것이 도움될 수 있다.
   - 그러나 폰트는 일반적으로 현재 페이지에서 즉시 필요하며 폰트를 미리 가져오면 로딩이 지연될 수 있으므로 폰트에 대해서는 prefetching이 권장되지 않는다.

폰트의 경우 일반적으로 `prefetch` 키워드 대신 `preload` 키워드를 사용하는 것이 좋다. 폰트를 미리 로드하면 가능한 한 빨리 폰트가 로드되어 실제 폰트로 텍스트가 렌더링될 때까지의 시간이 단축된다. 이렇게 하면 폴백 폰트 또는 실제 폰트가 로드되는 동안 보이지 않는 텍스트 표시를 방지하여 사용자 경험이 향상된다.

```html
<link rel="preload" href="path/to/font.woff2" as="font" type="font/woff2" crossorigin />
```

`rel="preload"`, `as="font"` 및 적절한 `type` 속성을 지정하면 브라우저에 올바른 컨텍스트로 폰트 파일을 미리 로드하도록 지시한다.

다른 출처에서 폰트를 미리 로드할 때는 적절한 보안 조치가 마련되도록 `crossorigin` 속성을 사용해야 한다.

</TabItem>
</Tabs>
