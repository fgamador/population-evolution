/* eslint-disable copyright */

/**
 * PopulationPhaseOutputBeakSizes collected into bins for display in a histogram.
 *
 * @author Franz Amador <franzamador@gmail.com>
*/

import populationEvolution from '../../populationEvolution.js';
import PopulationPhaseOutputBeakSizes from '../model/PopulationPhaseOutputBeakSizes.js';

export default class BinnedPopulationPhaseOutputValues {

  public readonly binnedInitial: number[];
  public readonly binnedDied: number[];
  public readonly binnedAdded: number[];

  public constructor( phaseOutputs: PopulationPhaseOutputBeakSizes, public readonly numBins: number, public readonly minValue: number, public readonly maxValue: number ) {
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

export class PopulationPhaseOutputValuesBin {

  public constructor( public readonly initialCount: number, public readonly diedCount: number, public readonly addedCount: number ) {
  }
}

populationEvolution.register( 'BinnedPopulationPhaseOutputValues', BinnedPopulationPhaseOutputValues );