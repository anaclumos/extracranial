import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./docs/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./blog/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./posts/**/*.{js,jsx,ts,tsx,md,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
