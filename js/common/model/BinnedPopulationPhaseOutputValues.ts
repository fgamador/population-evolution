/* eslint-disable copyright */

/**
 * Collects PopulationPhaseOutputValues into bins. Useful for display in a histogram.
 *
 * @author Franz Amador <franzamador@gmail.com>
*/

import populationEvolution from '../../populationEvolution.js';
import PopulationPhaseOutputValues from './PopulationPhaseOutputValues.js';

export default class BinnedPopulationPhaseOutputValues<T> {

  public readonly binnedInitial: number[];
  public readonly binnedDied: number[];
  public readonly binnedAdded: number[];

  public constructor( phaseOutputs: PopulationPhaseOutputValues<T>, public readonly numBins: number, public readonly minValue: number, public readonly maxValue: number ) {
    this.binnedInitial = this.valuesToBins( phaseOutputs.initial );
    this.binnedDied = this.valuesToBins( phaseOutputs.died );
    this.binnedAdded = this.valuesToBins( phaseOutputs.added );
  }

  private valuesToBins( values: number[] ): number[] {
    const result = this.createEmptyBins();

    for ( const value of values ) {
      result[ this.valueToBinIndex( value ) ]++;
    }

    return result;
  }

  private createEmptyBins(): number[] {
    return new Array( this.numBins ).fill( 0 );
  }

  private valueToBinIndex( value: number ): number {
    return Math.floor( ( ( value - this.minValue ) / ( this.maxValue - this.minValue ) ) * this.numBins );
  }

  public bin( index: number ): PopulationPhaseOutputValuesBin {
    return new PopulationPhaseOutputValuesBin( this.binnedInitial[ index ], this.binnedDied[ index ], this.binnedAdded[ index ] );
  }
}

export class PopulationPhaseOutputValuesBin {

  public constructor( public readonly initialCount: number, public readonly diedCount: number, public readonly addedCount: number ) {
  }
}

populationEvolution.register( 'BinnedPopulationPhaseOutputValues', BinnedPopulationPhaseOutputValues );