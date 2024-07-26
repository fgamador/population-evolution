/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Franz Amador (open-source contributor)
 */

import Bird from './Bird.js';
import populationEvolution from '../../populationEvolution.js';
import RandomSource, { shuffle } from '../../common/model/RandomSource.js';

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
    let unmated = [ ...this.birds ];

    for ( let round = 1; round <= rounds; round++ ) {
      shuffle( rand, unmated );

      let leftovers: Bird[] = [];

      for ( let i = 1; i < unmated.length; i += 2 ) {
        const [ bird1, bird2 ] = [ unmated[i - 1], unmated[i] ];
        if ( rand.nextValue() <= matingProbability( bird1, bird2 ) ) {
          result.push( [ bird1, bird2 ] );
        } else {
          leftovers.push( bird1, bird2 );
        }
      }

      if ( unmated.length % 2 == 1 ) {
        leftovers.push( unmated[ unmated.length - 1 ] );
      }

      unmated = leftovers;
    }

    return result;
  }

  public add( newBirds: Bird[] ): void {
    // TODO
  }
}

populationEvolution.register( 'Population', Population );