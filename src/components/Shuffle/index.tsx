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
  const shuffledChildren = React.Children.toArray(children).sort(() => 0.5 - Math.random())
  // this supposes that we only use unordered lists
  // I mean... if we shuffle something, they wouldn't have any 'order' right?
  return <ul>{shuffledChildren}</ul>
}

export default Index
