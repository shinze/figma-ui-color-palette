import * as React from 'react'

interface Props {
  rightPart?: React.ReactElement
  leftPart?: React.ReactElement
  border: Array<string>
  isCompact?: boolean
  isOnlyText?: boolean
}

export default class Bar extends React.Component<Props> {
  static defaultProps = {
    isCompact: false,
    isOnlyText: false
  }

  setBorder = (orientation: Array<string>) => {
    const property: string = '1px solid var(--figma-color-border)',
    style = {}

    orientation.forEach(entry => {
      if (entry === 'TOP')
        style['borderTop'] = property
      if (entry === 'LEFT')
        style['borderLeft'] = property
      if (entry === 'BOTTOM')
        style['borderBottom'] = property
      if (entry === 'RIGHT')
        style['borderRight'] = property
    })
    return style
  }

  render() {
    return (
      <div
        className={`bar${this.props.isCompact ? ' bar--compact' : ''}${this.props.isOnlyText ? ' bar--text-only' : ''}`}
        style={this.setBorder(this.props.border)}
      >
        <div className="bar__left">
          {this.props.leftPart}
        </div>
        <div className="bar__right">
          {this.props.rightPart}
        </div>
      </div>
    )
  }
}
