import BrowserOnly from '@docusaurus/BrowserOnly'
import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import type { WrapperProps } from '@docusaurus/types'
import { ErrorBoundary } from '@site/src/components/error-boundary'
import GiscusComments from '@site/src/components/giscus'
import PostNotice from '@site/src/components/post-notice'
import type BlogPostItemType from '@theme/BlogPostItem'
import BlogPostItem from '@theme-original/BlogPostItem'

type Props = WrapperProps<typeof BlogPostItemType>

const LEADING_SLASH = /^\//

function extractDiscussionTerm(slug: unknown): string | undefined {
  if (!slug) {
    return undefined
  }
  return String(slug).replace(LEADING_SLASH, '')
}

export default function BlogPostItemWrapper(props: Props) {
  const { metadata, frontMatter } = useBlogPost()
  const discussionTerm = extractDiscussionTerm(frontMatter.slug)
  return (
    <>
      <PostNotice metadata={metadata} />
      <BlogPostItem {...props} />
      <BrowserOnly>
        {() => (
          <ErrorBoundary>
            <GiscusComments term={discussionTerm} />
          </ErrorBoundary>
        )}
      </BrowserOnly>
    </>
  )
}
