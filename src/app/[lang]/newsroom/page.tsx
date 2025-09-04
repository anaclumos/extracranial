import Link from 'next/link'
import { formatDate, t } from '@/lib/messages'
import { newsroomSource } from '@/lib/source'

type NewsroomMeta = {
  title: string
  description?: string
  date?: string | Date
  category?: string
}

export const metadata = {
  description: 'Updates, articles, and press from the team.',
  title: 'Newsroom',
}

export default async function NewsroomPage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params

  // Ensure robust reverse‑chronological sorting (newest first),
  // with safe fallbacks when dates are missing/invalid.
  const toTime = (d?: string | Date) => {
    if (!d) return 0
    if (d instanceof Date) return d.getTime()
    const parsed = Date.parse(d)
    if (!Number.isNaN(parsed)) return parsed
    // Fallback for common date formats like YYYY-MM-DD
    const m = d.match(/^(\d{4})[./-](\d{1,2})[./-](\d{1,2})/)
    if (m) {
      const [, y, mo, da] = m
      return Date.UTC(Number(y), Number(mo) - 1, Number(da))
    }
    return 0
  }

  const posts = [...newsroomSource.getPages(lang)].sort((a, b) => {
    const ta = toTime((a.data as NewsroomMeta).date)
    const tb = toTime((b.data as NewsroomMeta).date)
    if (tb !== ta) return tb - ta // descending (newest first)
    // Deterministic fallback when dates are equal/invalid
    return a.url.localeCompare(b.url)
  })

  return (
    <main className="mx-auto w-full max-w-fd-container sm:px-4 md:py-12">
      <div className="mx-auto max-w-prose">
        <header className="mb-8">
          <h1 className="mb-2 text-3xl font-semibold md:text-4xl">{t(lang, 'newsroom.title')}</h1>
          <p className="text-fd-muted-foreground">{t(lang, 'newsroom.tagline')}</p>
        </header>

        <section>
          <ul className="divide-y">
            {posts.map((post) => {
              const d = (post.data as NewsroomMeta).date
              const raw = d instanceof Date ? new Date(d).toISOString().slice(0, 10) : d
              const cat = (post.data as NewsroomMeta).category
              return (
                <li key={post.url} className="py-6">
                  <Link href={post.url} className="group block flex flex-col gap-2">
                    <div>
                      <h2 className="text-xl font-medium leading-snug group-hover:underline">{post.data.title}</h2>
                      {raw && (
                        <span className="shrink-0 text-xs text-fd-muted-foreground">{formatDate(lang, raw)}</span>
                      )}
                    </div>
                    {post.data.description && (
                      <p className="text-sm text-fd-muted-foreground">{post.data.description as string}</p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-fd-muted-foreground">
                      {raw && cat && <span>•</span>}
                      {cat && <span>{cat}</span>}
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </main>
  )
}
