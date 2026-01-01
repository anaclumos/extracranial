import Link from '@docusaurus/Link'
import { translate } from '@docusaurus/Translate'
import backlinks from '@site/src/data/backlinks.json'
import filenames from '@site/src/data/filenames.json'

interface BacklinkProps {
  documentTitle: string
}

type BacklinksData = Record<string, Record<string, string>>
type FilenamesData = Record<string, string>

const typedBacklinks = backlinks as BacklinksData
const typedFilenames = filenames as FilenamesData

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function processBacklinkItem(text: string, title: string) {
  const escapedText = text
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

  const normalizedTitle = title.normalize('NFC')
  let normalizedText = escapedText.normalize('NFC')
  const escapedTitle = escapeRegExp(normalizedTitle)

  try {
    const regex1 = new RegExp(`\\[\\[${escapedTitle}\\|(.+?)\\]\\]`, 'gi')
    normalizedText = normalizedText.replace(
      regex1,
      '<b class="text-emphasis-strong">$1</b>'
    )

    const regex2 = new RegExp(`\\[\\[${escapedTitle}\\]\\]`, 'gi')
    normalizedText = normalizedText.replace(
      regex2,
      `<b class="text-emphasis-strong">${normalizedTitle}</b>`
    )

    const regex3 = /\[\[(.+?)\|(.+?)\]\]/g
    normalizedText = normalizedText.replace(regex3, '$2')

    const regex4 = /\[\[(.+?)\]\]/g
    normalizedText = normalizedText.replace(regex4, '$1')
  } catch (e) {
    console.error('Error processing backlink item:', e)
  }

  return (
    <pre
      className="m-0 whitespace-pre-wrap font-sans text-muted text-sm"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for rendering highlighted backlinks
      dangerouslySetInnerHTML={{
        __html: normalizedText.trim(),
      }}
    />
  )
}

export default function Backlink({ documentTitle }: BacklinkProps) {
  const documentTitleEncoded = documentTitle.normalize('NFC')
  const backlinkItems = typedBacklinks[documentTitleEncoded]
  const title = documentTitleEncoded

  return (
    <div className="mt-4 w-full rounded-lg border-2 border-menu-active p-4">
      <h3 className="text-emphasis-subtle text-sm">
        {translate({
          id: 'backlink.title',
          message: 'Links to This Note',
          description: 'The title of the backlink section',
        })}
      </h3>
      <div className="card-grid mx-auto my-4">
        {(backlinkItems &&
          Object.keys(backlinkItems)
            .sort()
            .reverse()
            .map((backlink) => {
              const backlinkTitle = backlink.normalize('NFC')
              const filenameEntry = typedFilenames[backlinkTitle]
              if (!filenameEntry) {
                console.warn(`Backlink title not found: ${backlinkTitle}`)
                return null
              }
              const link = filenameEntry.replace('/', '')
              const backlinkContent = backlinkItems[backlink]
              if (!backlinkContent) {
                return null
              }
              return (
                <Link className="hover:no-underline" key={backlink} to={link}>
                  <div className="rounded-theme transition-colors duration-200 hover:bg-menu-active">
                    <h3 className="m-0 p-1 pb-2 text-base">{backlinkTitle}</h3>
                    {processBacklinkItem(backlinkContent, title)}
                  </div>
                </Link>
              )
            })) || (
          <p className="text-muted text-sm">
            {translate({
              id: 'backlink.noBacklink',
              message: 'Nothing here yet...',
              description: 'The message when there is no backlink',
            })}
          </p>
        )}
      </div>
    </div>
  )
}
