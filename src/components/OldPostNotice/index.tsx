import Translate from '@docusaurus/Translate'
import React from 'react'
import opn from './oldpostnotice.module.css'

type Props = {
  frontMatter: any
  assets: any
  metadata: any
  isBlogPostPage: any
  children: any
}

const isOldPost = (date: string) => {
  const now = new Date()
  const postDate = new Date(date)
  if (now.getTime() - postDate.getTime() > 365 * 24 * 60 * 60 * 1000) {
    return true
  }
  return false
}

const howManyYearsAgo = (date: string) => {
  const now = new Date()
  const postDate = new Date(date)
  const diff = now.getTime() - postDate.getTime()
  const years = Math.floor(diff / (365 * 24 * 60 * 60 * 1000))
  return years
}

const urlify = (text: string) => {
  return text.replace(/\s/g, '+')
}

const SearchGoogleButton = (props) => (
  <a
    role='button'
    className={opn.searchGoogleButton}
    href={`https://www.google.com/search?q=${urlify(props.title)}&tbs=qdr:y`}
    target='_blank'
    rel='noopener noreferrer'
  >
    <Translate>Google Latest Articles Instead</Translate>
  </a>
)

const index = (props: Props) => {
  const { metadata } = props
  return (
    isOldPost(metadata.date) && (
      <div className={opn.old}>
        <div>
          <h5>
            <span className={opn.iconspan}>
              <svg className={opn.icon} xmlns='http://www.w3.org/2000/svg' width='12' height='16' viewBox='0 0 12 16'>
                <path
                  fill-rule='evenodd'
                  d='M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z'
                ></path>
              </svg>
            </span>
            <Translate>Old post ahead!</Translate>
          </h5>
        </div>
        <div>
          <p>
            <ul>
              <li>
                <Translate>I wrote this post more than</Translate> {howManyYearsAgo(metadata.date)}
                {howManyYearsAgo(metadata.date) > 1 ? (
                  <Translate> years ago.</Translate>
                ) : (
                  <Translate> year ago.</Translate>
                )}
              </li>
              <li>
                <Translate>That's enough time for things to change.</Translate>
              </li>
              <li>
                <Translate>I might not agree with this post anymore.</Translate>
              </li>
            </ul>
          </p>
          <SearchGoogleButton title={metadata.title} />
        </div>
      </div>
    )
  )
}

export default index
