/* eslint-disable copyright */

/**
 * Struct that converts population phase outputs to beak sizes.
 *
 * @author Franz Amador <franzamador@gmail.com>
*/

import Bird from './Bird.js';
import populationEvolution from '../../populationEvolution.js';
import PopulationPhaseOutputs from '../../common/model/PopulationPhaseOutputs.js';

export default class PopulationPhaseOutputBeakSizes {

  public initial: number[];
  public died: number[];
  public added: number[];

  public constructor( phaseOutputs: PopulationPhaseOutputs<Bird> ) {
    this.initial = birdsToBeakSizes( phaseOutputs.initial );
    this.died = birdsToBeakSizes( phaseOutputs.died );
    this.added = birdsToBeakSizes( phaseOutputs.added );
  }
}

function birdsToBeakSizes( birds: Bird[] ): number[] {
  return birds.map( bird => bird.beakSize );
}

populationEvolution.register( 'PopulationPhaseOutputBeakSizes', PopulationPhaseOutputBeakSizes );