import { translate } from '@docusaurus/Translate'
import React from 'react'
import Admonition from '@theme/Admonition'

const title = translate({ message: 'Work in Progress' })
const first = translate({ message: 'This is a work in progress. Please check back later.' })
const second = translate({ message: 'Usually, this is because I am translating this post to other languages.' })
const third = translate({
  message: 'Try looking for this post in other languages, if you are multilingual.',
})

const index = () => {
  return (
    <Admonition type='info' title={title} icon='💬'>
      <ul>
        <li> {first} </li>
        <li> {second} </li>
        <li> {third} </li>
      </ul>
    </Admonition>
  )
}

export default index
