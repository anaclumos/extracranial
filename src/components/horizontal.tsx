import * as React from 'react'

export default function Horizontal({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4 my-6">
      {children}
    </div>
  )
}
