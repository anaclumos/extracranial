import { formatDate, t } from '@/lib/messages'
import { newsroomSource } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'
import type { TOCItemType } from 'fumadocs-core/server'
import { Calendar, ChevronLeft, Tag } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ComponentType } from 'react'

type Loaded = {
  body: ComponentType<Record<string, unknown>>
  toc?: TOCItemType[]
}

type NewsroomData = {
  title: string
  description?: string
  date?: string | Date
  category?: string
  load: () => Promise<Loaded>
}

export default async function NewsroomPost(props: { params: Promise<{ slug: string; lang: string }> }) {
  const params = await props.params
  const page = newsroomSource.getPage([params.slug], params.lang)
  if (!page) notFound()

  const data = page.data as unknown as Partial<NewsroomData> & {
    body?: ComponentType<Record<string, unknown>>
    toc?: TOCItemType[]
    title: string
    description?: string
  }

  // Support both async and sync MDX runtimes
  let Mdx: ComponentType<Record<string, unknown>>
  let toc: TOCItemType[] | undefined
  if (typeof data.load === 'function') {
    const loaded = await data.load()
    Mdx = loaded.body
    toc = loaded.toc
  } else if (data.body) {
    Mdx = data.body
    toc = data.toc
  } else {
    throw new Error('Failed to load MDX content')
  }

  const dateRaw = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date

  return (
    <main className="mx-auto w-full max-w-fd-container px-4 py-12 md:px-8">
      <div className="mx-auto max-w-prose">
        <div className="mb-6">
          <Link
            href={`/${params.lang}/newsroom`}
            className="inline-flex items-center gap-2 text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
          >
            <ChevronLeft className="size-4" /> {t(params.lang, 'post.back')}
          </Link>
        </div>

        <h1 className="mb-2 text-3xl font-bold md:text-4xl">{page.data.title}</h1>
        {page.data.description && <p className="mb-3 text-fd-muted-foreground">{page.data.description}</p>}

        <div className="mb-8 flex flex-wrap items-center gap-3 text-xs text-fd-muted-foreground">
          {dateRaw && (
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3.5" /> {formatDate(params.lang, dateRaw)}
            </span>
          )}
          {data.category && (
            <span className="inline-flex items-center gap-1">
              <Tag className="size-3.5" /> {data.category}
            </span>
          )}
        </div>
        <article className="prose max-w-prose">
          <Mdx components={getMDXComponents()} />
        </article>
      </div>
    </main>
  )
}

export const generateStaticParams = () => {
  return newsroomSource.getPages().map((p) => ({ slug: p.slugs[0] }))
}
