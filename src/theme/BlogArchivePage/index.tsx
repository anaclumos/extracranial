import React from 'react'
import Link from '@docusaurus/Link'
import Translate, { translate } from '@docusaurus/Translate'
import { PageMetadata } from '@docusaurus/theme-common'
import Layout from '@theme/Layout'
import type { ArchiveBlogPost, Props } from '@theme/BlogArchivePage'
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

type YearProp = {
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
          <li key={post.metadata.date}>
            <Link to={post.metadata.permalink}>{post.metadata.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

function YearsSection({ years }: { years: YearProp[] }) {
  return (
    <section className='margin-vert--lg'>
      <div className='container'>
        <div className='row'>
          {years.reverse().map((_props, idx) => (
            <div key={idx} className='col col--4 margin-vert--lg'>
              <Year {..._props} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function listPostsByYears(blogPosts: readonly ArchiveBlogPost[]): YearProp[] {
  const postsByYear = blogPosts.reduceRight((posts, post) => {
    const year = post.metadata.date.split('-')[0]!
    const yearPosts = posts.get(year) ?? []
    return posts.set(year, [post, ...yearPosts])
  }, new Map<string, ArchiveBlogPost[]>())

  return Array.from(postsByYear, ([year, posts]) => ({
    year,
    posts,
  }))
}

export default function BlogArchive({ archive }: Props): JSX.Element {
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
      <PageMetadata title={title} description={description} />
      <Layout>
        <header className='hero hero--primary'>
          <div className='container'>
            <h1 className='hero__title'>{title}</h1>
            <p className='hero__subtitle'>{description}</p>
          </div>
        </header>
        <main>{years.length > 0 && <YearsSection years={years} />}</main>
      </Layout>
    </>
  )
}
