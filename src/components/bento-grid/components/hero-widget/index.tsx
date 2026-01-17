import Translate from '@docusaurus/Translate'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { cn } from '@site/src/util/cn'
import { useEffect, useState } from 'react'
import { ORGANIZATIONS, type OrganizationKey } from '../../constants'
import BentoWidget from '../bento-widget'
import styles from './styles.module.css'

interface InlineOrgProps {
  name: string
  icon: string
  isActive: boolean
  onClick: () => void
}

function InlineOrg({ name, icon, isActive, onClick }: InlineOrgProps) {
  return (
    <button
      aria-expanded={isActive}
      aria-haspopup="true"
      className={styles.inlineOrg}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      type="button"
    >
      <img
        alt={name}
        className={styles.inlineOrgIcon}
        height={24}
        src={icon}
        width={24}
      />
      {isActive && (
        <output className={styles.inlineOrgPopover}>
          <span aria-hidden="true" className={styles.inlineOrgPopoverArrow} />
          {name}
        </output>
      )}
    </button>
  )
}

interface HeroWidgetProps {
  className?: string
}

export default function HeroWidget({ className }: HeroWidgetProps) {
  const [activeOrg, setActiveOrg] = useState<string | null>(null)
  const { i18n } = useDocusaurusContext()
  const isKorean = i18n.currentLocale === 'ko'

  useEffect(() => {
    if (!activeOrg) {
      return
    }
    const handleClickOutside = () => setActiveOrg(null)
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [activeOrg])

  const handleOrgClick = (name: string) => {
    setActiveOrg(activeOrg === name ? null : name)
  }

  const getName = (org: OrganizationKey) =>
    isKorean ? ORGANIZATIONS[org].ko : ORGANIZATIONS[org].en

  return (
    <BentoWidget className={cn(styles.heroWidget, className)}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          <Translate id="bento.hero.name">Sunghyun Cho</Translate>
        </h1>
        <p className={styles.heroSubtitle}>
          {isKorean ? (
            <>
              <InlineOrg
                icon={ORGANIZATIONS.kmla.icon}
                isActive={activeOrg === 'kmla'}
                name={getName('kmla')}
                onClick={() => handleOrgClick('kmla')}
              />
              와{' '}
              <InlineOrg
                icon={ORGANIZATIONS.usc.icon}
                isActive={activeOrg === 'usc'}
                name={getName('usc')}
                onClick={() => handleOrgClick('usc')}
              />
              를 졸업하고,
              <br />
              <InlineOrg
                icon={ORGANIZATIONS.lunit.icon}
                isActive={activeOrg === 'lunit'}
                name={getName('lunit')}
                onClick={() => handleOrgClick('lunit')}
              />
              에서 의료 LLM 플랫폼을 만듭니다.
              <br />
              <InlineOrg
                icon={ORGANIZATIONS.baemin.icon}
                isActive={activeOrg === 'baemin'}
                name={getName('baemin')}
                onClick={() => handleOrgClick('baemin')}
              />
              ,{' '}
              <InlineOrg
                icon={ORGANIZATIONS.karrot.icon}
                isActive={activeOrg === 'karrot'}
                name={getName('karrot')}
                onClick={() => handleOrgClick('karrot')}
              />
              ,{' '}
              <InlineOrg
                icon={ORGANIZATIONS.grammarly.icon}
                isActive={activeOrg === 'grammarly'}
                name={getName('grammarly')}
                onClick={() => handleOrgClick('grammarly')}
              />
              를 거쳤습니다.
            </>
          ) : (
            <>
              Graduated from{' '}
              <InlineOrg
                icon={ORGANIZATIONS.kmla.icon}
                isActive={activeOrg === 'kmla'}
                name={getName('kmla')}
                onClick={() => handleOrgClick('kmla')}
              />{' '}
              and{' '}
              <InlineOrg
                icon={ORGANIZATIONS.usc.icon}
                isActive={activeOrg === 'usc'}
                name={getName('usc')}
                onClick={() => handleOrgClick('usc')}
              />
              .
              <br />
              Building medical LLM platform at{' '}
              <InlineOrg
                icon={ORGANIZATIONS.lunit.icon}
                isActive={activeOrg === 'lunit'}
                name={getName('lunit')}
                onClick={() => handleOrgClick('lunit')}
              />
              .
              <br />
              Previously at{' '}
              <InlineOrg
                icon={ORGANIZATIONS.baemin.icon}
                isActive={activeOrg === 'baemin'}
                name={getName('baemin')}
                onClick={() => handleOrgClick('baemin')}
              />
              ,{' '}
              <InlineOrg
                icon={ORGANIZATIONS.karrot.icon}
                isActive={activeOrg === 'karrot'}
                name={getName('karrot')}
                onClick={() => handleOrgClick('karrot')}
              />
              , and{' '}
              <InlineOrg
                icon={ORGANIZATIONS.grammarly.icon}
                isActive={activeOrg === 'grammarly'}
                name={getName('grammarly')}
                onClick={() => handleOrgClick('grammarly')}
              />
              .
            </>
          )}
        </p>
      </div>
    </BentoWidget>
  )
}
