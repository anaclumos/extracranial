import type { ReactNode } from 'react'

interface DisplayFlexProps {
  children: ReactNode
}

export default function DisplayFlex({ children }: DisplayFlexProps) {
  return (
    <figure>
      <div className="scrollbar-none my-2 flex gap-4 overflow-x-scroll">
        {children}
      </div>
    </figure>
  )
}
