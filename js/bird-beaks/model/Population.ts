/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Franz Amador (open-source contributor)
 */

import Bird from './Bird.js';
import populationEvolution from '../../populationEvolution.js';

export default class Population {

  public readonly birds: [Bird];

  public constructor( birds: [Bird] ) {
    this.birds = birds;
  }
}

populationEvolution.register( 'Population', Population );