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

  // todo extract constants
  public survivalProbability(): number {
    const food = this.niche.occupantFood;

    if ( food < 1 ) {
      return 0;
    }

    if ( food <= 8 ) {
      return food * 0.1;
    }

    return 0.8;
  }

  // todo extract constant
  public static matingProbability( bird1: Bird, bird2: Bird ): number {
    const scaledBeakSizeDifference = 0.1 * Math.abs( bird1.beakSize - bird2.beakSize );
    return Math.max( 1.0 - scaledBeakSizeDifference, 0.0 );
  }

  public static breed( rand: RandomSource, bird1: Bird, bird2: Bird, beakSizeStdDev: number ): Bird[] {
    const numOffspring = Bird.calcNumOffspring( rand, bird1, bird2 );
    const beakSizeMean = ( bird1.beakSize + bird2.beakSize ) / 2;

    let result: Bird[] = [];
    for ( let i = 0; i < numOffspring; ++i ) {
      const beakSize = rand.nextNonNegativeNormalValue( beakSizeMean, beakSizeStdDev );
      result.push( new Bird( beakSize ) );
    }
    return result;
  }

  // todo extract constants
  private static calcNumOffspring( rand: RandomSource, bird1: Bird, bird2: Bird ): number {
    const minFood = Math.min( bird1.niche.occupantFood, bird2.niche.occupantFood );

    if ( minFood < 1 ) {
      return 0;
    }

    if ( minFood <= 3 ) {
      return Math.floor( minFood );
    }

    return 3;
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