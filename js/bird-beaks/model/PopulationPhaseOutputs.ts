/* eslint-disable copyright */

/**
 * Struct holding the outputs from each of the population phases.
 *
 * @author Franz Amador <franzamador@gmail.com>
*/

import Bird from './Bird.js';
import populationEvolution from '../../populationEvolution.js';

export default class PopulationPhaseOutputs {

  public initial: Bird[] = [];
  public died: Bird[] = [];
  public added: Bird[] = [];
}

populationEvolution.register( 'PopulationPhaseOutputs', PopulationPhaseOutputs );