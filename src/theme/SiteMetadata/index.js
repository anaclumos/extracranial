import React from 'react'
import SiteMetadata from '@theme-original/SiteMetadata'

export default function SiteMetadataWrapper(props) {
  return (
    <>
      <meta name='naver-site-verification' content='15b31306fd3391cd0bf411b1d49160aa02dd3cad' />
      <script async defer src='https://scripts.simpleanalyticscdn.com/latest.js'></script>
      <noscript>
        <img
          src='https://queue.simpleanalyticscdn.com/noscript.gif'
          alt=''
          referrerpolicy='no-referrer-when-downgrade'
        />
      </noscript>
      <SiteMetadata {...props} />
    </>
  )
}
