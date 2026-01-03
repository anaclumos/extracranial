import BentoLanding from '@site/src/components/bento'
import Layout from '@theme/Layout'

export default function Home(): React.ReactElement {
  return (
    <Layout
      description="Building the exosuit for my brain. Personal wiki, digital garden, second brain — everything I know."
      title="Sunghyun Cho"
    >
      <BentoLanding />
    </Layout>
  )
}
