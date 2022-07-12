import React from 'react'
import SiteMetadata from '@theme-original/SiteMetadata'
import type SiteMetadataType from '@theme/SiteMetadata'
import type { WrapperProps } from '@docusaurus/types'

type Props = WrapperProps<typeof SiteMetadataType>

export default function SiteMetadataWrapper(
  props: Props
): JSX.Element {
  return (
    <>
      <meta
        name="naver-site-verification"
        content="15b31306fd3391cd0bf411b1d49160aa02dd3cad"
      />
      <script
        async
        defer
        src="https://scripts.simpleanalyticscdn.com/latest.js"
      ></script>
      <noscript>
        <img
          src="https://queue.simpleanalyticscdn.com/noscript.gif"
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
      <SiteMetadata {...props} />
    </>
  )
}
