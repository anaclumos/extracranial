'use client'

import { useRegisterEvents, useSigma } from '@react-sigma/core'
import { useCallback, useEffect, useRef, useState } from 'react'

interface GraphEventsProps {
  onNodeClick?: (nodeId: string, attrs: { slug?: string }) => void
  selectedNode?: string | null
}

export default function GraphEvents({
  onNodeClick,
  selectedNode,
}: GraphEventsProps) {
  const sigma = useSigma()
  const registerEvents = useRegisterEvents()
  const graph = sigma.getGraph()
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const cursorModifiedRef = useRef(false)

  const handleClickNode = useCallback(
    (event: { node: string }) => {
      const nodeId = event.node
      const attrs = graph.getNodeAttributes(nodeId)
      if (onNodeClick) {
        onNodeClick(nodeId, { slug: attrs.slug as string | undefined })
      }
    },
    [graph, onNodeClick]
  )

  const handleEnterNode = useCallback((event: { node: string }) => {
    document.body.style.cursor = 'pointer'
    cursorModifiedRef.current = true
    setHoveredNode(event.node)
  }, [])

  const handleLeaveNode = useCallback(() => {
    document.body.style.cursor = 'default'
    cursorModifiedRef.current = false
    setHoveredNode(null)
  }, [])

  // Cleanup cursor on unmount to prevent memory leak
  useEffect(() => {
    return () => {
      if (cursorModifiedRef.current) {
        document.body.style.cursor = 'default'
      }
    }
  }, [])

  useEffect(() => {
    registerEvents({
      clickNode: handleClickNode,
      enterNode: handleEnterNode,
      leaveNode: handleLeaveNode,
    })
  }, [registerEvents, handleClickNode, handleEnterNode, handleLeaveNode])

  useEffect(() => {
    if (selectedNode && graph.hasNode(selectedNode)) {
      const nodePosition = sigma.getNodeDisplayData(selectedNode)
      if (nodePosition) {
        sigma
          .getCamera()
          .animate(
            { x: nodePosition.x, y: nodePosition.y, ratio: 0.5 },
            { duration: 500 }
          )
      }
    }
  }, [sigma, graph, selectedNode])

  useEffect(() => {
    const hasValidHover = hoveredNode && graph.hasNode(hoveredNode)

    if (!hasValidHover) {
      sigma.setSetting('nodeReducer', null)
      sigma.setSetting('edgeReducer', null)
      return
    }

    const neighbors = new Set(graph.neighbors(hoveredNode))
    neighbors.add(hoveredNode)

    sigma.setSetting('nodeReducer', (node, data) => {
      if (neighbors.has(node)) {
        return { ...data, zIndex: 1 }
      }
      return {
        ...data,
        color: '#d1d5db',
        label: '',
        zIndex: 0,
      }
    })

    sigma.setSetting('edgeReducer', (edge, data) => {
      const source = graph.source(edge)
      const target = graph.target(edge)
      const isRelated = source === hoveredNode || target === hoveredNode

      if (isRelated) {
        return {
          ...data,
          color: '#4ade80',
          size: 2,
          zIndex: 1,
        }
      }
      return {
        ...data,
        color: '#e5e7eb',
        zIndex: 0,
      }
    })
  }, [sigma, graph, hoveredNode])

  return null
}
