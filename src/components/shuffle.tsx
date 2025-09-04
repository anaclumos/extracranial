import React from "react"

export default function Shuffle({ children }: { children: React.ReactNode }) {
  const shuffledChildren = React.Children.toArray(children).sort(() => 0.5 - Math.random())
  return <ul>{shuffledChildren}</ul>
}

