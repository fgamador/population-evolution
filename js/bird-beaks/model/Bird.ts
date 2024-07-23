/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Franz Amador (open-source contributor)
 */

import populationEvolution from '../../populationEvolution.js';

export default class Bird {

  public readonly beakSize: number;

  public constructor( beakSize: number ) {
    this.beakSize = beakSize;
  }
}

populationEvolution.register( 'Bird', Bird );