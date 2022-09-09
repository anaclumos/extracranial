import React from 'react'

type Props = {
  children: {
    props: {
      children: string
    }
  }
}

const Index = (props: Props) => {
  const children = props.children.props.children
  const shuffledChildren = React.Children.toArray(
    children
  ).sort(() => 0.5 - Math.random())
  return React.cloneElement(
    props.children as React.ReactElement,
    props.children.props,
    shuffledChildren
  )
}

export default Index
