/* eslint-disable copyright */

/**
 * Struct that converts population-phase-output individuals to their trait values.
 *
 * @author Franz Amador <franzamador@gmail.com>
*/

import populationEvolution from '../../populationEvolution.js';
import PopulationPhaseOutputs from './PopulationPhaseOutputs.js';

export default class PopulationPhaseOutputValues<T> {

  public initial: number[];
  public died: number[];
  public added: number[];

  public constructor( phaseOutputs: PopulationPhaseOutputs<T>, individualToValue: ( individual: T ) => number ) {
    this.initial = this.individualsToValues( phaseOutputs.initial, individualToValue );
    this.died = this.individualsToValues( phaseOutputs.died, individualToValue );
    this.added = this.individualsToValues( phaseOutputs.added, individualToValue );
  }

  private individualsToValues( individuals: T[], individualToValue: ( individual: T ) => number ): number[] {
    return individuals.map( individual => individualToValue( individual ) );
  }
}


populationEvolution.register( 'PopulationPhaseOutputBeakSizes', PopulationPhaseOutputValues );