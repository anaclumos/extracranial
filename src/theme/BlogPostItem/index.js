import React from 'react'
import Giscus from '../../components/Giscus'
import PostNotice from '../../components/PostNotice'
import Head from '@docusaurus/Head'
import clsx from 'clsx'
import Translate, { translate } from '@docusaurus/Translate'
import Link from '@docusaurus/Link'
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl'
import { blogPostContainerID } from '@docusaurus/utils-common'
import MDXContent from '@theme/MDXContent'
import EditThisPage from '@theme/EditThisPage'
import TagsListInline from '@theme/TagsListInline'
import BlogPostAuthors from '@theme/BlogPostAuthors'
import styles from './styles.module.css'

export default function BlogPostItem(props) {
  const { withBaseUrl } = useBaseUrlUtils()
  const { children, frontMatter, assets, metadata, truncated, isBlogPostPage = false } = props
  const { date, formattedDate, permalink, tags, readingTime, title, editUrl, authors } = metadata
  const image = assets.image ?? frontMatter.image
  const truncatedPost = !isBlogPostPage && truncated
  const tagsExists = tags.length > 0
  const TitleHeading = isBlogPostPage ? 'h1' : 'h2'

  return (
    <>
      <Head>
        <title>{props.frontMatter.title}</title>
        <meta name='description' content={props.frontMatter.description} />
        <meta property='og:title' content={props.frontMatter.title} />
        <meta property='og:description' content={props.frontMatter.description} />
        <meta
          property='og:image'
          content={
            props.frontMatter.image ??
            `https://og-image.cho.sh/**${encodeURIComponent(
              props.frontMatter.title
            )}**.png?theme=%235597ec&md=1&fontSize=100px&images=https%3A%2F%2Fcho.sh%2Fimg%2Ffavicon.png`
          }
        />
      </Head>
      <PostNotice {...props} />
      <article
        className={!isBlogPostPage ? 'margin-bottom--xl' : undefined}
        itemProp='blogPost'
        itemScope
        itemType='http://schema.org/BlogPosting'
      >
        <header>
          <TitleHeading className={styles.blogPostTitle} itemProp='headline'>
            {isBlogPostPage ? (
              title
            ) : (
              <Link itemProp='url' to={permalink}>
                {title}
              </Link>
            )}
          </TitleHeading>
          <div className={clsx(styles.blogPostData, 'margin-vert--md')}>
            <time dateTime={date} itemProp='datePublished'>
              {formattedDate}
            </time>
          </div>
          <BlogPostAuthors authors={authors} assets={assets} />
        </header>

        {image && <meta itemProp='image' content={withBaseUrl(image, { absolute: true })} />}

        <div
          // This ID is used for the feed generation to locate the main content
          id={isBlogPostPage ? blogPostContainerID : undefined}
          className='markdown'
          itemProp='articleBody'
        >
          <MDXContent>{children}</MDXContent>
        </div>

        {(tagsExists || truncated || editUrl) && (
          <footer className={clsx('row docusaurus-mt-lg', isBlogPostPage && styles.blogPostDetailsFull)}>
            {tagsExists && (
              <div className={clsx('col', { 'col--9': truncatedPost })}>
                <TagsListInline tags={tags} />
              </div>
            )}
            {isBlogPostPage && editUrl && (
              <div className='col margin-top--sm'>
                <EditThisPage editUrl={editUrl} />
              </div>
            )}

            {truncatedPost && (
              <div
                className={clsx('col text--right', {
                  'col--3': tagsExists,
                })}
              >
                <Link
                  to={metadata.permalink}
                  aria-label={translate(
                    {
                      message: 'Read more about {title}',
                      id: 'theme.blog.post.readMoreLabel',
                      description: 'The ARIA label for the link to full blog posts from excerpts',
                    },
                    { title }
                  )}
                >
                  <b>
                    <Translate
                      id='theme.blog.post.readMore'
                      description='The label used in blog post item excerpts to link to full blog posts'
                    >
                      Read More
                    </Translate>
                  </b>
                </Link>
              </div>
            )}
          </footer>
        )}
      </article>
      <Giscus />
    </>
  )
}
