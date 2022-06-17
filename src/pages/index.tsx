import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import styles from './index.module.css'
import EmojiReplaceableText from '../components/EmojiReplaceableText'
import Profile from '../../static/img/profile.jpg'
import Translate, { translate } from '@docusaurus/Translate'

const HomepageHeader = () => {
  const delayInSeconds = 3

  return (
    <header>
      <h1 className={styles.intro}>
        <EmojiReplaceableText
          text={translate({ message: 'Sunghyun' })}
          photo={Profile}
          emojiByDefault='emoji'
          countdown={delayInSeconds}
        />
        <Translate>{' is a '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'Computer Scientist' })}
          emoji='🧑🏻‍💻'
          emojiByDefault='emoji'
          countdown={delayInSeconds * 2}
        />
        <Translate>{' based in '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'LA' })}
          emoji='🇺🇸'
          emojiByDefault='emoji'
          countdown={delayInSeconds * 3}
        />
        <Translate>{' and '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'Seoul' })}
          emoji='🇰🇷'
          emojiByDefault='emoji'
          countdown={delayInSeconds * 4}
        />
        <Translate>{'. He currently works at a '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'Unicorn' })}
          emoji='🦄'
          emojiByDefault='emoji'
          countdown={delayInSeconds * 5}
        />
        <Translate>{' company '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'Karrot' })}
          emoji='🥕'
          emojiByDefault='emoji'
          countdown={delayInSeconds * 6}
        />
        <Translate>{', researching secure sandboxing model for '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'Mini-Apps' })}
          emoji='📱'
          emojiByDefault='emoji'
          countdown={delayInSeconds * 7}
        />
        <Translate>{'. He usually works on next-gen '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'Web Technologies' })}
          emoji='🕸'
          emojiByDefault='emoji'
          countdown={delayInSeconds * 8}
        />
        <Translate>{', while his interest spans across variety of fields like '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'Computer Graphics' })}
          emoji='👾'
          emojiByDefault='emoji'
          countdown={delayInSeconds * 9}
        />
        <Translate>{', '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'Medical AI' })}
          emoji='💊'
          emojiByDefault='emoji'
          countdown={delayInSeconds * 10}
        />
        <Translate>{', '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'Fusion Energies' })}
          emoji='☢️'
          emojiByDefault='emoji'
          countdown={delayInSeconds * 11}
        />
        <Translate>{', and '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'Space Terraformings' })}
          emoji='🚀'
          emojiByDefault='emoji'
          countdown={delayInSeconds * 12}
        />
        <Translate>{'. When he is not coding, he enjoys learning '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'Modern History' })}
          emoji='📰'
          emojiByDefault='emoji'
          countdown={delayInSeconds * 13}
        />
        <Translate>{' and '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'Economics' })}
          emoji='🏦'
          emojiByDefault='emoji'
          countdown={delayInSeconds * 14}
        />
        <Translate>{'. '}</Translate>
        <a href='https://mailhide.io/e/IXndXpED' target='_blank' rel='noopener noreferrer' className={styles.email}>
          <Translate>Get in touch.</Translate>
        </a>
      </h1>
    </header>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title={`${siteConfig.title}`} description={siteConfig.tagline}>
      <HomepageHeader />
      <main></main>
    </Layout>
  )
}
