import { translate } from '@docusaurus/Translate'
import React from 'react'
import Admonition from '@theme/Admonition'

type Props = {
  state: 'translating' | undefined
}

const title = translate({ message: 'Work in Progress' })
const wip = translate({
  message: 'Work in Progress. Check back later.',
})
const second = translate({
  message: 'I wrote this post in another language. I did not translate it to other languages yet.',
})
const third = translate({
  message: 'If you speak different languages, look for this post in that language.',
})

const index = ({ state }: Props) => {
  return (
    <Admonition type="info" title={title} icon="💬">
      {!state && <p>{wip}</p>}
      {state === 'translating' && (
        <>
          <p>
            {second} {third}
          </p>
        </>
      )}
    </Admonition>
  )
}

export default index
