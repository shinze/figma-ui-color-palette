import * as React from 'react'

interface Props {
  id: string
  label: string
  isChecked: boolean
  isDisabled?: boolean
  isBlocked?: boolean
  feature: string
  group: string
  onChange: React.ChangeEventHandler
}

export default class RadioButton extends React.Component<Props> {
  static defaultProps = {
    isDisabled: false,
    isBlocked: false,
  }

  render() {
    return (
      <div className={`radio${this.props.isBlocked ? ' radio--blocked' : ''}`}>
        <input
          data-feature={this.props.feature}
          id={this.props.id}
          className="radio__button"
          type="radio"
          checked={this.props.isChecked}
          disabled={this.props.isDisabled}
          onChange={this.props.onChange}
          name={this.props.group}
        />
        <label
          className="radio__label"
          htmlFor={this.props.id}
        >
          {this.props.label}
        </label>
      </div>
    )
  }
}
