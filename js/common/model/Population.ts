/* eslint-disable copyright */

/**
 * A population that can evolve. It goes through a cycle of phases:
 * - Survival
 * - Mate-finding
 * - Breeding
 *
 * @author Franz Amador (open-source contributor)
 */

import populationEvolution from '../../populationEvolution.js';
import RandomSource, { shuffle } from './RandomSource.js';

export default class Population<T> {

  public constructor( public individuals: T[] ) {
  }

  public survivalPhase( rand: RandomSource, survivalProbability: ( individual: T ) => number ): [ T[], T[] ] {
    const [ alive, dead ] = findSurvivors( rand, this.individuals, survivalProbability );
    this.individuals = alive;
    return [ alive, dead ];
  }

  public mateFindingPhase( rand: RandomSource, rounds: number, matingProbability: ( individual1: T, individual2: T ) => number ): [ T, T ][] {
    return findMates( rand, this.individuals, rounds, matingProbability );
  }

  public breedingPhase( matedPairs: [ T, T ][], breed: ( individual1: T, individual2: T ) => T[] ): T[] {
    const result = breedPairs( matedPairs, breed );
    this.individuals = this.individuals.concat( result );
    return result;
  }
}

function findSurvivors<T>( rand: RandomSource, individuals: T[], survivalProbability: ( individual: T ) => number ): [ T[], T[] ] {
  const alive: T[] = [];
  const dead: T[] = [];

  individuals.forEach( individual => {
    if ( rand.nextValue() <= survivalProbability( individual ) ) {
      alive.push( individual );
    }
    else {
      dead.push( individual );
    }
  } );

  return [ alive, dead ];
}

function findMates<T>( rand: RandomSource, individuals: T[], rounds: number, matingProbability: ( individual1: T, individual2: T ) => number ): [ T, T ][] {
  const result: [ T, T ][] = [];
  let unmated = [ ...individuals ];

  for ( let round = 1; round <= rounds && unmated.length >= 2; round++ ) {
    shuffle( rand, unmated );

    const leftovers: T[] = [];

    for ( let i = 1; i < unmated.length; i += 2 ) {
      const [ individual1, individual2 ] = [ unmated[ i - 1 ], unmated[ i ] ];
      if ( rand.nextValue() <= matingProbability( individual1, individual2 ) ) {
        result.push( [ individual1, individual2 ] );
      }
      else {
        leftovers.push( individual1, individual2 );
      }
    }

    if ( unmated.length % 2 === 1 ) {
      leftovers.push( unmated[ unmated.length - 1 ] );
    }

    unmated = leftovers;
  }

  return result;
}

function breedPairs<T>( pairs: [ T, T ][], breed: ( individual1: T, individual2: T ) => T[] ): T[] {
  let result: T[] = [];
  for ( const pair of pairs ) {
    const offspring = breed( pair[ 0 ], pair[ 1 ] );
    result = result.concat( offspring );
  }
  return result;
}

populationEvolution.register( 'Population', Population );