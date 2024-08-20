// Copyright 2024, University of Colorado Boulder

/**
 * todo
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationEvolutionStrings from '../../PopulationEvolutionStrings.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';

type SelfOptions = EmptySelfOptions;

export type BirdsControlPanelOptions = SelfOptions & PanelOptions;

export default class BirdsControlPanel extends Panel {

  public constructor( providedOptions: BirdsControlPanelOptions ) {

    const options = optionize<BirdsControlPanelOptions, SelfOptions, PanelOptions>()( {

      // Default values for optional PanelOptions
      xMargin: 10,
      yMargin: 10,
      stroke: 'orange',
      lineWidth: 3
    }, providedOptions );

    const birdControlsTitleNode = new Text( PopulationEvolutionStrings[ 'bird-controls' ].titleStringProperty, {
      font: new PhetFont( {
        size: 18,
        weight: 'bold'
      } )
    } );

    const content = new VBox( {
      align: 'center',
      spacing: 10,
      children: [
        birdControlsTitleNode
        //flipPolarityButton
      ]
    } );

    super( content, options );
  }
}

populationEvolution.register( 'BirdsControlPanel', BirdsControlPanel );