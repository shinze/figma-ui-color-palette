import type { ActionsList } from './utils/types'
import processSelection from './bridges/processSelection'
import checkHighlightStatus from './bridges/checkHighlightStatus'
import checkEditorType from './bridges/checkEditorType'
import checkPlanStatus from './bridges/checkPlanStatus'
import closeHighlight from './bridges/closeHighlight'
import createPalette from './bridges/createPalette'
import updateScale from './bridges/updateScale'
import updateColors from './bridges/updateColors'
import updateThemes from './bridges/updateThemes'
import updateView from './bridges/updateView'
import createLocalStyles from './bridges/createLocalStyles'
import updateLocalStyles from './bridges/updateLocalStyles'
import createLocalVariables from './bridges/createLocalVariables'
import updateLocalVariables from './bridges/updateLocalVariables'
import exportJson from './bridges/exportJson'
import exportJsonAmznStyleDictionary from './bridges/exportJsonAmznStyleDictionary'
import exportJsonTokensStudio from './bridges/exportJsonTokensStudio'
import exportCss from './bridges/exportCss'
import exportSwift from './bridges/exportSwift'
import exportXml from './bridges/exportXml'
import exportCsv from './bridges/exportCsv'
import updateSettings from './bridges/updateSettings'
import getProPlan from './bridges/getProPlan'
import enableTrial from './bridges/enableTrial'
import package_json from './../package.json'
import { locals, lang } from './content/locals'
import { notifications } from './utils/palettePackage'

figma.showUI(__html__, {
  width: 640,
  height: 320,
  title: locals[lang].name,
  themeColors: true,
})
figma.loadFontAsync({ family: 'Inter', style: 'Regular' })
figma.loadFontAsync({ family: 'Inter', style: 'Medium' })
figma.loadFontAsync({ family: 'Red Hat Mono', style: 'Medium' })

figma.on('run', () => processSelection())
figma.on('selectionchange', () => processSelection())

figma.on('run', () => checkEditorType())

figma.on('run', () => checkHighlightStatus(package_json.version))

figma.on('run', async () => await checkPlanStatus())
figma.on('selectionchange', async () => await checkPlanStatus())

figma.ui.onmessage = async (msg) => {
  let palette: SceneNode
  const i = 0,
    j = 0

  const actions: ActionsList = {
    CLOSE_HIGHLIGHT: () => closeHighlight(msg),
    CREATE_PALETTE: () => createPalette(msg, palette),
    UPDATE_SCALE: () => updateScale(msg, palette),
    UPDATE_VIEW: () => updateView(msg, palette),
    UPDATE_COLORS: () => updateColors(msg, palette),
    UPDATE_THEMES: () => updateThemes(msg, palette),
    SYNC_LOCAL_STYLES: () => {
      notifications.splice(0, notifications.length)
      createLocalStyles(palette, i)
      updateLocalStyles(palette, i)
      figma.notify(notifications.join('﹒'))
    },
    SYNC_LOCAL_VARIABLES: () => {
      notifications.splice(0, notifications.length)
      createLocalVariables(palette, i, j)
      updateLocalVariables(palette, i, j)
      figma.notify(notifications.join('﹒'))
    },
    EXPORT_PALETTE: () => {
      msg.export === 'JSON' ? exportJson(palette) : null
      msg.export === 'JSON_AMZN_STYLE_DICTIONARY'
        ? exportJsonAmznStyleDictionary(palette)
        : null
      msg.export === 'JSON_TOKENS_STUDIO'
        ? exportJsonTokensStudio(palette)
        : null
      msg.export === 'CSS' ? exportCss(palette) : null
      msg.export === 'SWIFT' ? exportSwift(palette) : null
      msg.export === 'XML' ? exportXml(palette) : null
      msg.export === 'CSV' ? exportCsv(palette) : null
    },
    UPDATE_SETTINGS: () => updateSettings(msg, palette),
    GET_PRO_PLAN: async () => await getProPlan(),
    ENABLE_TRIAL: async () => await enableTrial(),
  }

  return actions[msg.type]?.()
}
