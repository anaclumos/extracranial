'use client'

import { useSigma } from '@react-sigma/core'
import FA2Layout from 'graphology-layout-forceatlas2/worker'
import { useEffect, useRef } from 'react'
import type { GraphSettingsValues } from './GraphSettings'

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
  const settingsRef = useRef(settings)

  settingsRef.current = settings

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
      settings: getFA2Settings(settingsRef.current),
    })

    layoutRef.current.start()

    return () => {
      if (layoutRef.current) {
        layoutRef.current.kill()
        layoutRef.current = null
      }
    }
  }, [sigma, isRunning])

  useEffect(() => {
    if (layoutRef.current && isRunning) {
      layoutRef.current.kill()

      const graph = sigma.getGraph()
      layoutRef.current = new FA2Layout(graph, {
        settings: getFA2Settings(settings),
      })

      layoutRef.current.start()
    }
  }, [sigma, settings, isRunning])

  return null
}
