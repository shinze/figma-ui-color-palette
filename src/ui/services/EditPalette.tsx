import * as React from 'react';
import Dispatcher from '../modules/Dispatcher';
import Tabs from '../components/Tabs';
import Scale from '../modules/Scale';
import Colors from '../modules/Colors';
import Export from '../modules/Export';
import Settings from '../modules/Settings';
import About from '../modules/About';
import Actions from '../modules/Actions';
import chroma from 'chroma-js';
import { palette } from '../../utils/palettePackage';

interface Props {
  scale: any;
  hasCaptions: boolean;
  colors: any;
  preset: any;
  export: any;
  paletteName: string;
  onScaleChange: any;
  onChangeStop: any;
  onCaptionsChange: any;
  onColorChange: any;
  onSettingsChange: any;
  onOrderChange: any;
  onGoingStep: any
};

export default class EditPalette extends React.Component<Props> {

  dispatch: any;

  constructor(props) {
    super(props);
    this.dispatch = {
      scale: new Dispatcher(
        () => parent.postMessage({ pluginMessage: { type: 'update-scale', palette } }, '*'),
        500
      )
    };
    this.state = {
      selectedElement: {
        id: '',
        position: null
      },
      hoveredElement: {
        id: '',
        hasGuideAbove: false,
        hasGuideBelow: false,
        position: null
      },
      context: 'Scale'
    }
  }

  // Handlers
  slideHandler = (e: string) => {
    if (e === 'released') {
      this.dispatch.scale.on.status = false;
      parent.postMessage({ pluginMessage: { type: 'update-scale', palette } }, '*');
      this.props.onScaleChange()
    } else if (e === 'customized') {
      parent.postMessage({ pluginMessage: { type: 'update-scale', palette } }, '*');
      this.props.onChangeStop()
    } else
      this.dispatch.scale.on.status = true
  }

  checkHandler = (e: any) => {
    this.props.onCaptionsChange(e.target.checked);
    palette.captions = e.target.checked;
    parent.postMessage({ pluginMessage: { type: 'update-captions', palette } }, '*')
    this.setState({
      selectedElement: {
        id: '',
        position: null
      }
    })
  }

  colorHandler = (e: any) => this.props.onColorChange(e)

  navHandler = (e: any) => this.setState({ context: e.target.innerText })

  selectionHandler = (e: any) => {
    const target: HTMLElement = e.currentTarget,
          neighbours: Array<Element> = Array.from(target.parentElement.children)
    if (target !== e.target) return;
    this.setState({
      selectedElement: {
        id: target.dataset.id,
        position: target.dataset.position
      }
    })
  }

  dragHandler = (id: string, hasGuideAbove: boolean, hasGuideBelow: boolean, position: number) => {
    this.setState({
      hoveredElement: {
        id: id,
        hasGuideAbove: hasGuideAbove,
        hasGuideBelow: hasGuideBelow,
        position: position
      }
    })
  }

  dropOutsideHandler = (e: any) => {
    const target: any = e.target,
          parent: any = target.parentNode,
          scrollY: any = parent.parentNode.parentNode.scrollTop,
          parentRefTop: number = parent.offsetTop,
          parentRefBottom: number = parentRefTop + parent.clientHeight;

    if (e.pageY + scrollY < parentRefTop)
      this.props.onOrderChange(this.state['selectedElement'], this.state['hoveredElement'])
    else if (e.pageY + scrollY > parentRefBottom)
      this.props.onOrderChange(this.state['selectedElement'], this.state['hoveredElement'])
  }

  dropHandler = (e: any) => this.props.onOrderChange(this.state['selectedElement'], this.state['hoveredElement'])

  settingsHandler = (e: any) => this.props.onSettingsChange(e)

  unSelectColor = (e: any) => {
    e.target.closest('li.colors__item') == null ? this.setState({
      selectedElement: {
        id: '',
        position: null
      }
    }) : null
  }

  // Direct actions
  onCreate = () => {
    parent.postMessage({ pluginMessage: { type: 'create-local-styles', palette } }, '*')
    this.setState({
      selectedElement: {
        id: '',
        position: null
      }
    })
  }

  onUpdate = () => {
    parent.postMessage({ pluginMessage: { type: 'update-local-styles', palette } }, '*')
    this.setState({
      selectedElement: {
        id: '',
        position: null
      }
    })
  }

  onExport = () => {
    const a = document.createElement('a'),
    file = new Blob([this.props.export.data], { type: this.props.export.mimeType });
    a.href = URL.createObjectURL(file);
    a.download = 'colors';
    a.click()
  }

  render() {
    palette.captions = this.props.hasCaptions;
    let actions, controls;

    if (this.state['context'] === 'Export')
      actions =
        <Actions
          context='export'
          exportType= {this.props.export.format}
          onExportPalette={this.onExport}
        />
      else if (this.state['context'] === 'About')
        actions = null
      else
        actions =
          <Actions
            context='edit'
            hasCaptions={this.props.hasCaptions}
            onCreateLocalColors={this.onCreate}
            onUpdateLocalColors={this.onUpdate}
            onChangeCaptions={this.checkHandler}
          />

    switch (this.state['context']) {
      case 'Scale':
        controls =
          <Scale
            hasPreset={false}
            preset={this.props.preset}
            scale={this.props.scale}
            onScaleChange={this.slideHandler}
          />;
        break;

      case 'Colors':
        controls =
          <Colors
            colors={this.props.colors}
            selectedElement={this.state['selectedElement']}
            hoveredElement={this.state['hoveredElement']}
            onColorChange={this.colorHandler}
            onAddColor={this.colorHandler}
            onSelectionChange={this.selectionHandler}
            onDragChange={this.dragHandler}
            onDropOutside={this.dropOutsideHandler}
            onOrderChange={this.dropHandler}
          />;
        break;

      case 'Export':
        controls =
          <Export
            exportPreview={this.props.export.data}
          />;
        break;

      case 'Settings':
        controls =
          <Settings
            paletteName={this.props.paletteName}
            onSettingsChange={this.settingsHandler}
          />;
        break;

      case 'About':
        controls = <About />
    }

    return (
      <>
        <Tabs
          primaryTabs={['Scale', 'Colors', 'Export', 'Settings']}
          secondaryTabs={['About']}
          active={this.state['context']}
          onClick={this.navHandler}
        />
        <section
          onClick={this.unSelectColor}
          className={this.state['context'] === 'Colors' ? 'section--scrollable' : ''}
        >
          <div className='controls'>
            {controls}
          </div>
          {actions}
        </section>
      </>
    )
  }

}
