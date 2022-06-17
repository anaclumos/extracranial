import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import styles from './index.module.css'
import EmojiReplaceableText from '../components/EmojiReplaceableText'

const HomepageHeader = () => {
  const delayInSeconds = 3

  return (
    <header>
      <h1 className={styles.intro}>
        <EmojiReplaceableText text='Sunghyun' photoSrc='https://github.com/anaclumos.png' emojiByDefault='emoji' />
        {' is a '}
        <EmojiReplaceableText text='Computer Scientist' emoji='🧑🏻‍💻' countdown={delayInSeconds * 13} />
        {' based in '}
        <EmojiReplaceableText text='LA' emoji='🇺🇸' countdown={delayInSeconds * 12} />
        {' and '}
        <EmojiReplaceableText text='Seoul' emoji='🇰🇷' countdown={delayInSeconds * 11} />
        {'. He currently works at a '}
        <EmojiReplaceableText text='Unicorn' emoji='🦄' countdown={delayInSeconds * 10} />
        {' company '}
        <EmojiReplaceableText text='Karrot' emoji='🥕' countdown={delayInSeconds * 9} />
        {', researching secure sandboxing model for '}
        <EmojiReplaceableText text='Mini-Apps' emoji='📱' countdown={delayInSeconds * 8} />
        {'. He usually works on next-gen '}
        <EmojiReplaceableText text='Web Technologies' emoji='🕸' countdown={delayInSeconds * 7} />
        {', while his interest spans across variety of fields like '}
        <EmojiReplaceableText text='Computer Graphics' emoji='👾' countdown={delayInSeconds * 6} />
        {', '}
        <EmojiReplaceableText text='Medical AI' emoji='💊' countdown={delayInSeconds * 5} />
        {', '}
        <EmojiReplaceableText text='Fusion Energies' emoji='☢️' countdown={delayInSeconds * 4} />
        {', and '}
        <EmojiReplaceableText text='Space Terraformings' emoji='🚀' countdown={delayInSeconds * 3} />
        {'. When he is not coding, he enjoys learning '}
        <EmojiReplaceableText text='Modern History' emoji='📰' countdown={delayInSeconds * 2} />
        {' and '}
        <EmojiReplaceableText text='Economics' emoji='🏦' countdown={delayInSeconds * 1} />
        {'. '}
        <a href='https://mailhide.io/e/IXndXpED' target='_blank' rel='noopener noreferrer' className={styles.email}>
          Get in touch.
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
