import BrowserOnly from '@docusaurus/BrowserOnly'
import Head from '@docusaurus/Head'
import { useHistory } from '@docusaurus/router'
import { useColorMode } from '@docusaurus/theme-common'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import backlinks from '@site/src/data/backlinks.json'
import filenames from '@site/src/data/filenames.json'
import {
  type BacklinksData,
  buildGraphData,
  type FilenamesData,
  getGraphStats,
} from '@site/src/utils/graph-data'
import Layout from '@theme/Layout'
import { lazy, Suspense, useCallback, useMemo } from 'react'
import styles from './styles.module.css'

const GraphView = lazy(() => import('@site/src/components/graph-view'))

function GraphContent({ darkMode }: { darkMode: boolean }) {
  const history = useHistory()

  const graphData = useMemo(
    () =>
      buildGraphData(
        backlinks as unknown as BacklinksData,
        filenames as unknown as FilenamesData
      ),
    []
  )

  const stats = useMemo(() => getGraphStats(graphData), [graphData])

  const handleNodeClick = useCallback(
    (_nodeId: string, slug: string) => {
      history.push(slug)
    },
    [history]
  )

  return (
    <>
      <Suspense
        fallback={
          <div aria-live="polite" className={styles.loading} role="status">
            {'Loading graph\u2026'}
          </div>
        }
      >
        <GraphView
          darkMode={darkMode}
          graphData={graphData}
          height="100%"
          onNodeClick={handleNodeClick}
        />
      </Suspense>
      <div className={styles.stats}>
        {stats.nodeCount.toLocaleString()} notes &bull;{' '}
        {stats.edgeCount.toLocaleString()} connections &bull; avg{' '}
        {stats.avgDegree} links/note
      </div>
    </>
  )
}

function GraphPageInner() {
  const { colorMode } = useColorMode()
  const darkMode = colorMode === 'dark'

  return (
    <main className={styles.graphPage}>
      <BrowserOnly
        fallback={
          <div aria-live="polite" className={styles.loading} role="status">
            {'Loading\u2026'}
          </div>
        }
      >
        {() => <GraphContent darkMode={darkMode} />}
      </BrowserOnly>
    </main>
  )
}

export default function GraphPage() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout
      description="Explore the knowledge graph - visualize connections between notes"
      title="Graph View"
    >
      <Head>
        <title>Knowledge Graph @ {siteConfig.title}</title>
        <meta
          content="Explore connections between notes in an interactive graph visualization"
          name="description"
        />
      </Head>
      <GraphPageInner />
    </Layout>
  )
}
