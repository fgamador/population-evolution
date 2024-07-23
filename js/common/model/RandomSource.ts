/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Franz Amador (open-source contributor)
 */

import populationEvolution from '../../populationEvolution.js';

export default class RandomSource {

  public nextValue(): number {
    return Math.random();
  }
}

export class TestRandomSource implements RandomSource {

  private values: [ number ];
  private nextIndex: number;

  public constructor( values: [ number ] ) {
    this.values = values;
    this.nextIndex = 0;
  }

  public nextValue(): number {
    const result = this.values[ this.nextIndex ];
    this.nextIndex = ++this.nextIndex % this.values.length;
    return result;
  }
}

populationEvolution.register( 'RandomSource', RandomSource );