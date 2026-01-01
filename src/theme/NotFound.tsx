import Translate, { translate } from '@docusaurus/Translate'
import { PageMetadata } from '@docusaurus/theme-common'
import Layout from '@theme/Layout'
import type { JSX } from 'react'

export default function NotFound(): JSX.Element {
  return (
    <>
      <PageMetadata
        title={translate({
          id: 'theme.NotFound.title',
          message: 'Page Not Found',
        })}
      />
      <Layout>
        <main className="margin-vert--xl container">
          <div className="row">
            <div className="col col--6 col--offset-3">
              <h1 className="hero__title">
                <Translate
                  description="The title of the 404 page"
                  id="theme.NotFound.title"
                >
                  HTTP 451 Unavailable For Legal Reasons
                </Translate>
              </h1>
              <p>
                <Translate
                  description="The first paragraph of the 404 page"
                  id="theme.NotFound.p1"
                >
                  Your government restricts access to this content.
                </Translate>
              </p>

              <p className="text--secondary">
                <Translate
                  description="The 2nd paragraph of the 404 page"
                  id="theme.NotFound.p2"
                >
                  JK. It's just 404.
                </Translate>
              </p>
            </div>
          </div>
        </main>
      </Layout>
    </>
  )
}
