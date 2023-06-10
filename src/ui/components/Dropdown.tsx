import * as React from 'react'

interface Props {
  id: string
  options: Array<{
    label: string
    value: string
    position: number
    isActive?: boolean
    isBlocked?: boolean
  }>
  selected: string
  onChange: React.ChangeEventHandler
}

export default class Dropdown extends React.Component<Props> {
  selectMenuRef: any
  listRef: any

  constructor(props) {
    super(props)
    this.state = {
      isListOpen: false,
      position: this.props.options.filter(option => option.value === this.props.selected)[0].position
    },
    this.selectMenuRef = React.createRef()
    this.listRef = React.createRef()
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount = () =>
    document.addEventListener("mousedown", this.handleClickOutside)

  componentWillUnmount = () =>
    document.removeEventListener("mousedown", this.handleClickOutside)

  handleClickOutside(event) {
    if (this.selectMenuRef && !this.selectMenuRef.current.contains(event.target))
      this.setState({
        isListOpen: false
      })
  }

  onOpenList = () => {
    this.setState({
      isListOpen: true
    })
    setTimeout(() => {
      if (this.listRef.current.getBoundingClientRect().top < 40)
        this.listRef.current.style.top = '-6px'
    }, 1)
  }

  onSelectItem = (e) => {
    this.setState({
      isListOpen: false,
      position: e.target.dataset.position
    })
    this.props.onChange(e)
  }

  render() {
    return (
      <div className="select-menu" ref={this.selectMenuRef}>
        <button className={`select-menu__button ${this.state['isListOpen'] ? 'select-menu__button--active' : ''}`} onMouseDown={this.onOpenList}>
          <span className="select-menu__label">
            {this.props.options.filter(option => option.value === this.props.selected)[0].label}
          </span>
          <span className="select-menu__caret"></span>
        </button>
        {this.state['isListOpen'] ?
          <ul
            className="select-menu__menu select-menu__menu--active"
            style={{ top: `${this.state['position'] * -24 - 6}px` }}
            ref={this.listRef}
          >
            {this.props.options.map((option, index) =>
              option.isActive ? (<li
                key={index}
                className={`select-menu__item ${option.value === this.props.selected ? 'select-menu__item--selected' : ''} ${option.isBlocked ? 'select-menu__item--blocked' : ''}`}
                data-value={option.value}
                data-position={option.position}
                data-is-blocked={option.isBlocked}
                onMouseDown={this.onSelectItem}
              >
                <span className="select-menu__item-icon"></span>
                <span className="select-menu__item-label">{option.label}</span>
              </li>) : null
            )}
          </ul> :
          null
        }      
      </div>
    )
  }
}
