import React from 'react'
import Layout from '@theme-original/Layout'
import type LayoutType from '@theme/Layout'
import type { WrapperProps } from '@docusaurus/types'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'

type Props = WrapperProps<typeof LayoutType>

export default function LayoutWrapper(props: Props): JSX.Element {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <Layout {...props} />
    </>
  )
}
