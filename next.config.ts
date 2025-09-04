import { createMDX } from 'fumadocs-mdx/next'
import { NextConfig } from 'next'
import { withNextVideo } from 'next-video/process'

const withMDX = createMDX()

const config: NextConfig = {
  reactStrictMode: true,
}

export default withMDX(
  withNextVideo(
    {
      ...config,
    },
    { folder: 'content' }
  )
)
