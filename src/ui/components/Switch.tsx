import * as React from 'react'

interface Props {
  id: string
  label: string
  isChecked: boolean
  isDisabled?: boolean
  isBlocked?: boolean
  feature: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export default class Switch extends React.Component<Props> {
  static defaultProps = {
    isDisabled: false,
    isBlocked: false,
  }

  render() {
    return (
      <div
        className={`switch${this.props.isBlocked ? ' switch--blocked' : ''}`}
      >
        <input
          data-feature={this.props.feature}
          id={this.props.id}
          className="switch__toggle"
          type="checkbox"
          checked={this.props.isChecked}
          disabled={this.props.isDisabled}
          onChange={this.props.onChange}
        />
        <label
          className="switch__label"
          htmlFor={this.props.id}
        >
          {this.props.label}
        </label>
      </div>
    )
  }
}
