import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import styles from './index.module.css'
import EmojiReplaceableText from '../components/EmojiReplaceableText'
import Translate, { translate } from '@docusaurus/Translate'
import { Globe } from '../components/Globe'
import Head from '@docusaurus/Head'

import Profile from '../../static/img/profile.jpg'
import AlienMonsterEmoji from '../../static/fonts/emoji/alien-monster.png'
import BankEmoji from '../../static/fonts/emoji/bank.png'
import KoreaEmoji from '../../static/fonts/emoji/korea.png'
import USEmoji from '../../static/fonts/emoji/us.png'
import NewspaperEmoji from '../../static/fonts/emoji/newspaper.png'
import PillEmoji from '../../static/fonts/emoji/pill.png'
import RadioactiveEmoji from '../../static/fonts/emoji/radioactive.png'
import RocketEmoji from '../../static/fonts/emoji/rocket.png'
import TechnologistEmoji from '../../static/fonts/emoji/technologist.png'
import WebEmoji from '../../static/fonts/emoji/web.png'
import UnicornEmoji from '../../static/fonts/emoji/unicorn.png'
import CarrotEmoji from '../../static/fonts/emoji/carrot.png'
import MobilePhoneEmoji from '../../static/fonts/emoji/mobile-phone.png'

const HeroText = () => {
  const { siteConfig } = useDocusaurusContext()
  return (
    <>
      <Head>
        <title>{siteConfig.title}</title>
        <meta
          name="description"
          content={siteConfig.tagline}
        />
        <meta
          property="og:title"
          content={siteConfig.title}
        />
        <meta
          property="og:description"
          content={siteConfig.tagline}
        />
        <meta
          property="og:image"
          content="https://cho.sh/img/ogimage.png"
        />
        <link
          rel="icon"
          href="https://cho.sh/img/favicon.png"
        />
        <meta
          name="naver-site-verification"
          content="15b31306fd3391cd0bf411b1d49160aa02dd3cad"
        />
      </Head>
      <header>
        <h1 className={styles.intro}>
          <EmojiReplaceableText
            text={translate({ message: 'Sunghyun' })}
            photo={Profile}
            photoAlt={translate({
              message: 'Sunghyun',
            })}
            showByDefault="emoji"
            border={true}
          />
          <Translate>{' is a '}</Translate>
          <EmojiReplaceableText
            text={translate({
              message: 'computer scientist',
            })}
            photo={TechnologistEmoji}
            photoAlt={translate({
              message: '👨🏻‍💻',
            })}
            showByDefault="emoji"
          />
          <Translate>{' based in '}</Translate>
          <EmojiReplaceableText
            text={translate({ message: 'Los Angeles' })}
            photo={USEmoji}
            photoAlt={translate({
              message: '🇺🇸',
            })}
            showByDefault="emoji"
          />
          <Translate>{' and '}</Translate>
          <EmojiReplaceableText
            text={translate({ message: 'Seoul' })}
            photo={KoreaEmoji}
            photoAlt={translate({
              message: '🇰🇷',
            })}
            showByDefault="emoji"
          />
          <Translate>
            {'. He currently works at a '}
          </Translate>
          <EmojiReplaceableText
            text={translate({ message: 'unicorn' })}
            photo={UnicornEmoji}
            photoAlt={translate({
              message: '🦄',
            })}
            showByDefault="emoji"
          />
          <Translate>{' company '}</Translate>
          <EmojiReplaceableText
            text={translate({ message: 'Karrot' })}
            photo={CarrotEmoji}
            photoAlt={translate({
              message: '🥕',
            })}
            showByDefault="emoji"
          />
          <Translate>
            {', researching secure sandboxing model for '}
          </Translate>
          <EmojiReplaceableText
            text={translate({ message: 'mini-apps' })}
            photo={MobilePhoneEmoji}
            photoAlt={translate({
              message: '📱',
            })}
            showByDefault="emoji"
          />
          <Translate>
            {'. He usually works on next-gen '}
          </Translate>
          <EmojiReplaceableText
            text={translate({ message: 'web' })}
            photo={WebEmoji}
            photoAlt={translate({
              message: '🕸',
            })}
            showByDefault="emoji"
          />
          <Translate>
            {
              ' technologies, while his interest spans across variety of fields like '
            }
          </Translate>
          <EmojiReplaceableText
            text={translate({
              message: 'computer graphics',
            })}
            photo={AlienMonsterEmoji}
            photoAlt={translate({
              message: '👾',
            })}
            showByDefault="emoji"
          />
          <Translate>{', '}</Translate>
          <EmojiReplaceableText
            text={translate({
              message: 'AI in medicine',
            })}
            photo={PillEmoji}
            photoAlt={translate({
              message: '☢',
            })}
            showByDefault="emoji"
          />
          <Translate>{', '}</Translate>
          <EmojiReplaceableText
            text={translate({ message: 'fusion energies' })}
            photo={RadioactiveEmoji}
            photoAlt={translate({
              message: '☢',
            })}
            showByDefault="emoji"
          />
          <Translate>{', and '}</Translate>
          <EmojiReplaceableText
            text={translate({
              message: 'space terraformings',
            })}
            photo={RocketEmoji}
            photoAlt={translate({
              message: '🚀',
            })}
            showByDefault="emoji"
          />
          <Translate>
            {'. When he is not coding, he enjoys learning '}
          </Translate>
          <EmojiReplaceableText
            text={translate({ message: 'modern history' })}
            photo={NewspaperEmoji}
            photoAlt={translate({
              message: '📰',
            })}
            showByDefault="emoji"
          />
          <Translate>{' and '}</Translate>
          <EmojiReplaceableText
            text={translate({ message: 'economics' })}
            photo={BankEmoji}
            photoAlt={translate({
              message: '💰',
            })}
            showByDefault="emoji"
          />
          <Translate>{'. '}</Translate>
          <a
            href="https://mailhide.io/e/IXndXpED"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.email}
          >
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
    <Layout
      title={`${siteConfig.title}`}
      description={siteConfig.tagline}
    >
      <main className={styles.mainContainer}>
        <HeroText />
        <Globe />
      </main>
    </Layout>
  )
}
