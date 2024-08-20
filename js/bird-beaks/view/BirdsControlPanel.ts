// Copyright 2024, University of Colorado Boulder

/**
 * todo
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import BirdBeaksModel from '../model/BirdBeaksModel.js';
import HSlider from '../../../../sun/js/HSlider.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationEvolutionStrings from '../../PopulationEvolutionStrings.js';
import Range from '../../../../dot/js/Range.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';

type SelfOptions = EmptySelfOptions;

export type BirdsControlPanelOptions = SelfOptions & PanelOptions;

export default class BirdsControlPanel extends Panel {

  public constructor( model: BirdBeaksModel, providedOptions: BirdsControlPanelOptions ) {

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

    const range = new Range( 0, 10 ); // todo upper limit as named constant?
    const breedingVariationSlider = new HSlider( model.beakSizeStdDevProperty, range, {
      labelContent: PopulationEvolutionStrings[ 'bird-controls' ].beakSizeStdDevSliderStringProperty
    } );

    // Settable
    // const enabledProperty = new BooleanProperty( true );
    // breedingVariationSlider.enabledProperty = enabledProperty;

    const tickLabelOptions = { font: new PhetFont( { size: 16 } ) };

    // major ticks
    breedingVariationSlider.addMajorTick( range.min, new Text( range.min, tickLabelOptions ) );
    breedingVariationSlider.addMajorTick( range.getCenter(), new Text( range.getCenter(), tickLabelOptions ) );
    breedingVariationSlider.addMajorTick( range.max, new Text( range.max, tickLabelOptions ) );

    // minor ticks
    breedingVariationSlider.addMinorTick( range.min + 0.25 * range.getLength() );
    breedingVariationSlider.addMinorTick( range.min + 0.75 * range.getLength() );

    const content = new VBox( {
      align: 'center',
      spacing: 10,
      children: [
        birdControlsTitleNode,
        breedingVariationSlider
      ]
    } );

    super( content, options );
  }
}

populationEvolution.register( 'BirdsControlPanel', BirdsControlPanel );