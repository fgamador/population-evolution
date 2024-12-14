/* eslint-disable copyright */

/**
 * Struct holding the outputs from each of the population phases.
 *
 * @author Franz Amador <franzamador@gmail.com>
*/

import populationEvolution from '../../populationEvolution.js';

export default class PopulationPhaseOutputs<T> {

  public initial: T[] = [];
  public died: T[] = [];
  public added: T[] = [];
}

populationEvolution.register( 'PopulationPhaseOutputs', PopulationPhaseOutputs );