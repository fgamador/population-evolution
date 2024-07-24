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
    let alive: Bird[] = [];
    let dead: Bird[] = [];

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

  public mateFindingPhase( rand: RandomSource, rounds: number, matingProbability: ( Bird, Bird ) => number ): [ Bird, Bird ][] {
    let result: [ Bird, Bird ][] = [];
    for ( let i = 1; i < this.birds.length; i += 2 ) {
      result.push( [ this.birds[i - 1], this.birds[i] ] );
    }
    return result;
  }

  public add( newBirds: Bird[] ): void {
    // TODO
  }
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle<T>( rand: RandomSource, values: T[] ): void {
  for ( let i = values.length - 1; i > 0; i-- ) {
    const j = Math.floor( rand.nextValue() * ( i + 1 ) );
    [ values[i], values[j] ] = [ values[j], values[i] ];
  }
}

populationEvolution.register( 'Population', Population );