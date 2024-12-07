/* eslint-disable copyright */

/**
 * Control panel for the bird population.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import BirdBeaksModel from '../model/BirdBeaksModel.js';
import NumberControl, { NumberControlOptions } from '../../../../scenery-phet/js/NumberControl.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationEvolutionStrings from '../../PopulationEvolutionStrings.js';
import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
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

    const birdsControlsTitleNode = new Text( PopulationEvolutionStrings[ 'birds-controls' ].titleStringProperty, {
      font: new PhetFont( {
        size: 18,
        weight: 'bold'
      } )
    } );
    
    const variationRange = new RangeWithValue( 0, 10, 1 ); // todo named constants?

    const breedingVariationControlOptions: NumberControlOptions = {
      titleNodeOptions: {
        font: new PhetFont( 20 )
      },
      numberDisplayOptions: {
        textOptions: {
          font: new PhetFont( 20 )
        },
        valuePattern: PopulationEvolutionStrings[ 'birds-controls' ].variationControlValueStringProperty
      },
      sliderOptions: {
        majorTicks: [
          { value: variationRange.min, label: new Text( variationRange.min, { font: new PhetFont( 20 ) } ) },
          { value: variationRange.getCenter(), label: new Text( variationRange.getCenter(), { font: new PhetFont( 20 ) } ) },
          { value: variationRange.max, label: new Text( variationRange.max, { font: new PhetFont( 20 ) } ) }
        ],
        minorTickSpacing: 1 // todo
      }
    };

    const breedingVariationControl = new NumberControl( PopulationEvolutionStrings[ 'birds-controls' ].variationControlLabelStringProperty,
      model.beakSizeStdDevProperty, variationRange, breedingVariationControlOptions );

    const content = new VBox( {
      align: 'center',
      spacing: 10,
      children: [
        birdsControlsTitleNode,
        breedingVariationControl
      ]
    } );

    super( content, options );
  }
}

populationEvolution.register( 'BirdsControlPanel', BirdsControlPanel );