'use client'

import '@react-sigma/core/lib/style.css'
import { SigmaContainer, useLoadGraph, useSigma } from '@react-sigma/core'
import Graph from 'graphology'
import type { SerializedGraph } from 'graphology-types'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ForceLayout from './ForceLayout'
import GraphControls from './GraphControls'
import GraphEvents from './GraphEvents'
import GraphSearch from './GraphSearch'
import GraphSettings, {
  DEFAULT_VALUES,
  type GraphSettingsValues,
} from './GraphSettings'
import styles from './styles.module.css'

const LABEL_FONT =
  '"Pretendard GOV Variable", system-ui, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Segoe UI", Roboto, sans-serif'

const COLORS = {
  light: {
    text: '#1a2118',
    background: '#ffffff',
    node: '#80be7a',
    edge: 'rgba(26, 33, 24, 0.2)',
  },
  dark: {
    text: '#f1f7f0',
    background: '#000000',
    node: '#80be7a',
    edge: 'rgba(241, 247, 240, 0.15)',
  },
}

interface GraphViewProps {
  graphData: SerializedGraph
  focusNodeId?: string
  onNodeClick?: (nodeId: string, slug: string) => void
  height?: number | string
  darkMode?: boolean
}

function addNodesInBatch(
  graph: Graph,
  fullGraph: Graph,
  nodes: string[],
  startIndex: number,
  count: number
): number {
  const endIndex = Math.min(startIndex + count, nodes.length)
  for (let i = startIndex; i < endIndex; i++) {
    const nodeId = nodes[i]
    if (nodeId && !graph.hasNode(nodeId)) {
      graph.addNode(nodeId, fullGraph.getNodeAttributes(nodeId))
    }
  }
  return endIndex
}

function addEdgesForNodes(
  graph: Graph,
  fullGraph: Graph,
  edges: string[]
): void {
  for (const edgeId of edges) {
    const source = fullGraph.source(edgeId)
    const target = fullGraph.target(edgeId)
    const canAddEdge =
      graph.hasNode(source) &&
      graph.hasNode(target) &&
      !graph.hasEdge(source, target)
    if (canAddEdge) {
      graph.addEdge(source, target, fullGraph.getEdgeAttributes(edgeId))
    }
  }
}

function LoadGraphWithTimelapse({
  graphData,
  isTimelapse,
  timelapseSpeed,
}: {
  graphData: SerializedGraph
  isTimelapse: boolean
  timelapseSpeed: number
}) {
  const loadGraph = useLoadGraph()
  const sigma = useSigma()
  const timelapseRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const currentIndexRef = useRef(0)

  useEffect(() => {
    if (timelapseRef.current) {
      clearInterval(timelapseRef.current)
      timelapseRef.current = null
    }

    const fullGraph = Graph.from(graphData)
    const nodes = fullGraph.nodes()
    const edges = fullGraph.edges()

    if (!isTimelapse) {
      loadGraph(fullGraph)
      currentIndexRef.current = nodes.length
      return
    }

    const partialGraph = new Graph({ type: 'directed', allowSelfLoops: false })
    loadGraph(partialGraph)
    currentIndexRef.current = 0

    timelapseRef.current = setInterval(() => {
      const graph = sigma.getGraph()
      currentIndexRef.current = addNodesInBatch(
        graph,
        fullGraph,
        nodes,
        currentIndexRef.current,
        timelapseSpeed
      )
      addEdgesForNodes(graph, fullGraph, edges)
      sigma.refresh()

      if (currentIndexRef.current >= nodes.length && timelapseRef.current) {
        clearInterval(timelapseRef.current)
        timelapseRef.current = null
      }
    }, 100)

    return () => {
      if (timelapseRef.current) {
        clearInterval(timelapseRef.current)
        timelapseRef.current = null
      }
    }
  }, [loadGraph, sigma, graphData, isTimelapse, timelapseSpeed])

  return null
}

function GraphSettingsController({
  settings,
  darkMode,
}: {
  settings: GraphSettingsValues
  darkMode: boolean
}) {
  const sigma = useSigma()
  const colors = darkMode ? COLORS.dark : COLORS.light

  useEffect(() => {
    sigma.setSetting('labelRenderedSizeThreshold', settings.labelThreshold)
    sigma.setSetting('labelDensity', 0.15)
    sigma.setSetting('labelGridCellSize', 100)
    sigma.setSetting('stagePadding', 50)
    sigma.setSetting('renderLabels', true)
    sigma.setSetting('labelFont', LABEL_FONT)
    sigma.setSetting('labelColor', { color: colors.text })
    sigma.setSetting('defaultNodeColor', colors.node)
    sigma.setSetting('defaultEdgeColor', colors.edge)
  }, [sigma, settings.labelThreshold, colors])

  useEffect(() => {
    const graph = sigma.getGraph()
    graph.forEachEdge((edge) => {
      graph.setEdgeAttribute(edge, 'size', settings.linkThickness)
    })
    sigma.refresh()
  }, [sigma, settings.linkThickness])

  return null
}

export default function GraphView({
  graphData,
  focusNodeId,
  onNodeClick,
  height = '100%',
  darkMode = false,
}: GraphViewProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(
    focusNodeId ?? null
  )
  const [settings, setSettings] = useState<GraphSettingsValues>(DEFAULT_VALUES)
  const [isTimelapseRunning, setIsTimelapseRunning] = useState(false)
  const isForceRunning = true
  const colors = darkMode ? COLORS.dark : COLORS.light

  const handleNodeClick = useCallback(
    (nodeId: string, attrs: { slug?: string }) => {
      setSelectedNode(nodeId)
      if (onNodeClick && attrs.slug) {
        onNodeClick(nodeId, attrs.slug)
      }
    },
    [onNodeClick]
  )

  const handleSearchSelect = useCallback((nodeId: string) => {
    setSelectedNode(nodeId)
  }, [])

  const handleStartTimelapse = useCallback(() => {
    setIsTimelapseRunning(true)
  }, [])

  const handleStopTimelapse = useCallback(() => {
    setIsTimelapseRunning(false)
  }, [])

  const sigmaStyle = useMemo(
    () => ({
      height: typeof height === 'number' ? `${height}px` : height,
      width: '100%',
      background: colors.background,
    }),
    [height, colors.background]
  )

  const sigmaSettings = useMemo(
    () => ({
      allowInvalidContainer: true,
      renderLabels: true,
      labelRenderedSizeThreshold: DEFAULT_VALUES.labelThreshold,
      labelDensity: 0.15,
      labelGridCellSize: 100,
      labelFont: LABEL_FONT,
      labelColor: { color: colors.text },
      defaultNodeColor: colors.node,
      defaultEdgeColor: colors.edge,
      defaultEdgeType: 'line' as const,
      enableEdgeEvents: false,
      zIndex: true,
    }),
    [colors]
  )

  return (
    <div className={styles.graphContainer}>
      <SigmaContainer settings={sigmaSettings} style={sigmaStyle}>
        <LoadGraphWithTimelapse
          graphData={graphData}
          isTimelapse={isTimelapseRunning}
          timelapseSpeed={1}
        />
        <GraphSettingsController darkMode={darkMode} settings={settings} />
        <ForceLayout isRunning={isForceRunning} settings={settings} />
        <GraphEvents
          onNodeClick={handleNodeClick}
          selectedNode={selectedNode}
        />
        <GraphSearch onSelect={handleSearchSelect} />
        <GraphControls selectedNode={selectedNode} />
      </SigmaContainer>
      <GraphSettings
        isTimelapseRunning={isTimelapseRunning}
        onChange={setSettings}
        onStartTimelapse={handleStartTimelapse}
        onStopTimelapse={handleStopTimelapse}
        values={settings}
      />
    </div>
  )
}
