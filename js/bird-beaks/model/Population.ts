// Copyright 2024, University of Colorado Boulder

/**
 * A population that can evolve. It goes through a cycle of phases:
 * - Survival
 * - Mate-finding
 * - Breeding
 *
 * @author Franz Amador (open-source contributor)
 */

import Bird from './Bird.js';
import populationEvolution from '../../populationEvolution.js';
import RandomSource, { shuffle } from '../../common/model/RandomSource.js';

export default class Population {

  public birds: Bird[];

  public constructor( birds: Bird[] ) {
    this.birds = birds;
  }

  public survivalPhase( rand: RandomSource, survivalProbability: ( bird: Bird ) => number ): [ Bird[], Bird[] ] {
    const alive: Bird[] = [];
    const dead: Bird[] = [];

    this.birds.forEach( bird => {
      if ( rand.nextValue() <= survivalProbability( bird ) ) {
        alive.push( bird );
      }
      else {
        dead.push( bird );
      }
    } );
    
    this.birds = alive;
    return [ alive, dead ];
  }

  public mateFindingPhase( rand: RandomSource, rounds: number, matingProbability: ( bird1: Bird, bird2: Bird ) => number ): [ Bird, Bird ][] {
    const result: [ Bird, Bird ][] = [];
    let unmated = [ ...this.birds ];

    for ( let round = 1; round <= rounds && unmated.length >= 2; round++ ) {
      shuffle( rand, unmated );

      const leftovers: Bird[] = [];

      for ( let i = 1; i < unmated.length; i += 2 ) {
        const [ bird1, bird2 ] = [ unmated[ i - 1 ], unmated[ i ] ];
        if ( rand.nextValue() <= matingProbability( bird1, bird2 ) ) {
          result.push( [ bird1, bird2 ] );
        }
        else {
          leftovers.push( bird1, bird2 );
        }
      }

      if ( unmated.length % 2 === 1 ) {
        leftovers.push( unmated[ unmated.length - 1 ] );
      }

      unmated = leftovers;
    }

    return result;
  }

  public breedingPhase( matedPairs: [ Bird, Bird ][], breed: ( bird1: Bird, bird2: Bird ) => Bird[] ): Bird[] {
    let result: Bird[] = [];
    for ( const matedPair of matedPairs ) {
      const offspring = breed( matedPair[ 0 ], matedPair[ 1 ] );
      this.birds = this.birds.concat( offspring );
      result = result.concat( offspring );
    }
    return result;
  }
}

populationEvolution.register( 'Population', Population );