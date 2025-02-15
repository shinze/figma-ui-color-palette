import type { PaletteData } from '../utils/types'
import LocalVariable from '../canvas/LocalVariable'
import { locals, lang } from '../content/locals'
import { notifications } from '../utils/palettePackage'

const createLocalVariables = (palette: SceneNode, i: number, j: number) => {
  palette = figma.currentPage.selection[0] as FrameNode

  const paletteData: PaletteData = JSON.parse(palette.getPluginData('data')),
    variablesSet: Array<{
      variable: Variable
      colorName: string
      shadeName: string
    }> = []

  if (palette.children.length == 1) {
    i = 0
    j = 0

    const name: string =
        palette.getPluginData('name') === ''
          ? locals[lang].name
          : palette.getPluginData('name'),
      themesList =
        paletteData.themes
          .map((theme) => {
            if (theme.type === 'custom theme')
              return {
                name: theme.name,
                id: theme.modeId,
              }
          })
          .slice(1) ?? [],
      messages: Array<string> = []

    let collection: VariableCollection | undefined = figma.variables
      .getLocalVariableCollections()
      .find((collection) => collection.id === paletteData.collectionId)

    // Create collection
    if (collection == undefined) {
      collection = new LocalVariable().makeCollection(name)
      paletteData.collectionId = collection.id
    }

    const localVariables: Array<Variable> = figma.variables
      .getLocalVariables()
      .filter(
        (localVariable) => localVariable.variableCollectionId === collection?.id
      )

    // Create variables
    paletteData.themes
      .filter((theme) => theme.type === 'default theme')
      .forEach((theme) => {
        theme.colors.forEach((color) => {
          color.shades.forEach((shade) => {
            const boundVariable = localVariables.find(
              (localVariable) => localVariable.id === shade.variableId
            )
            if (boundVariable == undefined) {
              const variable = new LocalVariable(collection).makeVariable(
                `${color.name}/${shade.name}`,
                color.description
              )
              shade.variableId = variable.id
              if (themesList.length == 0 && collection != undefined) {
                variable.setValueForMode(collection.modes[0].modeId, {
                  r: shade.gl[0],
                  g: shade.gl[1],
                  b: shade.gl[2],
                })
                theme.modeId = collection?.modes[0].modeId ?? 'NULL'
                j = 1
              } else
                variablesSet.push({
                  variable: variable,
                  colorName: color.name,
                  shadeName: shade.name,
                })
              i++
            } else
              variablesSet.push({
                variable: boundVariable,
                colorName: color.name,
                shadeName: shade.name,
              })
          })
        })
      })

    // Create modes and set values
    themesList.forEach((themeItem, index) => {
      if (collection != undefined && themeItem != undefined) {
        if (
          collection.modes.find((mode) => mode.modeId === themeItem.id) ==
            undefined &&
          index < 4
        ) {
          if (collection.modes[0].name === 'Mode 1') {
            collection.renameMode(collection.modes[0].modeId, themeItem.name)
            j++
          } else {
            collection.addMode(themeItem.name)
            j++
          }

          const theme = paletteData.themes.find(
            (theme) => theme.name === themeItem.name
          )
          if (theme != undefined)
            theme.modeId =
              collection.modes.find((mode) => mode.name === themeItem.name)
                ?.modeId ?? ''

          variablesSet.forEach((variableSet) => {
            const rightShade = paletteData.themes
              .find((theme) => theme.name === themeItem?.name)
              ?.colors.find((color) => color.name === variableSet.colorName)
              ?.shades.find((shade) => shade.name === variableSet.shadeName)

            if (rightShade != undefined && collection != undefined) {
              rightShade.variableId = variableSet.variable.id
              variableSet.variable.setValueForMode(
                collection.modes.find((mode) => mode.name === themeItem.name)
                  ?.modeId ?? '',
                {
                  r: rightShade.gl[0],
                  g: rightShade.gl[1],
                  b: rightShade.gl[2],
                }
              )
            }
          })
        }
      }
    })

    palette.setPluginData('data', JSON.stringify(paletteData))

    if (i > 1) messages.push(`${i} ${locals[lang].info.localVariables}`)
    else messages.push(`${i} ${locals[lang].info.localVariable}`)

    if (j > 1) messages.push(`${j} ${locals[lang].info.variableModes}`)
    else messages.push(`${j} ${locals[lang].info.variableMode}`)

    notifications.push(`${messages.join(', ')} created`)

    if (themesList.length > 4)
      figma.notify(locals[lang].warning.tooManyThemesToCreateModes)
  } else
    notifications
      .splice(0, notifications.length)
      .push(locals[lang].error.corruption)
}

export default createLocalVariables
