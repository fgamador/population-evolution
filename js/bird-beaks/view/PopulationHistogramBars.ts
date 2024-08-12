// Copyright 2024, University of Colorado Boulder

/**
 * Rectangle with a histogram of the population.
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

export type PopulationHistogramBarsOptions = SelfOptions & NodeOptions;

export default class PopulationHistogramBars extends Node {

  private minValue: number;
  private maxValue: number;

  private bars: PopulationHistogramBar[];

  // private pixelsPerCount: number;

  public constructor( providedOptions: PopulationHistogramBarsOptions ) {

    const options = optionize<PopulationHistogramBarsOptions, SelfOptions, NodeOptions>()( {

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
        x: i * ( barWidth + options.barGap ),
        y: 0,
        maxCount: options.maxCount,
        barWidth: barWidth,
        barHeight: options.histogramHeight
      } );
      this.bars.push( bar );
      this.addChild( bar );
    }
  }

  public updateFromSurvivalPhase( aliveValues: number[], deadValues: number[] ): void {
    const aliveBins = this.valuesToHistogramBins( aliveValues );
    const deadBins = this.valuesToHistogramBins( deadValues );

    for ( let i = 0; i < this.bars.length; i++ ) {
      this.bars[ i ].updateFromSurvivalPhase( aliveBins[ i ], deadBins[ i ] );
    }
  }

  public updateFromBreedingPhase( matedPairValues: [ number, number ][], newValues: number[] ): void {
    const matedPairBins = this.valuePairsToHistogramBins( matedPairValues );
    const newBins = this.valuesToHistogramBins( newValues );

    for ( let i = 0; i < this.bars.length; i++ ) {
      this.bars[ i ].updateFromBreedingPhase( matedPairBins[ i ], newBins[ i ] );
    }
  }

  private valuesToHistogramBins( values: number[] ): number[] {
    const result = this.createEmptyHistogramBins();

    for ( const value of values ) {
      result[ this.valueToBinIndex( value ) ]++;
    }

    return result;
  }

  private valuePairsToHistogramBins( valuePairs: [ number, number ][] ): number[] {
    const result = this.createEmptyHistogramBins();

    for ( const valuePair of valuePairs ) {
      result[ this.valueToBinIndex( valuePair[ 0 ] ) ]++;
      result[ this.valueToBinIndex( valuePair[ 1 ] ) ]++;
    }

    return result;
  }

  private createEmptyHistogramBins(): number[] {
    return new Array( this.bars.length ).fill( 0 );
  }

  private valueToBinIndex( value: number ): number {
      return Math.floor( ( ( value - this.minValue ) / ( this.maxValue - this.minValue ) ) * this.bars.length );
  }
}

populationEvolution.register( 'PopulationHistogramBars', PopulationHistogramBars );