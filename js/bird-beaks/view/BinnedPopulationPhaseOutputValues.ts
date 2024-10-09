/* eslint-disable copyright */

/**
 * todo
 *
 * @author Franz Amador <franzamador@gmail.com>
*/

import populationEvolution from '../../populationEvolution.js';
import PopulationPhaseOutputBeakSizes from '../model/PopulationPhaseOutputBeakSizes.js';
import PopulationPhaseOutputValuesBin from './PopulationPhaseOutputValuesBin.js';

export default class BinnedPopulationPhaseOutputValues {

  public readonly numBins: number;
  public readonly minValue: number;
  public readonly maxValue: number;

  public readonly binnedInitial: number[];
  public readonly binnedDied: number[];
  public readonly binnedAdded: number[];

  public constructor( phaseOutputs: PopulationPhaseOutputBeakSizes, numBins: number, minValue: number, maxValue: number ) {

    this.numBins = numBins;
    this.minValue = minValue;
    this.maxValue = maxValue;

    this.binnedInitial = this.valuesToHistogramBins( phaseOutputs.initial );
    this.binnedDied = this.valuesToHistogramBins( phaseOutputs.died );
    this.binnedAdded = this.valuesToHistogramBins( phaseOutputs.added );
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
    return new Array( this.numBins ).fill( 0 );
  }

  private valueToBinIndex( value: number ): number {
    return Math.floor( ( ( value - this.minValue ) / ( this.maxValue - this.minValue ) ) * this.numBins );
  }

  public bin( index: number ): PopulationPhaseOutputValuesBin {
    return new PopulationPhaseOutputValuesBin( this.binnedInitial[ index ], this.binnedDied[ index ], this.binnedAdded[ index ] );
  }
}

populationEvolution.register( 'BinnedPopulationPhaseOutputValues', BinnedPopulationPhaseOutputValues );