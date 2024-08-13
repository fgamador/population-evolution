// Copyright 2024, University of Colorado Boulder

/**
 * Rectangle with plots of the seed size distributions.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import ChartRectangle from '../../../../bamboo/js/ChartRectangle.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import GridLineSet from '../../../../bamboo/js/GridLineSet.js';
import { Node, NodeOptions, Text } from '../../../../scenery/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import Orientation from '../../../../phet-core/js/Orientation.js';
import populationEvolution from '../../populationEvolution.js';
// import PopulationEvolutionColors from '../../common/PopulationEvolutionColors.js';
import Range from '../../../../dot/js/Range.js';
import TickLabelSet from '../../../../bamboo/js/TickLabelSet.js';
import TickMarkSet from '../../../../bamboo/js/TickMarkSet.js';
import Utils from '../../../../dot/js/Utils.js';

type SelfOptions = {
  minValue: number;
  maxValue: number;
  diagramWidth: number;
  diagramHeight: number;
};

export type SeedDistributionsOptions = SelfOptions & NodeOptions;

export default class SeedDistributions extends Node {

  public constructor( providedOptions: SeedDistributionsOptions ) {

    const options = optionize<SeedDistributionsOptions, SelfOptions, NodeOptions>()( {
    }, providedOptions );

    super( options );

    // todo calculate these
    const majorXTickSpacing = 2;
    const minorYTickSpacing = 0.05;
    const majorYTickSpacing = 0.1;

    const chartTransform = new ChartTransform( {
      viewWidth: options.diagramWidth,
      viewHeight: options.diagramHeight,
      modelXRange: new Range( options.minValue, options.maxValue ),
      modelYRange: new Range( 0, 1 ) // todo max height
    } );

    const chartRectangle = new ChartRectangle( chartTransform, {
      fill: 'white',
      stroke: 'black',
      cornerXRadius: 6,
      cornerYRadius: 6
    } );

    this.children = [
      chartRectangle,

      // Clipped contents
      new Node( {
        clipArea: chartRectangle.getShape(),

        children: [

          // Minor grid lines
          new GridLineSet( chartTransform, Orientation.VERTICAL, majorYTickSpacing * 2, { stroke: 'lightGray' } )

          // this.histogramBars = new PopulationHistogramBars( options )
        ]
      } ),

      // Minor ticks on the y-axis
      new TickMarkSet( chartTransform, Orientation.VERTICAL, minorYTickSpacing, {
        stroke: 'darkGray',
        edge: 'min'
      } ),

      // Major ticks on the y-axis
      new TickMarkSet( chartTransform, Orientation.VERTICAL, majorYTickSpacing, { edge: 'min' } ),
      new TickLabelSet( chartTransform, Orientation.VERTICAL, majorYTickSpacing, {
        edge: 'min',
        createLabel: ( value: number ) => new Text( Utils.toFixed( value, 1 ), { fontSize: 12 } )
      } ),

      // Major ticks on the x-axis
      new TickMarkSet( chartTransform, Orientation.HORIZONTAL, majorXTickSpacing, { edge: 'min' } ),
      new TickLabelSet( chartTransform, Orientation.HORIZONTAL, majorXTickSpacing, {
        edge: 'min',
        createLabel: ( value: number ) => new Text( Utils.toFixed( value, 1 ), { fontSize: 12 } )
      } )
    ];
  }
}

populationEvolution.register( 'SeedDistributions', SeedDistributions );