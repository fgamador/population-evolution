// Copyright 2024, University of Colorado Boulder

/**
 * Rectangle with plots of the seed size distributions.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import ChartRectangle from '../../../../bamboo/js/ChartRectangle.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import GridLineSet from '../../../../bamboo/js/GridLineSet.js';
import LinePlot from '../../../../bamboo/js/LinePlot.js';
import { Node, NodeOptions, Text } from '../../../../scenery/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import Orientation from '../../../../phet-core/js/Orientation.js';
import populationEvolution from '../../populationEvolution.js';
// import PopulationEvolutionColors from '../../common/PopulationEvolutionColors.js';
import Range from '../../../../dot/js/Range.js';
import Seeds from '../model/Seeds.js';
import TickLabelSet from '../../../../bamboo/js/TickLabelSet.js';
import TickMarkSet from '../../../../bamboo/js/TickMarkSet.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';

type SelfOptions = {
  minValue: number;
  maxValue: number;
  diagramWidth: number;
  diagramHeight: number;
};

export type SeedDistributionsOptions = SelfOptions & NodeOptions;

export default class SeedDistributionPlots extends Node {

  private seeds: Seeds;

  public constructor( seeds: Seeds, providedOptions: SeedDistributionsOptions ) {

    const options = optionize<SeedDistributionsOptions, SelfOptions, NodeOptions>()( {
    }, providedOptions );

    super( options );

    this.seeds = seeds;

    // todo calculate these
    const majorXTickSpacing = 2;
    const minorYTickSpacing = 1;
    const majorYTickSpacing = 5;

    const chartTransform = new ChartTransform( {
      viewWidth: options.diagramWidth,
      viewHeight: options.diagramHeight,
      modelXRange: new Range( options.minValue, options.maxValue ),
      modelYRange: new Range( 0, 10 ) // todo max height
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
          new GridLineSet( chartTransform, Orientation.VERTICAL, majorYTickSpacing * 2, { stroke: 'lightGray' } ),

          new LinePlot( chartTransform, toPlotDataSet( this.seeds ), { stroke: 'red', lineWidth: 2 } )
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

function toPlotDataSet( seeds: Seeds ): Vector2[] {
  const result = [];
  for ( let x = 0; x <= 20; x += 0.1 ) {
    result.push( new Vector2( x, seeds.abundance( x ) ) );
  }
  return result;
}

populationEvolution.register( 'SeedDistributionPlots', SeedDistributionPlots );