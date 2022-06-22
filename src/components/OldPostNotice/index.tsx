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
          <h5 className={opn.title}>
            <span className={opn.iconspan}>
              <svg className={opn.icon} xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'>
                <path
                  fill-rule='evenodd'
                  d='M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z'
                ></path>
              </svg>
            </span>
            <Translate>Old Post Ahead!</Translate>
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
