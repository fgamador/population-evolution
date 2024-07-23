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

  public add( newBirds: Bird[] ): void {
    // TODO
  }
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle<T>( rand: RandomSource, values: T[] ): void {
  for ( let i = array.length - 1; i > 0; i-- ) {
    const j = Math.floor( rand.nextValue() * ( i + 1 ) );
    [ array[i], array[j] ] = [ array[j], array[i] ];
  }
}

populationEvolution.register( 'Population', Population );