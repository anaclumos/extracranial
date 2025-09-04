import { ImageZoom } from 'fumadocs-ui/components/image-zoom'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import type { MDXComponents } from 'mdx/types'
import { Mermaid } from '@/components/mdx/mermaid'
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import Horizontal from '@/components/horizontal'
import { cn } from '@/lib/utils'

function getImageSrc(src: any): string {
  if (!src) return ''
  if (typeof src === 'string') return src
  if (typeof src === 'object') {
    // Next.js static import shapes
    if ('default' in (src as any) && (src as any).default?.src) return (src as any).default.src as string
    if ('src' in (src as any)) return (src as any).src as string
  }
  return String(src)
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    img: (props) => {
      const src: any = (props as any).src
      const hasDims = (props as any).width && (props as any).height
      const canZoom = hasDims
      if (canZoom) return <ImageZoom {...(props as any)} />
      const href = getImageSrc(src)
      // eslint-disable-next-line @next/next/no-img-element
      return (
        <img
          {...(props as any)}
          src={href}
          alt={props.alt ?? ''}
          className={cn('h-auto w-full max-w-prose mx-auto', (props as any).className)}
        />
      )
    },
    Mermaid,
    ...TabsComponents,
    ...components,
    Accordion,
    Accordions,
    Horizontal,
  }
}
