// Copyright 2024, University of Colorado Boulder

/**
 * todo
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import BirdBeaksModel from '../model/BirdBeaksModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationEvolutionStrings from '../../PopulationEvolutionStrings.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';

type SelfOptions = EmptySelfOptions;
export type SeedsControlPanelOptions = SelfOptions & PanelOptions;

export default class SeedsControlPanel extends Panel {

  public constructor( model: BirdBeaksModel, providedOptions: SeedsControlPanelOptions ) {

    const options = optionize<SeedsControlPanelOptions, SelfOptions, PanelOptions>()( {

      // Default values for optional PanelOptions
      xMargin: 10,
      yMargin: 10,
      stroke: 'orange',
      lineWidth: 3
    }, providedOptions );

    const seedsControlsTitleNode = new Text( PopulationEvolutionStrings[ 'seeds-controls' ].titleStringProperty, {
      font: new PhetFont( {
        size: 18,
        weight: 'bold'
      } )
    } );

    const content = new VBox( {
      align: 'center',
      spacing: 10,
      children: [
        seedsControlsTitleNode
      ]
    } );

    super( content, options );
  }
}

populationEvolution.register( 'SeedsControlPanel', SeedsControlPanel );