import { translate } from '@docusaurus/Translate'
import Admonition from '@theme/Admonition'
import React from 'react'
import type { JSX } from 'react'
import PostNotice from './PostNotice.module.css'

const title = translate({ message: 'Heads Up!' })

type Props = {
  metadata: {
    date: string
    title: string
  }
}

const bulletOneFront = translate({
  message: 'I wrote this post more than ',
})
const bulletOneBackSingular = translate({
  message: ' year ago.',
})
const bulletOneBackPlural = translate({
  message: ' years ago.',
})

const bulletTwo = translate({
  message: "That's enough time for things to change.",
})

const bulletThree = translate({
  message: 'Possibly, I may not endorse the content anymore.',
})

const translateCallToAction = translate({
  message: 'Google Latest Articles Instead',
})

const isOldPost = (date: string) => {
  const now = new Date()
  const postDate = new Date(date)
  if (now.getTime() - postDate.getTime() > 365 * 24 * 60 * 60 * 1000 * 2) {
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
    href={`https://www.google.com/search?q=${urlify(props.title)}&tbs=qdr:y`}
    target='_blank'
    rel='noopener noreferrer'
  >
    <button className={PostNotice.searchGoogleButton} type='button'>
      {translateCallToAction}
    </button>
  </a>
)

const index = (props: Props) => {
  const { metadata } = props
  return (
    isOldPost(metadata.date) && (
      <Admonition type='caution' title={title}>
        <ul>
          <li>
            {bulletOneFront}
            {howManyYearsAgo(metadata.date)}
            {howManyYearsAgo(metadata.date) > 1
              ? bulletOneBackPlural
              : bulletOneBackSingular}
          </li>
          <li>{bulletTwo}</li>
          <li>{bulletThree}</li>
        </ul>
        <SearchGoogleButton title={metadata.title} />
      </Admonition>
    )
  )
}

export default index
