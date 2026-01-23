'use client'

import { useSigma } from '@react-sigma/core'
import FA2Layout from 'graphology-layout-forceatlas2/worker'
import { useEffect, useRef } from 'react'
import type { GraphSettingsValues } from './graph-settings'

interface ForceLayoutProps {
  settings: GraphSettingsValues
  isRunning: boolean
}

function getFA2Settings(settings: GraphSettingsValues) {
  return {
    gravity: settings.centerForce,
    scalingRatio: settings.repelForce,
    strongGravityMode: false,
    slowDown: 0.1,
    barnesHutOptimize: true,
    barnesHutTheta: 0.3,
    adjustSizes: true,
    linLogMode: false,
    outboundAttractionDistribution: true,
    edgeWeightInfluence: settings.linkForce,
  }
}

export default function ForceLayout({ settings, isRunning }: ForceLayoutProps) {
  const sigma = useSigma()
  const layoutRef = useRef<FA2Layout | null>(null)

  useEffect(() => {
    if (layoutRef.current) {
      layoutRef.current.kill()
      layoutRef.current = null
    }

    if (!isRunning) {
      return
    }

    const graph = sigma.getGraph()
    if (graph.order === 0) {
      return
    }

    layoutRef.current = new FA2Layout(graph, {
      settings: getFA2Settings(settings),
    })

    layoutRef.current.start()

    return () => {
      if (layoutRef.current) {
        layoutRef.current.kill()
        layoutRef.current = null
      }
    }
  }, [sigma, isRunning, settings])

  return null
}
