import React, { useEffect, useRef } from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import styles from './index.module.css'
import BrowserOnly from '@docusaurus/BrowserOnly'
import { backlinks } from '@site/src/data/backlinks'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import Head from '@docusaurus/Head'
import { useScreenSize } from '@site/src/util/useScreenSize'
import { processBacklinksToGraph } from '@site/src/util/graph'

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
              bloomPass.strength = 0.8
              bloomPass.radius = 0.8
              bloomPass.threshold = 0.25
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
                nodeVal={(node) => {
                  return Math.sqrt(node.nodeRelSize)
                }}
                linkDirectionalParticles={2}
                linkDirectionalParticleWidth={2}
                linkDirectionalParticleSpeed={0.01}
                nodeColor={(node) => {
                  if (node.id?.length === 10) {
                    return '#fff'
                  }
                  return `#${node.id}`
                }}
                linkColor={() => '#4976ca'}
                linkOpacity={0.5}
                linkWidth={1}
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
