import React, { JSX } from 'react'
import Translate, { translate } from '@docusaurus/Translate'
import { PageMetadata } from '@docusaurus/theme-common'
import Layout from '@theme/Layout'

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
        <main className="container margin-vert--xl">
          <div className="row">
            <div className="col col--6 col--offset-3">
              <h1 className="hero__title">
                <Translate id="theme.NotFound.title" description="The title of the 404 page">
                  HTTP 451 Unavailable For Legal Reasons
                </Translate>
              </h1>
              <p>
                <Translate id="theme.NotFound.p1" description="The first paragraph of the 404 page">
                  Your government restricts access to this content.
                </Translate>
              </p>

              <p className="text--secondary">
                <Translate id="theme.NotFound.p2" description="The 2nd paragraph of the 404 page">
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
