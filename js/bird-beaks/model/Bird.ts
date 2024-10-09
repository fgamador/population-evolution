/* eslint-disable copyright */

/**
 * An individual member of a population of birds. It has only one trait that can evolve: the size of its beak,
 * which influences how able it is to get nutrition from eating seeds of different sizes.
 *
 * @author Franz Amador (open-source contributor)
 */

import populationEvolution from '../../populationEvolution.js';
import RandomSource from '../../common/model/RandomSource.js';
import Seeds from './Seeds.js';

export default class Bird {

  public constructor( public readonly beakSize: number ) {
  }

  // todo extract constants.
  public survivalProbability( seeds: Seeds ): number {
    const abundance = seeds.abundance( this.beakSize );
    if ( abundance < 1 ) { // todo constant
      return 0;
    }

    if ( abundance > 8 ) { // todo constant
      return 0.8;
    }

    return abundance * 0.1; // todo constant
  }

  // odds of two birds wanting to mate with each other
  public matingProbability( candidate: Bird ): number {
    const beakSizeDifference = Math.abs( this.beakSize - candidate.beakSize );
    const maxRelativeBeakSizeDifference = beakSizeDifference / Math.min( this.beakSize, candidate.beakSize );
    return Math.max( 1 - maxRelativeBeakSizeDifference, 0 );
  }

  public breed( rand: RandomSource, partner: Bird, beakSizeStdDev: number ): Bird[] {
    const beakSizeMean = ( this.beakSize + partner.beakSize ) / 2;
    // todo random number of offspring
    const beakSize = rand.nextNonNegativeNormalValue( beakSizeMean, beakSizeStdDev );
    return [ new Bird( beakSize ) ];
  }

  public static normallyDistributed( rand: RandomSource, count: number, beakSizeMean: number, beakSizeStdDev: number ): Bird[] {
    const result: Bird[] = [];
    for ( let i = 0; i < count; i++ ) {
      result.push( new Bird( rand.nextNonNegativeNormalValue( beakSizeMean, beakSizeStdDev ) ) );
    }
    return result;
  }
}

populationEvolution.register( 'Bird', Bird );