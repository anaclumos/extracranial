import Translate from '@docusaurus/Translate'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { cn } from '@site/src/util/cn'
import { memo, useCallback, useEffect, useState } from 'react'
import { ORGANIZATIONS, type OrganizationKey } from '../../constants'
import BentoWidget from '../bento-widget'
import styles from './styles.module.css'

interface InlineOrgProps {
  name: string
  icon: string
  isActive: boolean
  onClick: () => void
}

const InlineOrg = memo(function InlineOrg({
  name,
  icon,
  isActive,
  onClick,
}: InlineOrgProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onClick()
    },
    [onClick]
  )

  return (
    <button
      aria-expanded={isActive}
      aria-haspopup="true"
      aria-label={name}
      className={styles.inlineOrg}
      onClick={handleClick}
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
})

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

  const handleOrgClick = useCallback((name: string) => {
    setActiveOrg((prev) => (prev === name ? null : name))
  }, [])

  const handleKmlaClick = useCallback(
    () => handleOrgClick('kmla'),
    [handleOrgClick]
  )
  const handleUscClick = useCallback(
    () => handleOrgClick('usc'),
    [handleOrgClick]
  )
  const handleLunitClick = useCallback(
    () => handleOrgClick('lunit'),
    [handleOrgClick]
  )
  const handleBaeminClick = useCallback(
    () => handleOrgClick('baemin'),
    [handleOrgClick]
  )
  const handleKarrotClick = useCallback(
    () => handleOrgClick('karrot'),
    [handleOrgClick]
  )
  const handleGrammarlyClick = useCallback(
    () => handleOrgClick('grammarly'),
    [handleOrgClick]
  )

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
                onClick={handleKmlaClick}
              />
              와{' '}
              <InlineOrg
                icon={ORGANIZATIONS.usc.icon}
                isActive={activeOrg === 'usc'}
                name={getName('usc')}
                onClick={handleUscClick}
              />
              를 졸업하고,
              <br />
              <InlineOrg
                icon={ORGANIZATIONS.lunit.icon}
                isActive={activeOrg === 'lunit'}
                name={getName('lunit')}
                onClick={handleLunitClick}
              />
              에서 의료 LLM 플랫폼을 만듭니다.
              <br />
              <InlineOrg
                icon={ORGANIZATIONS.baemin.icon}
                isActive={activeOrg === 'baemin'}
                name={getName('baemin')}
                onClick={handleBaeminClick}
              />
              ,{' '}
              <InlineOrg
                icon={ORGANIZATIONS.karrot.icon}
                isActive={activeOrg === 'karrot'}
                name={getName('karrot')}
                onClick={handleKarrotClick}
              />
              ,{' '}
              <InlineOrg
                icon={ORGANIZATIONS.grammarly.icon}
                isActive={activeOrg === 'grammarly'}
                name={getName('grammarly')}
                onClick={handleGrammarlyClick}
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
                onClick={handleKmlaClick}
              />{' '}
              and{' '}
              <InlineOrg
                icon={ORGANIZATIONS.usc.icon}
                isActive={activeOrg === 'usc'}
                name={getName('usc')}
                onClick={handleUscClick}
              />
              .
              <br />
              Building medical LLM platform at{' '}
              <InlineOrg
                icon={ORGANIZATIONS.lunit.icon}
                isActive={activeOrg === 'lunit'}
                name={getName('lunit')}
                onClick={handleLunitClick}
              />
              .
              <br />
              Previously at{' '}
              <InlineOrg
                icon={ORGANIZATIONS.baemin.icon}
                isActive={activeOrg === 'baemin'}
                name={getName('baemin')}
                onClick={handleBaeminClick}
              />
              ,{' '}
              <InlineOrg
                icon={ORGANIZATIONS.karrot.icon}
                isActive={activeOrg === 'karrot'}
                name={getName('karrot')}
                onClick={handleKarrotClick}
              />
              , and{' '}
              <InlineOrg
                icon={ORGANIZATIONS.grammarly.icon}
                isActive={activeOrg === 'grammarly'}
                name={getName('grammarly')}
                onClick={handleGrammarlyClick}
              />
              .
            </>
          )}
        </p>
      </div>
    </BentoWidget>
  )
}
