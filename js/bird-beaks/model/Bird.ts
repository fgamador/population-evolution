/* eslint-disable copyright */

/**
 * An individual member of a population of birds. It has only one trait that can evolve: the size of its beak,
 * which influences how able it is to get nutrition from eating seeds of different sizes.
 *
 * @author Franz Amador (open-source contributor)
 */

import BirdNiche from './BirdNiche.js';
import populationEvolution from '../../populationEvolution.js';
import RandomSource from '../../common/model/RandomSource.js';
import Seeds from './Seeds.js';

export default class Bird {

  public readonly niche: BirdNiche;

  public constructor( public readonly beakSize: number ) {
    this.niche = new BirdNiche( beakSize );
  }

  // todo extract constants.
  public survivalProbability(): number {
    const food = this.niche.occupantFood;

    if ( food < 1 ) { // todo constant
      return 0;
    }

    if ( food > 8 ) { // todo constant
      return 0.8;
    }

    return food * 0.1; // todo constant
  }

  // odds of two birds wanting to mate with each other
  public matingProbability( candidate: Bird ): number {
    const beakSizeDifference = Math.abs( this.beakSize - candidate.beakSize );
    const maxRelativeBeakSizeDifference = beakSizeDifference / Math.min( this.beakSize, candidate.beakSize );
    return Math.max( 1 - maxRelativeBeakSizeDifference, 0 );
  }

  public breed( rand: RandomSource, mate: Bird, beakSizeStdDev: number ): Bird[] {
    const numOffspring = this.calcNumOffspring( rand );
    const beakSizeMean = ( this.beakSize + mate.beakSize ) / 2;

    let result: Bird[] = [];
    for ( let i = 0; i < numOffspring; ++i ) {
      const beakSize = rand.nextNonNegativeNormalValue( beakSizeMean, beakSizeStdDev );
      result.push( new Bird( beakSize ) );
    }
    return result;
  }

  private calcNumOffspring( rand: RandomSource ): number {
    // todo
    return 1;
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