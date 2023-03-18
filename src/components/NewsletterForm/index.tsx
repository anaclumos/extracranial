import React from 'react';

import styles from './index.module.css'
// @ts-ignore
const { i18n } = useDocusaurusContext()

const NewsletterForm = () => {

  const isEnglishLocale = i18n.currentLocale.startsWith('en');
  const isKoreanLocale = i18n.currentLocale.startsWith('ko');

  return (
    <form
      method="post"
      action="https://newsletters.cho.sh/subscription/form"
      className={styles.formContainer}
    >
      <div>
        <h3 className={styles.subscribeHeader}>Subscribe</h3>
        <p>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail"
            className={styles.emailInput}
          />
        </p>
        <p className="mb-4">
          <input
            id="ed372"
            type="checkbox"
            name="l"
            value="ed372c11-9f49-4d41-aecf-d8893bf48996"
            className={styles.checkbox}
            checked={isKoreanLocale || (!isEnglishLocale && !isKoreanLocale)}
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
          />
          <label htmlFor="5ebfb" className={styles.checkboxLabel}>
            English (en-US)
            <br />
            <span className={styles.smallText}>The content is exactly the same 😆</span>
          </label>
        </p>
        <p>
          <input
            type="submit"
            value="Subscribe"
            className={styles.submitButton}
          />
        </p>
      </div>
    </form>
  );
};


export default NewsletterForm;
