import React from 'react'
import { filenames } from '@site/src/data/filenames'
import { backlinks } from '@site/src/data/backlinks'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import styles from './index.module.css'
import BrowserOnly from '@docusaurus/BrowserOnly'
import Head from '@docusaurus/Head'
import { useScreenSize } from '@site/src/util/useScreenSize'

type Node = {
  nodeLabel: string
  id: string
  nodeVal: number
}

const font =
  'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", Pretendard, system-ui, -system-ui, sans-serif, "Apple Color Emoji"'

const processBacklinksToGraph = (backlinks) => {
  const nodes: Node[] = []
  const links: { source: string; target: string }[] = []
  for (const key in backlinks) {
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

export const GraphView2d = (props: {
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
            ForceGraph2D,
          } = require('react-force-graph')
          return (
            <ForceGraph2D
              width={props.width}
              height={props.height}
              graphData={gData}
              nodeLabel={(node) => {
                return node.nodeLabel
              }}
              linkDirectionalParticles={2}
              linkDirectionalParticleWidth={1}
              linkDirectionalParticleSpeed={0.01}
              nodeColor={() => '#aaa'}
              linkDirectionalParticleColor={() => '#64a5f0'}
              linkColor={() => '#4976ca'}
              linkOpacity={0.5}
              linkWidth={0.2}
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
        <GraphView2d width={width} height={height} />
      </main>
    </Layout>
  )
}
