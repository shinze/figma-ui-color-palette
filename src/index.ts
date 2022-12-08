import createPalette from './bridges/createPalette';
import updateScale from './bridges/updateScale';
import updateCaptions from './bridges/updateCaptions';
import updateColors from './bridges/updateColors';
import createLocalStyles from './bridges/createLocalStyles';
import updateLocalStyles from './bridges/updateLocalStyles';
import processSelection from './bridges/processSelection';
import exportJson from './bridges/exportJson';
import exportCss from './bridges/exportCss';
import updateSettings from './bridges/updateSettings';

figma.showUI(__html__, {
  width: 640,
  height: 320,
  title: 'UI Color Palette',
  themeColors: true
});
figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
figma.loadFontAsync({ family: 'Roboto Mono', style: 'Regular' });
figma.loadFontAsync({ family: 'Roboto Mono', style: 'Medium' });

figma.on('run', () => processSelection());
figma.on('selectionchange', () => processSelection());

figma.ui.onmessage = msg => {

  let palette: any,
      i = 0;

  switch (msg.type) {

    case 'create-palette': createPalette(msg, palette); break;

    case 'update-scale': updateScale(msg, palette); break;

    case 'update-captions': updateCaptions(msg, palette); break;

    case 'update-colors': updateColors(msg, palette); break;

    case 'create-local-styles': createLocalStyles(palette, i); break;

    case 'update-local-styles': updateLocalStyles(palette, i); break;

    case 'export-palette':
      msg.export === 'JSON' ? exportJson(msg, palette) : null
      msg.export === 'CSS' ? exportCss(msg, palette) : null
      break;
    
    case 'update-settings':
      updateSettings(msg, palette)

  }

};
