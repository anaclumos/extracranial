import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import styles from './index.module.css'
import EmojiReplaceableText from '../components/EmojiReplaceableText'
import Profile from '../../static/img/profile.jpg'

const HomepageHeader = () => {
  return (
    <header>
      <h1 className={styles.intro}>
        <EmojiReplaceableText text='Sunghyun' photo={Profile} emojiByDefault='emoji' />
        {' is a '}
        <EmojiReplaceableText text='Computer Scientist' emoji='🧑🏻‍💻' />
        {' based in '}
        <EmojiReplaceableText text='LA' emoji='🇺🇸' />
        {' and '}
        <EmojiReplaceableText text='Seoul' emoji='🇰🇷' />
        {'. He currently works at a '}
        <EmojiReplaceableText text='Unicorn' emoji='🦄' />
        {' company '}
        <EmojiReplaceableText text='Karrot' emoji='🥕' />
        {', researching secure sandboxing model for '}
        <EmojiReplaceableText text='Mini-Apps' emoji='📱' />
        {'. He usually works on next-gen '}
        <EmojiReplaceableText text='Web Technologies' emoji='🕸' />
        {', while his interest spans across variety of fields like '}
        <EmojiReplaceableText text='Computer Graphics' emoji='👾' />
        {', '}
        <EmojiReplaceableText text='Medical AI' emoji='💊' />
        {', '}
        <EmojiReplaceableText text='Fusion Energies' emoji='☢️' />
        {', and '}
        <EmojiReplaceableText text='Space Terraformings' emoji='🚀' />
        {'. When he is not coding, he enjoys learning '}
        <EmojiReplaceableText text='Modern History' emoji='📰' />
        {' and '}
        <EmojiReplaceableText text='Economics' emoji='🏦' />
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
