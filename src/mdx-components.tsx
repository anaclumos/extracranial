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
    img: (props) => <ImageZoom {...props} />,
    Figure,
    Mermaid,
    ...TabsComponents,
    ...components,
    Accordion,
    Accordions,
    Horizontal,
  }
}
