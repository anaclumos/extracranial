import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useRef,
} from 'react'

interface ShuffleProps {
  children: ReactNode
}

function shuffleNodes(nodes: ReactNode[]): ReactNode[] {
  const shuffled = [...nodes]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const a = shuffled[i]
    const b = shuffled[j]
    if (a === undefined || b === undefined) {
      continue
    }
    shuffled[i] = b
    shuffled[j] = a
  }
  return shuffled
}

export default function Shuffle({ children }: ShuffleProps) {
  const childArray = Children.toArray(children)
  const listElement =
    childArray.length === 1 && isValidElement(childArray[0])
      ? (childArray[0] as ReactElement)
      : null
  const items = listElement
    ? Children.toArray(listElement.props.children)
    : childArray

  const signatureRef = useRef<string>('')
  const shuffledRef = useRef<ReactNode[]>([])

  const signature = items
    .map((item, index) =>
      isValidElement(item) && item.key != null ? String(item.key) : `i-${index}`
    )
    .join('|')

  if (signatureRef.current !== signature) {
    signatureRef.current = signature
    shuffledRef.current = shuffleNodes(items)
  }

  if (listElement) {
    return cloneElement(listElement, listElement.props, shuffledRef.current)
  }

  return <ul>{shuffledRef.current}</ul>
}
