// Copyright 2024, University of Colorado Boulder

/**
 * The population histogram.
 *
 * @author Franz Amador <franzamador@gmail.com>
 */

import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import optionize from '../../../../phet-core/js/optionize.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationHistogramBar from './PopulationHistogramBar.js';

type SelfOptions = {
  minValue: number;
  maxValue: number;
  maxCount: number;
  numBars: number;
  barGap: number;
  histogramWidth: number;
  histogramHeight: number;
};

export type PopulationHistogramOptions = SelfOptions & NodeOptions;

export default class PopulationHistogram extends Node {

  private minValue: number;
  private maxValue: number;

  private bars: PopulationHistogramBar[];

  // private pixelsPerCount: number;

  public constructor( providedOptions: PopulationHistogramOptions ) {

    const options = optionize<PopulationHistogramOptions, SelfOptions, NodeOptions>()( {

      // add default values for optional SelfOptions here

      // add default values for optional ScreenViewOptions here
    }, providedOptions );

    super( options );

    this.minValue = options.minValue;
    this.maxValue = options.maxValue;

    // this.pixelsPerCount = ( options.histogramHeight || 1000 ) / options.maxCount;

    const barWidth = Math.floor( ( options.histogramWidth - ( options.numBars - 1 ) * options.barGap ) / options.numBars );

    this.bars = [];
    for ( let i = 0; i < options.numBars; i++ ) {
      const bar = new PopulationHistogramBar( {
        maxCount: options.maxCount,
        barWidth: barWidth,
        barHeight: options.histogramHeight
      } );
      this.bars.push( bar );

      this.addChild( bar );
      bar.left = i * ( barWidth + options.barGap );
      bar.top = 0;
    }
  }

  public updateFromSurvivalPhase( alive: number[], dead: number[] ): void {
    const aliveBins = this.toHistogramBins( alive );
    const deadBins = this.toHistogramBins( dead );

    for ( let i = 0; i < this.bars.length; i++ ) {
      this.bars[ i ].updateFromSurvivalPhase( aliveBins[ i ], deadBins[ i ] );
    }
  }

  private toHistogramBins( values: number[] ): number[] {
    const result: number[] = new Array( this.bars.length );
    result.fill( 0 );

    for ( const value of values ) {
      result[ Math.floor( ( ( value - this.minValue ) / ( this.maxValue - this.minValue ) ) * this.bars.length ) ]++;
    }

    return result;
  }
}

populationEvolution.register( 'PopulationHistogram', PopulationHistogram );