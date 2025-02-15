import Palette from './../canvas/Palette'

const createPalette = (msg: any, palette: SceneNode) => {
  const scene: SceneNode[] = []

  palette = new Palette(
    msg.data.name,
    msg.data.description,
    msg.data.preset,
    msg.data.scale,
    msg.data.colorSpace,
    msg.data.view,
    msg.data.textColorsTheme,
    'v2'
  ).makeNode()

  if (palette.children.length != 0) {
    figma.currentPage.appendChild(palette)
    scene.push(palette)
    palette.x = figma.viewport.center.x - palette.width / 2
    palette.y = figma.viewport.center.y - palette.height / 2
    figma.currentPage.selection = scene
    figma.viewport.scrollAndZoomIntoView(scene)
  } else palette.remove()
}

export default createPalette
