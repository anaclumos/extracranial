import type { WrapperProps } from '@docusaurus/types'
import type LayoutType from '@theme/Layout'
import Layout from '@theme-original/Layout'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

type Props = WrapperProps<typeof LayoutType>

export default function LayoutWrapper(props: Props) {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <Layout {...props} />
    </>
  )
}
