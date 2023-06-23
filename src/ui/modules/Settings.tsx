import * as React from 'react'
import type { TextColorsThemeHexModel } from '../../utils/types'
import FormItem from './../components/FormItem'
import Input from './../components/Input'
import Switch from '../components/Switch'
import Message from '../components/Message'
import Feature from '../components/Feature'
import Shortcuts from './Shortcuts'
import Actions from './Actions'
import features from '../../utils/features'
import isBlocked from '../../utils/isBlocked'
import { locals } from '../../content/locals'

interface Props {
  paletteName: string
  textColorsTheme?: TextColorsThemeHexModel
  settings?: Array<string>
  context: string
  view: string
  isNewAlgorithm?: boolean
  planStatus: string
  editorType?: string
  lang: string
  onChangeSettings: React.ReactEventHandler
  onCreatePalette?: () => void
  onCreateLocalStyles?: () => void
  onUpdateLocalStyles?: () => void
  onChangeView: React.ChangeEventHandler
  onReopenHighlight: React.ChangeEventHandler
}

export default class Settings extends React.Component<Props> {
  // Templates
  Base = () => {
    return (
      <div className="settings__group">
        <div className="section-controls">
          <div className="section-controls__left-part">
            <div className="section-title">{locals[this.props.lang].settings.base.title}</div>
          </div>
        </div>
        <Feature
          isActive={
            features.find((feature) => feature.name === 'SETTINGS_PALETTE_NAME')
              .isActive
          }
        >
          <div className="settings__item">
            <FormItem
              label={locals[this.props.lang].settings.base.name}
              id="rename-palette"
              isBlocked={isBlocked(
                'SETTINGS_PALETTE_NAME',
                this.props.planStatus
              )}
            >
              <Input
                id="rename-palette"
                type="text"
                icon={{ type: 'none', value: null }}
                placeholder={locals[this.props.lang].settings.base.defaultName}
                value={
                  this.props.paletteName != '' ? this.props.paletteName : ''
                }
                charactersLimit={64}
                isBlocked={isBlocked(
                  'SETTINGS_PALETTE_NAME',
                  this.props.planStatus
                )}
                feature="RENAME_PALETTE"
                onChange={
                  isBlocked('SETTINGS_PALETTE_NAME', this.props.planStatus)
                    ? () => null
                    : this.props.onChangeSettings
                }
                onFocus={
                  isBlocked('SETTINGS_PALETTE_NAME', this.props.planStatus)
                    ? () => null
                    : this.props.onChangeSettings
                }
                onBlur={
                  isBlocked('SETTINGS_PALETTE_NAME', this.props.planStatus)
                    ? () => null
                    : this.props.onChangeSettings
                }
                onConfirm={
                  isBlocked('SETTINGS_PALETTE_NAME', this.props.planStatus)
                    ? () => null
                    : this.props.onChangeSettings
                }
              />
            </FormItem>
          </div>
        </Feature>
      </div>
    )
  }

  ContrastManagement = () => {
    return (
      <div className="settings__group">
        <div className="section-controls">
          <div className="section-controls__left-part">
            <div className="section-title">
              {locals[this.props.lang].settings.contrast.title}
            </div>
          </div>
        </div>
        <Feature
          isActive={
            features.find(
              (feature) => feature.name === 'SETTINGS_TEXT_COLORS_THEME'
            ).isActive
          }
        >
          <div className="settings__item">
            <FormItem
              label={locals[this.props.lang].settings.contrast.textLightColor}
              id="change-text-light-color"
              isBlocked={isBlocked(
                'SETTINGS_TEXT_COLORS_THEME',
                this.props.planStatus
              )}
            >
              <Input
                id="change-text-light-color"
                type="color"
                icon={{ type: 'none', value: null }}
                value={this.props.textColorsTheme.lightColor}
                isBlocked={isBlocked(
                  'SETTINGS_TEXT_COLORS_THEME',
                  this.props.planStatus
                )}
                feature="CHANGE_TEXT_LIGHT_COLOR"
                onChange={
                  isBlocked('SETTINGS_TEXT_COLORS_THEME', this.props.planStatus)
                    ? () => null
                    : this.props.onChangeSettings
                }
                onFocus={
                  isBlocked('SETTINGS_TEXT_COLORS_THEME', this.props.planStatus)
                    ? () => null
                    : this.props.onChangeSettings
                }
                onBlur={
                  isBlocked('SETTINGS_TEXT_COLORS_THEME', this.props.planStatus)
                    ? () => null
                    : this.props.onChangeSettings
                }
              />
            </FormItem>
            <FormItem
              label={locals[this.props.lang].settings.contrast.textDarkColor}
              id="change-text-dark-color"
              isBlocked={isBlocked(
                'SETTINGS_TEXT_COLORS_THEME',
                this.props.planStatus
              )}
            >
              <Input
                id="change-text-dark-color"
                type="color"
                icon={{ type: 'none', value: null }}
                value={this.props.textColorsTheme.darkColor}
                isBlocked={isBlocked(
                  'SETTINGS_TEXT_COLORS_THEME',
                  this.props.planStatus
                )}
                feature="CHANGE_TEXT_DARK_COLOR"
                onChange={
                  isBlocked('SETTINGS_TEXT_COLORS_THEME', this.props.planStatus)
                    ? () => null
                    : this.props.onChangeSettings
                }
                onFocus={
                  isBlocked('SETTINGS_TEXT_COLORS_THEME', this.props.planStatus)
                    ? () => null
                    : this.props.onChangeSettings
                }
                onBlur={
                  isBlocked('SETTINGS_TEXT_COLORS_THEME', this.props.planStatus)
                    ? () => null
                    : this.props.onChangeSettings
                }
              />
            </FormItem>
            <Message
              icon="library"
              messages={[
                locals[this.props.lang].settings.contrast.textThemeColorsDescription,
              ]}
              isBlocked={isBlocked(
                'SETTINGS_NEW_ALGORITHM',
                this.props.planStatus
              )}
            />
          </div>
        </Feature>
      </div>
    )
  }

  ColorManagement = () => {
    return (
      <div className="settings__group">
        <div className="section-controls">
          <div className="section-controls__left-part">
            <div className="section-title">
              {locals[this.props.lang].settings.color.title}
            </div>
          </div>
        </div>
        <Feature
          isActive={
            features.find(
              (feature) => feature.name === 'SETTINGS_NEW_ALGORITHM'
            ).isActive
          }
        >
          <div className="settings__item">
            <Switch
              id="update-algorithm"
              label={locals[this.props.lang].settings.color.newAlgorithm}
              isChecked={this.props.isNewAlgorithm}
              isBlocked={isBlocked(
                'SETTINGS_NEW_ALGORITHM',
                this.props.planStatus
              )}
              feature="UPDATE_ALGORITHM_VERSION"
              onChange={
                isBlocked('SETTINGS_NEW_ALGORITHM', this.props.planStatus)
                  ? () => null
                  : this.props.onChangeSettings
              }
            />
            <Message
              icon="library"
              messages={[locals[this.props.lang].settings.color.newAlgorithmDescription]}
              isBlocked={isBlocked(
                'SETTINGS_NEW_ALGORITHM',
                this.props.planStatus
              )}
            />
          </div>
        </Feature>
      </div>
    )
  }

  render() {
    return (
      <>
        <div className="settings controls__control">
          {this.props.settings.includes('BASE') ? <this.Base /> : null}
          {this.props.settings.includes('CONTRAST_MANAGEMENT') ? (
            <this.ContrastManagement />
          ) : null}
          {this.props.settings.includes('COLOR_MANAGEMENT') ? (
            <this.ColorManagement />
          ) : null}
        </div>
        {this.props.context === 'CREATE' ? (
          <Actions
            context="CREATE"
            view={this.props.view}
            planStatus={this.props.planStatus}
            lang={this.props.lang}
            onCreatePalette={this.props.onCreatePalette}
            onChangeView={this.props.onChangeView}
          />
        ) : (
          <Actions
            context="EDIT"
            view={this.props.view}
            editorType={this.props.editorType}
            planStatus={this.props.planStatus}
            lang={this.props.lang}
            onCreateLocalStyles={this.props.onCreateLocalStyles}
            onUpdateLocalStyles={this.props.onUpdateLocalStyles}
            onChangeView={this.props.onChangeView}
          />
        )}
        <Feature
          isActive={
            features.find((feature) => feature.name === 'SHORTCUTS').isActive
          }
        >
          <Shortcuts
            actions={[
              {
                label: locals[this.props.lang].shortcuts.documentation,
                isLink: true,
                url: 'https://docs.ui-color-palette.com',
                action: null,
              },
              {
                label: locals[this.props.lang].shortcuts.feedback,
                isLink: true,
                url: 'https://uicp.link/feedback',
                action: null,
              },
              {
                label: locals[this.props.lang].shortcuts.news,
                isLink: false,
                url: '',
                action: this.props.onReopenHighlight,
              },
            ]}
            planStatus={this.props.planStatus}
            lang={this.props.lang}
          />
        </Feature>
      </>
    )
  }
}
