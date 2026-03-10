import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  staticPageGenerationTimeout: 240,
  cacheComponents: true,
  cacheLife: {
    blog: {
      stale: 300,
      revalidate: 86400,
      expire: 604800,
    },
  },
  transpilePackages: [
    "motion",
    "motion-plus",
    "@hugeicons/react",
    "@hugeicons/core-free-icons",
  ],
  images: {
    qualities: [100, 75],
  },
  skipTrailingSlashRedirect: true,
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
