import React from 'react'
import DocItem from '@theme-original/DocItem'
import Head from '@docusaurus/Head'

export default function DocItemWrapper(props) {
  const title = props.content.metadata.title
  const description = props.content.metadata.description
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta
          property='og:image'
          content={`https://og-image.cho.sh/**${encodeURIComponent(
            title
          )}**.png?theme=%235597ec&md=1&fontSize=100px&images=https%3A%2F%2Fcho.sh%2Fimg%2Ffavicon.png`}
        />
      </Head>
      <DocItem {...props} />
    </>
  )
}
