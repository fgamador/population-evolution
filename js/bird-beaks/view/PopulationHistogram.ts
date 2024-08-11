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
      viewWidth: 700,
      viewHeight: 300,
      modelXRange: new Range( -Math.PI / 8, Math.PI / 8 ),
      modelYRange: new Range( -4 / Math.PI, 4 / Math.PI )
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
        new GridLineSet( chartTransform, Orientation.HORIZONTAL, Math.PI / 32, { stroke: 'lightGray' } ),
        new GridLineSet( chartTransform, Orientation.VERTICAL, 0.5, { stroke: 'lightGray' } ),

        this.histogramBars = new PopulationHistogramBars( {
          minValue: 0.0,
          maxValue: 20.0,
          maxCount: 220,
          numBars: 20,
          barGap: 8,
          histogramWidth: chartRectangle.width,
          histogramHeight: chartRectangle.height
        } )
      ]
    } ) );

    // Tick marks outside the chart
    this.addChild( new TickMarkSet( chartTransform, Orientation.VERTICAL, 0.5, { edge: 'min' } ) );
    this.addChild( new TickLabelSet( chartTransform, Orientation.VERTICAL, 0.5, { edge: 'min' } ) );
    this.addChild( new TickMarkSet( chartTransform, Orientation.HORIZONTAL, Math.PI / 8, { edge: 'min' } ) );
    this.addChild( new TickLabelSet( chartTransform, Orientation.HORIZONTAL, Math.PI / 8, {
      edge: 'min',
      createLabel: ( value: number ) => new Text( Math.abs( value ) < 1E-6 ? Utils.toFixed( value, 0 ) : Utils.toFixed( value, 2 ), {
        fontSize: 12
      } )
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