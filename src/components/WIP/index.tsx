import { translate } from '@docusaurus/Translate'
import React from 'react'
import Admonition from '@theme/Admonition'

type Props = {
  state: 'translating' | undefined
}

const title = translate({ message: 'Work in Progress' })
const first = translate({ message: 'This is a work in progress. Please check back later.' })
const second = translate({
  message: 'I wrote this post in another language first and was translating it to other languages.',
})
const third = translate({
  message: 'Therefore, if you speak different languages, look for this post in that language.',
})

const index = (props: Props) => {
  return (
    <Admonition type='info' title={title} icon='💬'>
      <ul>
        <li> {first} </li>
        {props.state === 'translating' && (
          <>
            <li> {second} </li>
            <li> {third} </li>
          </>
        )}
      </ul>
    </Admonition>
  )
}

export default index
