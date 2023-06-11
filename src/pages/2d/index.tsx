import React from 'react'
import { backlinks } from '@site/src/data/backlinks'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import styles from './index.module.css'
import BrowserOnly from '@docusaurus/BrowserOnly'
import Head from '@docusaurus/Head'
import { useScreenSize } from '@site/src/util/useScreenSize'
import { processBacklinksToGraph } from '@site/src/util/graph'

export const GraphView2d = (props: { width: number; height: number }) => {
  if (typeof window === 'undefined') {
    return null
  }

  const gData = processBacklinksToGraph(backlinks, true)

  return (
    <div className={styles.graphView}>
      <BrowserOnly>
        {() => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const { ForceGraph2D } = require('react-force-graph')
          return (
            <ForceGraph2D
              rendererConfig={{
                alpha: true,
                antialias: true,
              }}
              width={props.width}
              height={props.height}
              graphData={gData}
              nodeLabel={`nodeLabel`}
              nodeAutoColorBy="group"
              nodeVal={(node) => {
                return Math.sqrt(node.nodeRelSize)
              }}
              linkDirectionalParticles={2}
              linkDirectionalParticleWidth={1}
              linkDirectionalParticleSpeed={0.01}
              nodeColor={(node) => {
                if (node.id?.length === 10) {
                  return '#fff'
                }
                return `#${node.id}`
              }}
              linkColor={() => '#4976ca'}
              linkOpacity={0.3}
              linkWidth={0.3}
              showNavInfo={false}
              onNodeClick={(node) => {
                window.location.href = '/r/' + node.id
              }}
            />
          )
        }}
      </BrowserOnly>
    </div>
  )
}

export default function Graph(): JSX.Element {
  const [width, height] = useScreenSize()
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title="Hippocampal Neuron Graph" description={siteConfig.tagline}>
      <Head>
        <title>{'Hippocampal Neuron Graph'}</title>
        <meta name="description" content={siteConfig.tagline} />
        <meta property="og:title" content={'Hippocampal Neuron Graph'} />
        <meta property="og:description" content={siteConfig.tagline} />
        <meta
          property="og:image"
          content={`https://og.cho.sh/api/og?title=${encodeURIComponent(
            'Hippocampal Neuron Graph'
          )}&subheading=${encodeURIComponent(siteConfig.tagline)}`}
        />
      </Head>
      <main className={styles.mainContainer}>
        <GraphView2d width={width} height={height} />
      </main>
    </Layout>
  )
}
