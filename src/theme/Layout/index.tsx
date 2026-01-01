import type { WrapperProps } from '@docusaurus/types'
import Layout from '@theme-original/Layout'
import type LayoutType from '@theme/Layout'
import React from 'react'
import type { JSX } from 'react'

type Props = WrapperProps<typeof LayoutType>

export default function LayoutWrapper(props: Props) {
  return (
    <>
      <Layout {...props} />
    </>
  )
}
