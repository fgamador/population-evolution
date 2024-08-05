// Copyright 2024, University of Colorado Boulder

/**
 * An individual member of a population of birds. It has only one trait that can evolve: the size of its beak,
 * which influences how able it is to get nutrition from eating seeds of different sizes.
 *
 * @author Franz Amador (open-source contributor)
 */

import populationEvolution from '../../populationEvolution.js';
import RandomSource from '../../common/model/RandomSource.js';

export default class Bird {

  // seed diameter for which beak is most effective, in mm
  public readonly beakSize: number;

  public constructor( beakSize: number ) {
    this.beakSize = beakSize;
  }

  public survivalProbability( /* seeds */ ): number {
    // todo
    // availabilityFactor = count(seeds) / count(birds)
    // sum(seed in seeds,
    //     encounterProbability(seed, seeds) *
    //     eatProbability(bird, seed) *
    //     foodIngested(bird, seed))
    // divided by food needed, or something like that
    // Or how 'bout having survival depend directly
    // on prevalance of seeds matching beak size
    // (adjusted by bird/seed population sizes)?
    return 0.8;
  }

  // odds of two birds wanting to mate with each other
  public matingProbability( bird: Bird ): number {
    const beakSizeDifference = Math.abs( this.beakSize - bird.beakSize );
    const maxRelativeBeakSizeDifference = beakSizeDifference / Math.min( this.beakSize, bird.beakSize );
    return Math.max( 1 - maxRelativeBeakSizeDifference, 0 );
  }

  public breed( rand: RandomSource, partner: Bird, beakSizeStdDev: number ): Bird[] {
    const beakSizeMean = ( this.beakSize + partner.beakSize ) / 2;
    const beakSize = rand.nextNonNegativeNormalValue( beakSizeMean, beakSizeStdDev );
    // todo random number of offspring
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