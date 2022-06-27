import React from 'react'
import BlogPostItem from '@theme-original/BlogPostItem'
import Giscus from '../../components/Giscus'
import PostNotice from '../../components/PostNotice'
import Head from '@docusaurus/Head'

const getUrlPercentEncoding = (text) => {
  return encodeURIComponent(text)
}

export default function BlogPostItemWrapper(props) {
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
            `https://og-image.cho.sh/**${getUrlPercentEncoding(
              props.frontMatter.title
            )}**.png?theme=%235597ec&md=1&fontSize=100px&images=https%3A%2F%2Fcho.sh%2Fimg%2Ffavicon.png`
          }
        />
      </Head>
      <PostNotice {...props} />
      <BlogPostItem {...props} />
      <Giscus />
    </>
  )
}
