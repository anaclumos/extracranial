import { translate } from '@docusaurus/Translate'
import Admonition from '@theme/Admonition'

interface WIPProps {
  state?: 'translating'
}

const TRANSLATIONS = {
  title: translate({ message: 'Work in Progress' }),
  wip: translate({ message: 'Work in Progress. Check back later.' }),
  translating: translate({
    message: 'I wrote this post in another language. I did not translate it to other languages yet.',
  }),
  languageHint: translate({
    message: 'If you speak different languages, look for this post in that language.',
  }),
} as const

export default function WIP({ state }: WIPProps) {
  return (
    <Admonition type="info" title={TRANSLATIONS.title} icon="💬">
      {!state && <p>{TRANSLATIONS.wip}</p>}
      {state === 'translating' && (
        <p>
          {TRANSLATIONS.translating} {TRANSLATIONS.languageHint}
        </p>
      )}
    </Admonition>
  )
}
