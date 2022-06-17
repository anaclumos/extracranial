import React from 'react'
import clsx from 'clsx'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import styles from './index.module.css'
import Translate, { translate } from '@docusaurus/Translate'
import EmojiReplaceableText from '../components/EmojiReplaceableText'

const HomepageHeader = () => {
  return (
    <header>
      <h1 className={clsx(styles.intro)}>
        <EmojiReplaceableText text='Sunghyun' photoSrc='https://github.com/anaclumos.png' />
        {' is a '}
        <EmojiReplaceableText text='Computer' emoji='💻' />
        {' Scientist based in '}
        <EmojiReplaceableText text='LA' emoji='🇺🇸' />
        {' and '}
        <EmojiReplaceableText text='Seoul' emoji='🇰🇷' />
        {'. He currently works at a'}
        <EmojiReplaceableText text='Unicorn' emoji='🦄' />
        {' company '}
        <EmojiReplaceableText text='Karrot' emoji='🥕' />
        {', researching Secure Sandboxing Models for '}
        <EmojiReplaceableText text='Mini-Apps' emoji='📱' />
        {'. He usually works on Next-gen '}
        <EmojiReplaceableText text='Web' emoji='🕸' />
        {' Technologies, while his interest spans across variety of fields like '}
        <EmojiReplaceableText text='Computer Graphics' emoji='👾' />
        {', '}
        <EmojiReplaceableText text='Medical AI' emoji='💊' />
        {', '}
        <EmojiReplaceableText text='Fusion Energies ' emoji='☢️' />
        {', and '}
        <EmojiReplaceableText text='Space Terraformings' emoji='🚀' />
        {'. When he is not coding, he enjoys learning '}
        <EmojiReplaceableText text='Modern History' emoji='📜' />
        {' and '}
        <EmojiReplaceableText text='Economics' emoji='🏦' />
        {'.'}
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
