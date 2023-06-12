import React, { useState } from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './NewsletterForm.module.css'

const NewsletterForm = () => {
  const { i18n } = useDocusaurusContext()

  const [isKoreanLocale, setIsKoreanLocale] = useState(i18n.currentLocale.startsWith('ko'))
  const [isEnglishLocale, setIsEnglishLocale] = useState(i18n.currentLocale.startsWith('en'))

  return (
    <form method="post" action="https://newsletters.cho.sh/subscription/form" className={styles.formContainer}>
      <div>
        <h3 className={styles.subscribeHeader}>Subscribe</h3>
        <p>
          <input type="email" name="email" required placeholder="Mail" className={styles.emailInput} />
        </p>
        <p className="mb-4">
          <input
            id="ed372"
            type="checkbox"
            name="l"
            value="ed372c11-9f49-4d41-aecf-d8893bf48996"
            className={styles.checkbox}
            checked={isKoreanLocale}
            onChange={() => {
              setIsKoreanLocale(!isKoreanLocale)
            }}
          />
          <label htmlFor="ed372" className={styles.checkboxLabel}>
            한국어 (ko-KR)
            <br />
            <span className={styles.smallText}>뉴스레터의 내용은 동일합니다 😉</span>
          </label>
        </p>
        <p className="mb-4">
          <input
            id="5ebfb"
            type="checkbox"
            name="l"
            value="5ebfb430-82b5-47b8-b74b-c7b7d17bb97b"
            className={styles.checkbox}
            checked={isEnglishLocale}
            onChange={() => {
              setIsEnglishLocale(!isEnglishLocale)
            }}
          />
          <label htmlFor="5ebfb" className={styles.checkboxLabel}>
            English (en-US)
            <br />
            <span className={styles.smallText}>The content is exactly the same 😆</span>
          </label>
        </p>
        <p>
          <input type="submit" value="Subscribe" className={styles.submitButton} />
        </p>
      </div>
    </form>
  )
}

export default NewsletterForm
