import { createMDX } from 'fumadocs-mdx/next'
import { NextConfig } from 'next'
import { withNextVideo } from 'next-video/process'

const withMDX = createMDX()

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/:path*/_next-video/:rest*',
        destination: '/_next-video/:rest*',
      },
    ]
  },
}

export default withMDX(
  withNextVideo(
    {
      ...config,
    },
    {
      folder: 'content',
      provider: 'vercel-blob',
    }
  )
)
