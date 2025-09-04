import * as React from 'react'

export default function Horizontal({ children }: { children: React.ReactNode }) {
  // Flatten common Markdown wrappers so images become siblings
  const items = React.Children.toArray(children)
    // Remove falsy and whitespace-only text nodes
    .filter((child) => {
      if (!child) return false
      if (typeof child === 'string') return child.trim().length > 0
      return true
    })
    // Flatten common Markdown wrappers so the media become siblings
    .flatMap((child) => {
      if (
        React.isValidElement(child) &&
        typeof child.type === 'string' &&
        (child.type === 'p' || child.type === 'figure')
      ) {
        return React.Children.toArray(child.props.children).filter((inner) =>
          typeof inner === 'string' ? inner.trim().length > 0 : true
        )
      }
      return [child]
    })

  return (
    // Bleed out of prose to full container width
    <div className="not-prose my-6 -mx-[calc(50vw-50%)]">
      <div className="mx-auto w-full max-w-fd-container px-4 md:px-8">
        <div className="flex md:grid md:grid-cols-3 items-start gap-0 md:gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none">
          {items.map((child, i) => (
            <div
              key={i}
              className="shrink-0 min-w-full snap-start snap-always md:min-w-0 md:w-auto md:snap-normal [&_img]:w-full [&_img]:h-auto [&>[data-rmiz]]:block"
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
