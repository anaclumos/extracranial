import BrowserOnly from '@docusaurus/BrowserOnly'
import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import type { WrapperProps } from '@docusaurus/types'
import { ErrorBoundary } from '@site/src/components/error-boundary'
import GiscusComments from '@site/src/components/giscus'
import PostNotice from '@site/src/components/post-notice'
import type BlogPostItemType from '@theme/BlogPostItem'
import BlogPostItem from '@theme-original/BlogPostItem'

type Props = WrapperProps<typeof BlogPostItemType>

export default function BlogPostItemWrapper(props: Props) {
  const { metadata } = useBlogPost()
  return (
    <>
      <PostNotice metadata={metadata} />
      <BlogPostItem {...props} />
      <BrowserOnly>
        {() => (
          <ErrorBoundary>
            <GiscusComments />
          </ErrorBoundary>
        )}
      </BrowserOnly>
    </>
  )
}
