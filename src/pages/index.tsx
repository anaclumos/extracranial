import React from 'react'
import clsx from 'clsx'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import styles from './index.module.css'
import Translate, { translate } from '@docusaurus/Translate'

function HomepageHeader() {
  return (
    <header>
      <h1 className={clsx(styles.intro)}>
        <Translate>¶ Sunghyun</Translate>
        <span>
          <img
            src='https://github.com/anaclumos.png'
            alt={translate({
              message: 'Sunghyun Profile Image',
              description: 'Sunghyun Profile Image on Main Page',
            })}
          />
        </span>
        <Translate>
          is a Computer Scientist and a Software Engineer based in Los Angeles 🇺🇸 and Seoul 🇰🇷 . He began his studies in
          Computer Science 💻 at the USC, and usually work on Next-gen Web 🕸 Technologies. He currently works at a
          Unicorn 🦄 company Karrot 🥕, researching Secure Sandboxing Models for Mini-Apps 📱.
        </Translate>
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
