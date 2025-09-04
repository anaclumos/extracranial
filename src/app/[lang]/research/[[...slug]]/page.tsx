import { createRelativeLink } from 'fumadocs-ui/mdx'
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import { researchSource } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'

export default async function Page(props: { params: Promise<{ slug?: string[]; lang: string }> }) {
  const params = await props.params
  const page = researchSource.getPage(params.slug, params.lang)
  if (!page) notFound()

  const MDXContent = page.data.body

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(researchSource, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  )
}

export const generateStaticParams = async () => {
  return researchSource.generateParams('slug', 'locale')
}

export const generateMetadata = async (props: { params: Promise<{ slug?: string[]; lang: string }> }) => {
  const params = await props.params
  const page = researchSource.getPage(params.slug, params.lang)
  if (!page) notFound()

  return {
    description: page.data.description,
    title: page.data.title,
  }
}
