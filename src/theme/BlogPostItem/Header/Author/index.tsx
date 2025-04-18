import Link, { type Props as LinkProps } from '@docusaurus/Link'
import clsx from 'clsx'
import React from 'react'
import type { JSX } from 'react'
import styles from './styles.module.css'

function MaybeLink(props: LinkProps) {
  if (props.href) {
    return <Link {...props} />
  }
  return <>{props.children}</>
}

export default function BlogPostItemHeaderAuthor({
  author,
  className,
}: {
  author: {
    name: string
    title: string
    url: string
    imageURL: string
    email: string
  }
  className?: string
}) {
  const { name, title, url, imageURL, email } = author
  const link = url || (email && `mailto:${email}`) || undefined
  return (
    <MaybeLink href={link} className={clsx(styles.link, 'avatar__photo-link')}>
      <div
        className={clsx('avatar margin-bottom--sm', className, styles.author)}
      >
        {imageURL && (
          <img className='avatar__photo' src={imageURL} alt={name} />
        )}

        {name && (
          <div
            className='avatar__intro'
            itemProp='author'
            itemScope
            itemType='https://schema.org/Person'
          >
            <div className={clsx('avatar__name', styles.authorName)}>
              <span itemProp='name'>{name}</span>
            </div>
            {title && (
              <small
                className={clsx('avatar__subtitle', styles.authorSubtitle)}
                itemProp='description'
              >
                {title}
              </small>
            )}
          </div>
        )}
      </div>
    </MaybeLink>
  )
}
