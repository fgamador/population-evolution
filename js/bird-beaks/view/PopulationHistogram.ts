// Copyright 2024, University of Colorado Boulder

/**
 * Rectangle with a histogram of the population.
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
import PopulationHistogramBars, { PopulationHistogramBarsOptions } from './PopulationHistogramBars.js';
import Range from '../../../../dot/js/Range.js';
import TickLabelSet from '../../../../bamboo/js/TickLabelSet.js';
import TickMarkSet from '../../../../bamboo/js/TickMarkSet.js';
import Utils from '../../../../dot/js/Utils.js';

type SelfOptions = {
  // todo
};

export type PopulationHistogramOptions = SelfOptions & PopulationHistogramBarsOptions & NodeOptions;

export default class PopulationHistogram extends Node {

  private histogramBars: PopulationHistogramBars;

  public constructor( providedOptions: PopulationHistogramOptions ) {

    const options = optionize<PopulationHistogramOptions, SelfOptions, NodeOptions>()( {
    }, providedOptions );

    super( options );

    // todo pass this in? pass along to histogram bars?
    const chartTransform = new ChartTransform( {
      viewWidth: options.histogramWidth,
      viewHeight: options.histogramHeight,
      modelXRange: new Range( options.minValue - 0.5, options.maxValue + 0.5 ),
      modelYRange: new Range( 0, options.maxCount )
    } );

    const chartRectangle = new ChartRectangle( chartTransform, {
      fill: 'white',
      stroke: 'black',
      cornerXRadius: 6,
      cornerYRadius: 6
    } );
    this.addChild( chartRectangle );

    // Clipped contents
    this.addChild( new Node( {
      clipArea: chartRectangle.getShape(),

      children: [

        // Minor grid lines
        new GridLineSet( chartTransform, Orientation.VERTICAL, 50, { stroke: 'lightGray' } ),

        this.histogramBars = new PopulationHistogramBars( options )
      ]
    } ) );

    // Minor ticks on the y-axis
    this.addChild( new TickMarkSet( chartTransform, Orientation.VERTICAL, 10, {
      stroke: 'darkGray',
      edge: 'min'
    } ) );

    // Major ticks on the y-axis
    this.addChild( new TickMarkSet( chartTransform, Orientation.VERTICAL, 50, { edge: 'min' } ) );
    this.addChild( new TickLabelSet( chartTransform, Orientation.VERTICAL, 50, {
      edge: 'min',
      createLabel: ( value: number ) => new Text( value, { fontSize: 12 } )
    } ) );

    // Major ticks on the x-axis
    this.addChild( new TickMarkSet( chartTransform, Orientation.HORIZONTAL, 2, { edge: 'min' } ) );
    this.addChild( new TickLabelSet( chartTransform, Orientation.HORIZONTAL, 2, {
      edge: 'min',
      createLabel: ( value: number ) => new Text( Utils.toFixed( value, 2 ), { fontSize: 12 } )
    } ) );
  }

  public updateFromSurvivalPhase( aliveValues: number[], deadValues: number[] ): void {
    this.histogramBars.updateFromSurvivalPhase( aliveValues, deadValues );
  }

  public updateFromBreedingPhase( matedPairValues: [ number, number ][], newValues: number[] ): void {
    this.histogramBars.updateFromBreedingPhase( matedPairValues, newValues );
  }
}

populationEvolution.register( 'PopulationHistogram', PopulationHistogram );