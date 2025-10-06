import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { ReactNode } from 'react'
import { baseOptions } from '@/app/layout.config'
import { researchSource } from '@/lib/source'

export default async function Layout({ params, children }: { params: Promise<{ lang: string }>; children: ReactNode }) {
  const { lang } = await params

  // Hide global nav links within the Research docs layout
  const options = { ...baseOptions(lang), links: [] }

  return (
    <DocsLayout {...options} tree={researchSource.pageTree[lang]}>
      {children}
    </DocsLayout>
  )
}
