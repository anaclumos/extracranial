import { promises as fs } from 'node:fs'
import path from 'node:path'
import { researchSource } from '@/lib/source'
import { GraphViewClient, type Link, type Node } from './graph-view.client'

export type Graph = {
  links: Link[]
  nodes: Node[]
}

function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|tel:|data:|javascript:)/i.test(href)
}

function stripHashAndQuery(href: string): string {
  const [noHash] = href.split('#', 2)
  const [noQuery] = noHash.split('?', 2)
  return noQuery
}

function toSlugFromHref(href: string): string | null {
  const raw = stripHashAndQuery(href.trim())
  if (!raw || isExternalHref(raw)) return null

  // absolute like: /research/foo or /en/research/foo
  if (raw.startsWith('/')) {
    const segs = raw.replace(/^\/+/, '').split('/')
    // drop leading locale if present
    if (segs[0] === 'en' || segs[0] === 'ko') segs.shift()
    if (segs[0] === 'research') segs.shift()
    return segs[0] || null
  }

  // relative like ./foo or ../foo
  if (raw.startsWith('./') || raw.startsWith('../')) {
    const parts = raw.split('/')
    while (parts.length && (parts[0] === '.' || parts[0] === '..')) parts.shift()
    return parts[0] || null
  }

  // bare slug (unlikely in our mdx but safe)
  return raw || null
}

async function readFileSafe(filePath: string): Promise<string | null> {
  try {
    return await fs.readFile(filePath, 'utf8')
  } catch {
    return null
  }
}

function extractHrefs(markdown: string): string[] {
  // Match markdown links that are not images: [text](href)
  // Capture groups: 1 = maybe leading non-!, 2 = text, 3 = href
  const LINK_INLINE_RE = /(^|[^!])\[([^\]]*?)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g
  const out: string[] = []
  let m: RegExpExecArray | null
  while ((m = LINK_INLINE_RE.exec(markdown)) !== null) {
    const href = m[3]
    if (href) out.push(href)
  }
  return out
}

async function buildGraph(lang: string): Promise<Graph> {
  const pages = researchSource.getPages(lang)
  const graph: Graph = { links: [], nodes: [] }

  const bySlug = new Map<string, (typeof pages)[number]>()
  for (const page of pages) {
    const slug = page.slugs[page.slugs.length - 1]
    bySlug.set(slug, page)
  }

  for (const page of pages) {
    graph.nodes.push({
      id: page.url,
      text: page.data.title ?? page.slugs[page.slugs.length - 1],
      description: 'description' in page.data ? page.data.description : undefined,
    })
  }

  // Build links by scanning MDX source for internal links
  const seen = new Set<string>()
  for (const page of pages) {
    // Prefer absolute path if available; otherwise, try resolving from virtual `path`
    const abs =
      page.absolutePath && path.isAbsolute(page.absolutePath) ? page.absolutePath : path.join(process.cwd(), page.path)
    const raw = await readFileSafe(abs)
    if (!raw) continue

    const hrefs = extractHrefs(raw)
    for (const href of hrefs) {
      const slug = toSlugFromHref(href)
      if (!slug) continue
      const target = bySlug.get(slug)
      if (!target) continue
      const key = `${page.url}->${target.url}`
      if (seen.has(key)) continue
      seen.add(key)
      graph.links.push({ source: page.url, target: target.url })
    }
  }

  return graph
}

export default async function Page(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params
  const graph = await buildGraph(lang)
  return <GraphViewClient {...graph} />
}
