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
import PopulationPhaseOutputBeakSizes from './PopulationPhaseOutputBeakSizes.js';

type SelfOptions = {
  minValue: number;
  maxValue: number;
  maxCount: number;
  numBars: number;
  barWidthFraction: number;
  histogramWidth: number;
  histogramHeight: number;
};

export type PopulationHistogramBarsOptions = SelfOptions & NodeOptions;

export default class PopulationHistogramBars extends Node {

  private minValue: number;
  private maxValue: number;
  private histogramHeight: number;

  private bars: PopulationHistogramBar[];

  public constructor( providedOptions: PopulationHistogramBarsOptions ) {

    const options = optionize<PopulationHistogramBarsOptions, SelfOptions, NodeOptions>()( {
    }, providedOptions );

    super( options );

    this.minValue = options.minValue;
    this.maxValue = options.maxValue;
    this.histogramHeight = options.histogramHeight;

    const barPaddedWidth = options.histogramWidth / options.numBars;
    const barWidth = options.barWidthFraction * barPaddedWidth;
    const barPadWidth = ( barPaddedWidth - barWidth ) / 2;

    this.bars = [];
    for ( let i = 0; i < options.numBars; i++ ) {
      const bar = new PopulationHistogramBar( {
        x: barPadWidth + ( i * barPaddedWidth ),
        y: 0,
        pixelsPerCount: options.histogramHeight / options.maxCount,
        barWidth: barWidth,
        barHeight: options.histogramHeight
      } );
      this.bars.push( bar );
      this.addChild( bar );
    }
  }

  public setMaxCount( value: number ): void {
    const pixelsPerCount = this.histogramHeight / value;
    for ( const bar of this.bars ) {
      bar.setPixelsPerCount( pixelsPerCount );
    }
  }

  public update( phaseOutputs: PopulationPhaseOutputBeakSizes ): void {
    const binnedInitial = this.valuesToHistogramBins( phaseOutputs.initial );
    const binnedDied = this.valuesToHistogramBins( phaseOutputs.died );
    const binnedAdded = this.valuesToHistogramBins( phaseOutputs.added );

    for ( let i = 0; i < this.bars.length; i++ ) {
      this.bars[ i ].update( binnedInitial[ i ], binnedDied[ i ], binnedAdded[ i ] );
    }
  }

  private valuesToHistogramBins( values: number[] ): number[] {
    const result = this.createEmptyHistogramBins();

    for ( const value of values ) {
      result[ this.valueToBinIndex( value ) ]++;
    }

    return result;
  }

  // private valuePairsToHistogramBins( valuePairs: [ number, number ][] ): number[] {
  //   const result = this.createEmptyHistogramBins();

  //   for ( const valuePair of valuePairs ) {
  //     result[ this.valueToBinIndex( valuePair[ 0 ] ) ]++;
  //     result[ this.valueToBinIndex( valuePair[ 1 ] ) ]++;
  //   }

  //   return result;
  // }

  private createEmptyHistogramBins(): number[] {
    return new Array( this.bars.length ).fill( 0 );
  }

  private valueToBinIndex( value: number ): number {
      return Math.floor( ( ( value - this.minValue ) / ( this.maxValue - this.minValue ) ) * this.bars.length );
  }
}

populationEvolution.register( 'PopulationHistogramBars', PopulationHistogramBars );