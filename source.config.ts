import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config'
import { z } from 'zod'
import { remarkAdmonition } from 'fumadocs-core/mdx-plugins'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  dir: 'content/research',
  docs: {
    schema: frontmatterSchema,
  },
  meta: {
    schema: metaSchema,
  },
})

// Newsroom collection (blog-style posts)
export const newsroom = defineDocs({
  dir: 'content/newsroom',
  // Use Next.js bundler integration for MD/MDX so static imports work
  // (enables remark-image to import local assets like PNG/JPG)
  docs: {
    // Extend default frontmatter to include date/category/draft/slug
    schema: frontmatterSchema.extend({
      date: z.union([z.string(), z.date()]).optional(),
      category: z.string().optional(),
      draft: z.boolean().optional(),
      slug: z.string().optional(),
    }),
  },
  meta: {
    schema: metaSchema,
  },
})

import { remarkImage } from 'fumadocs-core/mdx-plugins'
import remarkFigureImport from '@/mdx/remark-figure-import'

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [
      remarkMath,
      [
        remarkImage,
        {
          useImport: true,
        },
      ],
      remarkFigureImport,
      remarkAdmonition,
    ],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
})
