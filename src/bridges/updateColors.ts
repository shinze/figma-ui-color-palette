import Colors from './../canvas/Colors';

const updateColors = (msg, palette) => {

  palette = figma.currentPage.selection[0];
  
  if (palette.children.length == 1) {
    const paletteName: string = palette.getPluginData('name') === '' ? 'UI Color Palette' : palette.getPluginData('name'),
          scale: string = JSON.parse(palette.getPluginData('scale')),
          captions: boolean = palette.getPluginData('captions') == 'hasCaptions' ? true : false,
          preset = JSON.parse(palette.getPluginData('preset'));
    
    let colors: string; 

    palette.setPluginData('colors', JSON.stringify(msg.data));
    colors = JSON.parse(palette.getPluginData('colors'));

    palette.children[0].remove();
    palette.appendChild(new Colors({
      paletteName: paletteName,
      colors: colors,
      scale: scale,
      captions: captions,
      preset: preset
    }).makeNode());

    // palette migration
    palette.counterAxisSizingMode = 'AUTO';
    palette.name = `${paletteName}﹒${preset.name}`
  } else
    figma.notify('Your UI Color Palette seems corrupted. Do not edit any layer within it.')


};

export default updateColors
