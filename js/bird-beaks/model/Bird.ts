/**
 * TODO Describe this class and its responsibilities.
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

  public mate( rand: RandomSource, partner: Bird ): [ Bird ] {
    // TODO
    return [];
  }
}

populationEvolution.register( 'Bird', Bird );