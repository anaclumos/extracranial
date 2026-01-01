import Link from '@docusaurus/Link'
import { translate } from '@docusaurus/Translate'
import { PageMetadata } from '@docusaurus/theme-common'
import type { ArchiveBlogPost, Props } from '@theme/BlogArchivePage'
import Layout from '@theme/Layout'
import styles from './styles.module.css'

const t = {
  singular: translate({
    id: 'theme.blog.archive.post',
    message: ' post',
    description: 'The singular name of a blog post',
  }),
  plural: translate({
    id: 'theme.blog.archive.posts',
    message: ' posts',
    description: 'The plural name of a blog post',
  }),
}

const yearSuffix = translate({
  id: 'theme.blog.archive.yearsuffix',
  message: '',
  description: 'The suffix of a year in a blog archive',
})

interface YearProp {
  year: string
  posts: ArchiveBlogPost[]
}

function Year({ year, posts }: YearProp) {
  return (
    <>
      <h3>
        {year}
        {yearSuffix} — {posts.length}
        {posts.length > 1 ? t.plural : t.singular}
      </h3>
      <ul className={styles.list}>
        {posts.map((post) => (
          <Link key={post.metadata.permalink} to={post.metadata.permalink}>
            <li style={{ textWrap: 'balance' }}>{post.metadata.title}</li>
          </Link>
        ))}
      </ul>
    </>
  )
}

function YearsSection({ years }: { years: YearProp[] }) {
  return (
    <section className="margin-vert--lg">
      <div className={styles.container}>
        <div className="row">
          {years.reverse().map((yearProps) => (
            <div className="col margin-vert--md col--4" key={yearProps.year}>
              <Year {...yearProps} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function listPostsByYears(blogPosts: readonly ArchiveBlogPost[]): YearProp[] {
  const postsByYear = blogPosts.reduceRight((posts, post) => {
    const year = post.metadata.date.split('-')[0] ?? 'unknown'
    const yearPosts = posts.get(year) ?? []
    return posts.set(year, [post, ...yearPosts])
  }, new Map<string, ArchiveBlogPost[]>())

  return Array.from(postsByYear, ([year, posts]) => ({
    year,
    posts,
  }))
}

export default function BlogArchive({ archive }: Props) {
  const title = translate({
    id: 'theme.blog.archive.title',
    message: 'Archive',
    description: 'The page & hero title of the blog archive page',
  })
  const description = translate({
    id: 'theme.blog.archive.description',
    message: 'All posts that I wrote.',
    description: 'The page & hero description of the blog archive page',
  })
  const years = listPostsByYears(archive.blogPosts)
  return (
    <>
      <PageMetadata description={description} title={title} />
      <Layout>
        <header className="hero hero--primary">
          <div className={styles.heroContainer}>
            <h1 className={styles.heroTitle}>{title}</h1>
          </div>
        </header>
        <main>{years.length > 0 && <YearsSection years={years} />}</main>
      </Layout>
    </>
  )
}
