/**
 * An individual member of a population of birds. It has only one trait that can evolve: the size of its beak,
 * which influences how able it is to get nutrition from eating seeds of different sizes.
 *
 * @author Franz Amador (open-source contributor)
 */

import populationEvolution from '../../populationEvolution.js';
import RandomSource from '../../common/model/RandomSource.js';

export default class Bird {

  public readonly beakSize: number;

  public constructor( beakSize: number ) {
    this.beakSize = beakSize;
  }

  public survivalProbability( /* seeds */ ): number {
    // availabilityFactor = count(seeds) / count(birds)
    // sum(seed in seeds,
    //     encounterProbability(seed, seeds) *
    //     eatProbability(bird, seed) *
    //     foodIngested(bird, seed))
    // divided by food needed, or something like that
    return 1.0;
  }

  public matingProbability( bird: Bird ): number {
    // TODO something like this, but can't assume beakSize is a probability
    return 1 - Math.abs( this.beakSize - bird.beakSize );
  }

  public breed( rand: RandomSource, partner: Bird ): [ Bird ] {
    // TODO
    // create each child by "breeding" their beakSizes
    return [];
  }
}

populationEvolution.register( 'Bird', Bird );