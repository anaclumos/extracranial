import type { Plugin } from '@docusaurus/types'

export default function tailwindPlugin(): Plugin {
  return {
    name: 'tailwind-plugin',
    configurePostCss(postcssOptions) {
      postcssOptions.plugins = [require('@tailwindcss/postcss')]
      return postcssOptions
    },
  }
}
