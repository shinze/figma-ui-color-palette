import chroma from 'chroma-js';
import Sample from './Sample';

export default class Colors {

  captions: boolean;
  parent: any;
  node: FrameNode;

  constructor(parent) {
    this.parent = parent;
    this.node = figma.createFrame()
  }

  makeNode() {
    this.node.layoutMode = 'VERTICAL';
    this.node.primaryAxisSizingMode = 'AUTO';
    this.node.counterAxisSizingMode = 'AUTO';
    this.node.name = 'colors (do not edit any layer)';
    this.node.locked = true;

    this.parent.colors.forEach(color => {

      const row = figma.createFrame();
      row.layoutMode = 'HORIZONTAL';
      row.resize(100, 160);
      row.counterAxisSizingMode = 'AUTO';
      row.name = color.name;

      const rowName = new Sample(color.name, null, 128, [color.rgb.r * 255, color.rgb.g * 255, color.rgb.b * 255], this.parent.captions).makeName();
      row.appendChild(rowName);

      Object.values(this.parent.scale).reverse().forEach(lightness => {
        let newColor = chroma([color.rgb.r * 255, color.rgb.g * 255, color.rgb.b * 255]).set('lch.l', lightness);
        const sample = new Sample(color.name, Object.keys(this.parent.scale).find(key => this.parent.scale[key] === lightness).substr(10), 128, newColor._rgb, this.parent.captions).makeScale();
        row.name = color.name;
        row.locked = true;
        row.appendChild(sample)
      });

      this.node.appendChild(row);

    });

    return this.node
  }

}
