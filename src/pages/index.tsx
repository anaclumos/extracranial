import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import styles from './index.module.css'
import EmojiReplaceableText from '../components/EmojiReplaceableText'
import Translate, { translate } from '@docusaurus/Translate'
import Head from '@docusaurus/Head'

import Profile from '@site/static/img/profile.jpg'
import AlienMonsterEmoji from '@site/static/fonts/emoji/alien-monster.png'
import BankEmoji from '@site/static/fonts/emoji/bank.png'
import KoreaEmoji from '@site/static/fonts/emoji/korea.png'
import USEmoji from '@site/static/fonts/emoji/us.png'
import NewspaperEmoji from '@site/static/fonts/emoji/newspaper.png'
import PillEmoji from '@site/static/fonts/emoji/pill.png'
import RadioactiveEmoji from '@site/static/fonts/emoji/radioactive.png'
import RocketEmoji from '@site/static/fonts/emoji/rocket.png'
import TechnologistEmoji from '@site/static/fonts/emoji/technologist.png'
import WebEmoji from '@site/static/fonts/emoji/web.png'
import GrammarlyLogo from '@site/static/fonts/emoji/grammarly.png'
import KarrotLogo from '@site/static/fonts/emoji/karrot.png'
import BaeminLogo from '@site/static/fonts/emoji/baemin.png'
import RobotEmoji from '@site/static/fonts/emoji/robot.png'
import WikipediaEmoji from '@site/static/fonts/emoji/wikipedia.png'
import SplatoonEmoji from '@site/static/fonts/emoji/splatoon.png'
import { Globe } from '../components/Globe'
import BrowserOnly from '@docusaurus/BrowserOnly'

const HeroText = () => {
  const { siteConfig } = useDocusaurusContext()

  return (
    <>
      <Head>
        <title>{siteConfig.title}</title>
        <meta property="og:image" content="img/ogimage.png" />
        <meta property="twitter:image" content="img/ogimage.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="twitter:card" content="img/ogimage.png" />
        <meta property="twitter:site" content="@anaclumos" />
        <meta property="twitter:creator" content="@anaclumos" />
        <meta property="twitter:title" content={siteConfig.title} />
        <meta property="twitter:description" content={siteConfig.tagline} />
        <meta name="description" content={siteConfig.tagline} />
        <meta property="og:title" content={siteConfig.title} />
        <meta property="og:description" content={siteConfig.tagline} />
        <link rel="icon" href="img/favicon.svg" />
        <link rel="icon" href="img/favicon.ico" />
        <link rel="apple-touch-icon" sizes="57x57" href="img/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="img/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="img/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="img/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="img/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="img/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="img/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="img/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="img/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="img/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="img/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="img/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="img/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileImage" content="img/ms-icon-144x144.png" />
        <meta name="naver-site-verification" content="15b31306fd3391cd0bf411b1d49160aa02dd3cad" />
      </Head>

      <p className={styles.intro}>
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
          text={translate({ message: 'Seoul' })}
          photo={KoreaEmoji}
          photoAlt={translate({
            message: '🇰🇷',
          })}
          showByDefault="emoji"
        />
        <Translate>{' and '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'Los Angeles' })}
          photo={USEmoji}
          photoAlt={translate({
            message: '🇺🇸',
          })}
          showByDefault="emoji"
        />
        <Translate>{'. He previously interned at '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'Grammarly' })}
          photo={GrammarlyLogo}
          photoAlt={translate({
            message: '🅖',
          })}
          showByDefault="emoji"
        />
        <Translate>{', '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'Karrot' })}
          photo={KarrotLogo}
          photoAlt={translate({
            message: 'Karrot',
          })}
          showByDefault="emoji"
        />
        <Translate>{', and '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'Woowa Bros' })}
          photo={BaeminLogo}
          photoAlt={translate({
            message: 'Woowa Bros',
          })}
          showByDefault="emoji"
        />
        <Translate>{', usually with next-gen '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'web' })}
          photo={WebEmoji}
          photoAlt={translate({
            message: '🕸',
          })}
          showByDefault="emoji"
        />
        <Translate>{'. His academic interest spans '}</Translate>
        <EmojiReplaceableText
          text={translate({
            message: 'computational intelligence',
          })}
          photo={RobotEmoji}
          photoAlt={translate({
            message: '🤖',
          })}
          showByDefault="emoji"
        />
        <Translate>{', '}</Translate>
        <EmojiReplaceableText
          text={translate({
            message: 'spacial computing',
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
        <Translate>{'. When he is not coding, he enjoys studying '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'economics' })}
          photo={BankEmoji}
          photoAlt={translate({
            message: '💰',
          })}
          showByDefault="emoji"
        />
        <Translate>{' or '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'modern history' })}
          photo={NewspaperEmoji}
          photoAlt={translate({
            message: '📰',
          })}
          showByDefault="emoji"
        />
        <Translate>{', reading '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'Wikipedia' })}
          photo={WikipediaEmoji}
          photoAlt={translate({
            message: '📚',
          })}
          showByDefault="emoji"
        />
        <Translate>{', and playing '}</Translate>
        <EmojiReplaceableText
          text={translate({ message: 'Splatoon' })}
          photo={SplatoonEmoji}
          photoAlt={translate({
            message: '🎮',
          })}
          showByDefault="emoji"
        />
        <Translate>{'. '}</Translate>
      </p>
    </>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title={`${siteConfig.title}`} description={siteConfig.tagline}>
      <main className={styles.mainContainer}>
        <HeroText />
        <BrowserOnly>{() => <Globe />}</BrowserOnly>
      </main>
    </Layout>
  )
}
