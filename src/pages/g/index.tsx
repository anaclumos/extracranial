import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import { ForceGraph3D } from 'react-force-graph'
import styles from './index.module.css'

const GraphView = () => {
  const N = 300
  const gData = {
    nodes: [...Array.from(Array(N).keys())].map((i) => ({
      id: i,
    })),
    links: [...Array.from(Array(N).keys())]
      .filter((id) => id)
      .map((id) => ({
        source: id,
        target: Math.round(Math.random() * (id - 1)),
      })),
  }

  return (
    <div className={styles.graphView}>
      <div className={styles.graphView__title}>
        <h1>Graph View</h1>
        <ForceGraph3D
          graphData={gData}
          backgroundColor="#1b1b1d"
        />
      </div>
    </div>
  )
}

export default function Graph(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={siteConfig.tagline}
    >
      <main className={styles.mainContainer}>
        <GraphView />
      </main>
    </Layout>
  )
}
