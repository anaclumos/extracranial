import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

type MdxJsxAttribute = {
  type: 'mdxJsxAttribute'
  name: string
  value?: string | { type: 'mdxJsxAttributeValueExpression'; value: string }
}

type MdxJsxElement = {
  type: 'mdxJsxFlowElement' | 'mdxJsxTextElement'
  name: string | null
  attributes: MdxJsxAttribute[]
}

type MdxjsEsm = {
  type: 'mdxjsEsm'
  value: string
}

// Transform <Figure src="./img.png" alt="..." /> into:
// import _fig1 from './img.png'
// <Figure src={_fig1} width={_fig1.width} height={_fig1.height} alt="..." />
// Only when src is a literal relative path.
const remarkFigureImport: Plugin<[], any> = () => {
  return (tree: any) => {
    let counter = 0
    const esmImports: MdxjsEsm[] = []

    visit(tree, (node: any) => {
      if (!node || (node.type !== 'mdxJsxFlowElement' && node.type !== 'mdxJsxTextElement')) return
      const el = node as MdxJsxElement
      if (el.name !== 'Figure') return
      const srcAttr = el.attributes.find((a) => a.type === 'mdxJsxAttribute' && a.name === 'src') as MdxJsxAttribute | undefined
      if (!srcAttr || typeof srcAttr.value !== 'string') return
      const src = srcAttr.value.trim()
      if (!(src.startsWith('./') || src.startsWith('../'))) return
      // create unique import id
      const id = `_fig${++counter}`
      esmImports.push({ type: 'mdxjsEsm', value: `import ${id} from '${src}';` })
      // replace src with expression
      srcAttr.value = { type: 'mdxJsxAttributeValueExpression', value: id }

      // add width/height if missing
      const hasWidth = el.attributes.some((a) => a.type === 'mdxJsxAttribute' && a.name === 'width')
      const hasHeight = el.attributes.some((a) => a.type === 'mdxJsxAttribute' && a.name === 'height')
      if (!hasWidth) {
        el.attributes.push({
          type: 'mdxJsxAttribute',
          name: 'width',
          value: { type: 'mdxJsxAttributeValueExpression', value: `${id}.width` },
        })
      }
      if (!hasHeight) {
        el.attributes.push({
          type: 'mdxJsxAttribute',
          name: 'height',
          value: { type: 'mdxJsxAttributeValueExpression', value: `${id}.height` },
        })
      }
    })

    if (esmImports.length > 0) {
      // Prepend imports after frontmatter if any; here we simply unshift.
      tree.children = [...esmImports, ...tree.children]
    }
  }
}

export default remarkFigureImport

