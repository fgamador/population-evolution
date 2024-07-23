/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Franz Amador (open-source contributor)
 */

import Bird from './Bird.js';
import populationEvolution from '../../populationEvolution.js';
import RandomSource from '../../common/model/RandomSource.js';

export default class Population {

  public readonly birds: Bird[];

  public constructor( birds: Bird[] ) {
    this.birds = birds;
  }

  public survivalPhase( rand: RandomSource, survivalProbability: ( Bird ) => number ): [ Bird[], Bird[] ] {
    var alive: Bird[] = [];
    var dead: Bird[] = [];

    this.birds.forEach( bird => {
      if ( rand.nextValue() <= survivalProbability( bird ) ) {
        alive.push( bird );
      } else {
        dead.push( bird );
      }
    } );
    
    this.birds = alive;
    return [ alive, dead ];
  }

  public mateFindingPhase( rand: RandomSource, matingProbability: ( Bird, Bird ) => number ): [ Bird, Bird ][] {
    // TODO
    return [];
  }
}

populationEvolution.register( 'Population', Population );