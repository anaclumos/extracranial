import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import styles from './index.module.css'
import EmojiReplaceableText from '../components/EmojiReplaceableText'
import Translate, { translate } from '@docusaurus/Translate'
import Profile from '../../static/img/profile.jpg'
import { Globe } from '../components/Globe'

const HeroText = () => {
  return (
    <>
      <header>
        <h1 className={styles.intro}>
          <EmojiReplaceableText
            text={translate({ message: 'Sunghyun' })}
            photo={Profile}
            photoAlt={translate({ message: 'Sunghyun Profile Image' })}
            emojiByDefault='emoji'
          />
          <Translate>{' is a '}</Translate>
          <EmojiReplaceableText text={translate({ message: 'computer scientist' })} emoji='🧑🏻‍💻' emojiByDefault='emoji' />
          <Translate>{' based in '}</Translate>
          <EmojiReplaceableText text={translate({ message: 'Los Angeles' })} emoji='🇺🇸' emojiByDefault='emoji' />
          <Translate>{' and '}</Translate>
          <EmojiReplaceableText text={translate({ message: 'Seoul' })} emoji='🇰🇷' emojiByDefault='emoji' />
          <Translate>{'. He currently works at a '}</Translate>
          <EmojiReplaceableText text={translate({ message: 'unicorn' })} emoji='🦄' emojiByDefault='emoji' />
          <Translate>{' company '}</Translate>
          <EmojiReplaceableText text={translate({ message: 'Karrot' })} emoji='🥕' emojiByDefault='emoji' />
          <Translate>{', researching secure sandboxing model for '}</Translate>
          <EmojiReplaceableText text={translate({ message: 'mini-apps' })} emoji='📱' emojiByDefault='emoji' />
          <Translate>{'. He usually works on next-gen '}</Translate>
          <EmojiReplaceableText text={translate({ message: 'web' })} emoji='🕸' emojiByDefault='emoji' />
          <Translate>{' technologies, while his interest spans across variety of fields like '}</Translate>
          <EmojiReplaceableText text={translate({ message: 'computer graphics' })} emoji='👾' emojiByDefault='emoji' />
          <Translate>{', '}</Translate>
          <EmojiReplaceableText
            text={translate({ message: 'artificial intelligences in medicine' })}
            emoji='💊'
            emojiByDefault='emoji'
          />
          <Translate>{', '}</Translate>
          <EmojiReplaceableText text={translate({ message: 'fusion energies' })} emoji='☢️' emojiByDefault='emoji' />
          <Translate>{', and '}</Translate>
          <EmojiReplaceableText
            text={translate({ message: 'space terraformings' })}
            emoji='🚀'
            emojiByDefault='emoji'
          />
          <Translate>{'. When he is not coding, he enjoys learning '}</Translate>
          <EmojiReplaceableText text={translate({ message: 'modern history' })} emoji='🗞' emojiByDefault='emoji' />
          <Translate>{' and '}</Translate>
          <EmojiReplaceableText text={translate({ message: 'economics' })} emoji='🏦' emojiByDefault='emoji' />
          <Translate>{'. '}</Translate>
          <a href='https://mailhide.io/e/IXndXpED' target='_blank' rel='noopener noreferrer' className={styles.email}>
            <span className={styles.nowrap}>
              <Translate>Get in touch.</Translate>
            </span>
          </a>
        </h1>
      </header>
    </>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title={`${siteConfig.title}`} description={siteConfig.tagline}>
      <main className={styles.mainContainer}>
        <HeroText />
        <Globe />
      </main>
    </Layout>
  )
}
