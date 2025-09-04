import { ImageZoom } from 'fumadocs-ui/components/image-zoom'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import type { MDXComponents } from 'mdx/types'
import Figure from '@/components/figure'
import { Mermaid } from '@/components/mdx/mermaid'
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import Horizontal from '@/components/horizontal'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    img: (props) =>
      props.title ? (
        <Figure
          // @ts-ignore: src can be StaticImport
          src={props.src}
          alt={props.alt ?? ''}
          // width/height are present for static imports (remarkImage useImport)
          // @ts-ignore
          width={props.width as any}
          // @ts-ignore
          height={props.height as any}
          caption={props.title}
        />
      ) : (
        <ImageZoom {...props} />
      ),
    Figure,
    Mermaid,
    ...TabsComponents,
    ...components,
    Accordion,
    Accordions,
    Horizontal,
  }
}
