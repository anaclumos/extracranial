import { Children, type ReactNode } from 'react'

interface ShuffleProps {
  children: {
    props: {
      children: ReactNode
    }
  }
}

export default function Shuffle({ children }: ShuffleProps) {
  const items = children.props.children
  const shuffledItems = Children.toArray(items).sort(() => 0.5 - Math.random())
  return <ul>{shuffledItems}</ul>
}
