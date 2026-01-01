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
  // This supposes that we only use unordered lists
  // If we shuffle something, they wouldn't have any 'order' right?
  return <ul>{shuffledItems}</ul>
}
