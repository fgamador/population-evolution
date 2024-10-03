// Copyright 2024, University of Colorado Boulder

/**
 * todo
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import BirdBeaksModel from '../model/BirdBeaksModel.js';
// import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import FineCoarseSpinner from '../../../../scenery-phet/js/FineCoarseSpinner.js';
import { Font, Text, VBox } from '../../../../scenery/js/imports.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationEvolutionStrings from '../../PopulationEvolutionStrings.js';
import RangeWithValue from '../../../../dot/js/RangeWithValue.js';

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

    const numberProperty = new NumberProperty( 0, {
      range: new RangeWithValue( 0, 10, 1 )
    } );

    // const enabledProperty = new BooleanProperty( true );

    const spinner = new FineCoarseSpinner( numberProperty, {
      // enabledProperty: enabledProperty
    } );

    const checkbox0 = new Checkbox( model.seeds.getDistribution( 0 ).enabledProperty, new Text( 'Seed type 1', {
      font: new Font( { size: 30 } )
    } ) );

    const checkbox1 = new Checkbox( model.seeds.getDistribution( 1 ).enabledProperty, new Text( 'Seed type 2', {
      font: new Font( { size: 30 } )
    } ) );

    const checkbox2 = new Checkbox( model.seeds.getDistribution( 2 ).enabledProperty, new Text( 'Seed type 3', {
      font: new Font( { size: 30 } )
    } ) );

    const content = new VBox( {
      align: 'center',
      spacing: 10,
      children: [
        seedsControlsTitleNode,
        spinner,
        checkbox0,
        checkbox1,
        checkbox2
      ]
    } );

    super( content, options );
  }
}

populationEvolution.register( 'SeedsControlPanel', SeedsControlPanel );