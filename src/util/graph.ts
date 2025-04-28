import { filenames } from '@site/src/data/filenames'

export type Node = {
  nodeLabel: string
  id: string
  nodeRelSize: number
}

export const processBacklinksToGraph = (backlinks, includeJournalsInGraph: boolean) => {
  const nodes: Node[] = []
  const links: { source: string; target: string }[] = []
  for (const key in backlinks) {
    // if it ends with .png or .jpg or .jpeg, or .gif or .svg, then it's an image
    if (
      key.endsWith('.png') ||
      key.endsWith('.jpg') ||
      key.endsWith('.jpeg') ||
      key.endsWith('.gif') ||
      key.endsWith('.svg')
    )
      continue
    if (!includeJournalsInGraph && key.match(/^\d{4}-\d{2}-\d{2}$/)) continue

    const node: Node = {
      nodeLabel: key,
      id: filenames[key],
      nodeRelSize: 1,
    } as Node
    if (!nodes.find((n) => n.id === node.id)) {
      nodes.push(node)
    }
    Object.keys(backlinks[key]).forEach((neighbor) => {
      if (!includeJournalsInGraph && neighbor.match(/^\d{4}-\d{2}-\d{2}$/)) return
      if (!filenames[neighbor]) return
      if (!nodes.find((node) => node.id === filenames[neighbor])) {
        nodes.push({
          nodeLabel: neighbor,
          id: filenames[neighbor],
          nodeRelSize: 1,
        })
      }
      links.push({
        source: filenames[key],
        target: filenames[neighbor],
      })
      nodes.find((n) => n.id === filenames[key]).nodeRelSize++
      node.nodeRelSize++
    })
  }
  return { nodes, links }
}
