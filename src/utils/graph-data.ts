import Graph from 'graphology'
import type { SerializedGraph } from 'graphology-types'

export interface BacklinksData {
  [target: string]: {
    [source: string]: string
  }
}

export interface FilenamesData {
  [title: string]: string
}

const GROUP_COLORS: Record<string, string> = {
  journal: '#60a5fa',
  page: '#4ade80',
  coding: '#fbbf24',
  default: '#a78bfa',
}

const JOURNAL_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const CODING_PATTERN = /^\d{4}\s/

function inferGroup(title: string): string {
  if (JOURNAL_PATTERN.test(title)) {
    return 'journal'
  }
  if (CODING_PATTERN.test(title)) {
    return 'coding'
  }
  return 'page'
}

function getColorForGroup(group: string): string {
  return GROUP_COLORS[group] ?? GROUP_COLORS.default ?? '#a78bfa'
}

export function buildGraphData(
  backlinks: BacklinksData,
  filenames: FilenamesData
): SerializedGraph {
  const graph = new Graph({ type: 'directed', allowSelfLoops: false })

  const nodeMap = new Map<
    string,
    { slug: string; inDegree: number; outDegree: number; group: string }
  >()

  for (const [title, slug] of Object.entries(filenames)) {
    const normalizedTitle = title.normalize('NFC')
    const group = inferGroup(normalizedTitle)
    nodeMap.set(normalizedTitle, {
      slug,
      inDegree: 0,
      outDegree: 0,
      group,
    })
  }

  const edges: Array<{ source: string; target: string }> = []

  for (const [target, referrers] of Object.entries(backlinks)) {
    const normalizedTarget = target.normalize('NFC')
    if (!nodeMap.has(normalizedTarget)) {
      continue
    }

    for (const source of Object.keys(referrers)) {
      const normalizedSource = source.normalize('NFC')
      if (!nodeMap.has(normalizedSource)) {
        continue
      }
      if (normalizedSource === normalizedTarget) {
        continue
      }

      const sourceData = nodeMap.get(normalizedSource)
      const targetData = nodeMap.get(normalizedTarget)
      if (sourceData && targetData) {
        sourceData.outDegree++
        targetData.inDegree++
        edges.push({ source: normalizedSource, target: normalizedTarget })
      }
    }
  }

  const nodeCount = nodeMap.size
  const gridSize = Math.ceil(Math.sqrt(nodeCount))
  let idx = 0

  for (const [title, data] of nodeMap.entries()) {
    const degree = data.inDegree + data.outDegree
    const size = Math.max(3, Math.min(20, 3 + Math.sqrt(degree) * 2))
    const color = getColorForGroup(data.group)

    const row = Math.floor(idx / gridSize)
    const col = idx % gridSize
    const x = (col / gridSize - 0.5) * 5000
    const y = (row / gridSize - 0.5) * 5000

    graph.addNode(title, {
      slug: data.slug,
      size,
      label: title,
      color,
      x,
      y,
      group: data.group,
    })
    idx++
  }

  for (const edge of edges) {
    if (!graph.hasEdge(edge.source, edge.target)) {
      graph.addEdge(edge.source, edge.target, {
        size: 0.5,
      })
    }
  }

  return graph.export()
}

export function getGraphStats(graphData: SerializedGraph) {
  const graph = Graph.from(graphData)
  const nodeCount = graph.order
  const edgeCount = graph.size

  let totalDegree = 0
  graph.forEachNode((node) => {
    totalDegree += graph.degree(node)
  })

  const avgDegree = nodeCount > 0 ? totalDegree / nodeCount : 0

  const nodesByDegree = graph
    .nodes()
    .map((node) => ({ node, degree: graph.degree(node) }))
    .sort((a, b) => b.degree - a.degree)
    .slice(0, 10)

  return {
    nodeCount,
    edgeCount,
    avgDegree: avgDegree.toFixed(1),
    topNodes: nodesByDegree,
  }
}
