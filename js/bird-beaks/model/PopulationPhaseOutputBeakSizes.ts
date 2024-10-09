/* eslint-disable copyright */

/**
 * Struct that converts population phase outputs to beak sizes.
 *
 * @author Franz Amador <franzamador@gmail.com>
*/

import populationEvolution from '../../populationEvolution.js';
import Bird from './Bird.js';
import PopulationPhaseOutputs from './PopulationPhaseOutputs.js';

export default class PopulationPhaseOutputBeakSizes {

  public initial: number[];
  public died: number[];
  public added: number[];

  public constructor( phaseOutputs: PopulationPhaseOutputs ) {
    this.initial = birdsToBeakSizes( phaseOutputs.initial );
    this.died = birdsToBeakSizes( phaseOutputs.died );
    this.added = birdsToBeakSizes( phaseOutputs.added );
  }
}

function birdsToBeakSizes( birds: Bird[] ): number[] {
  return birds.map( bird => bird.beakSize );
}

// function birdPairsToBeakSizePairs( pairs: [ Bird, Bird ][] ): [ number, number ][] {
//   return pairs.map( pair => [ pair[ 0 ].beakSize, pair[ 1 ].beakSize ] );
// }

populationEvolution.register( 'PopulationPhaseOutputBeakSizes', PopulationPhaseOutputBeakSizes );