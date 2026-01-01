import BlogPostItem from '@theme-original/BlogPostItem'
import type BlogPostItemType from '@theme/BlogPostItem'
import type { WrapperProps } from '@docusaurus/types'
import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import BrowserOnly from '@docusaurus/BrowserOnly'
import GiscusComments from '@site/src/components/giscus'
import PostNotice from '@site/src/components/post-notice'

type Props = WrapperProps<typeof BlogPostItemType>

export default function BlogPostItemWrapper(props: Props) {
  const { metadata } = useBlogPost()
  return (
    <>
      <PostNotice metadata={metadata} />
      <BlogPostItem {...props} />
      <BrowserOnly>{() => <GiscusComments />}</BrowserOnly>
    </>
  )
}
