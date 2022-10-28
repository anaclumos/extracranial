import React, { useEffect, useRef } from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import styles from './index.module.css'
import BrowserOnly from '@docusaurus/BrowserOnly'
import { filenames } from '@site/src/data/filenames'
import { backlinks } from '@site/src/data/backlinks'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import Head from '@docusaurus/Head'
import { useScreenSize } from '@site/src/util/useScreenSize'

type Node = {
  nodeLabel: string
  id: string
  nodeVal: number
}

const processBacklinksToGraph = (backlinks) => {
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
    ) {
      continue
    } else {
      const node = {
        nodeLabel: key,
        id: filenames[key],
        nodeVal: 1,
      } as Node

      if (!nodes.find((n) => n.id === node.id)) {
        nodes.push(node)
      }

      Object.keys(backlinks[key]).forEach((neighbor) => {
        if (
          !nodes.find(
            (node) => node.id === filenames[neighbor]
          )
        ) {
          nodes.push({
            nodeLabel: neighbor,
            id: filenames[neighbor],
            nodeVal: 1,
          })
        }
        links.push({
          source: filenames[key],
          target: filenames[neighbor],
        })
        // increase source and target nodeVal
        nodes.find(
          (n) => n.id === filenames[key]
        ).nodeVal += 1
        nodes.find(
          (n) => n.id === filenames[neighbor]
        ).nodeVal += 1
      })
    }
  }
  return { nodes, links }
}

export const GraphView3d = (props: {
  width: number
  height: number
}) => {
  if (typeof window === 'undefined') {
    return null
  }

  const gData = processBacklinksToGraph(backlinks)

  return (
    <div className={styles.graphView}>
      <BrowserOnly>
        {() => {
          const {
            ForceGraph3D,
          } = require('react-force-graph')

          const FocusGraph = () => {
            const fgRef = useRef<any>()

            useEffect(() => {
              const bloomPass = new UnrealBloomPass()
              bloomPass.strength = 3
              bloomPass.radius = 1
              bloomPass.threshold = 0.1
              fgRef.current
                .postProcessingComposer()
                .addPass(bloomPass)
            }, [])

            return (
              <ForceGraph3D
                rendererConfig={{
                  alpha: true,
                  antialias: true,
                }}
                width={props.width}
                height={props.height}
                ref={fgRef}
                graphData={gData}
                nodeLabel={`nodeLabel`}
                nodeAutoColorBy="group"
                linkDirectionalParticles={2}
                linkDirectionalParticleWidth={1}
                linkDirectionalParticleSpeed={0.01}
                nodeColor={(node) => {
                  // id can be two type
                  // 1. hex sRGB color
                  // 2. date (YYYY-MM-DD)
                  // if it's a date, then return a color #fff
                  if (node.id?.length === 10) {
                    return '#fff'
                  }
                  return `#${node.id}`
                }}
                linkColor={() => '#4976ca'}
                linkOpacity={0.5}
                linkWidth={0.2}
                showNavInfo={false}
                onNodeClick={(node) => {
                  window.location.href = '/r/' + node.id
                }}
              />
            )
          }
          return <FocusGraph />
        }}
      </BrowserOnly>
    </div>
  )
}

export default function Graph(): JSX.Element {
  const [width, height] = useScreenSize()
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title="Hippocampal Neuron Graph"
      description={siteConfig.tagline}
    >
      <Head>
        <title>{'Hippocampal Neuron Graph'}</title>
        <meta
          name="description"
          content={siteConfig.tagline}
        />
        <meta
          property="og:title"
          content={'Hippocampal Neuron Graph'}
        />
        <meta
          property="og:description"
          content={siteConfig.tagline}
        />
        <meta
          property="og:image"
          content={`https://og-image.cho.sh/**${encodeURIComponent(
            'Hippocampal Neuron Graph'
          )}**.png?theme=%235597ec&md=1&fontSize=100px&images=https%3A%2F%2Fcho.sh%2Fimg%2Ffavicon.png`}
        />
      </Head>
      <main className={styles.mainContainer}>
        <GraphView3d width={width} height={height} />
      </main>
    </Layout>
  )
}
