/**
 * Wrap JavaScript random-number generator to support deterministic testing.
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
    assert && assert( values.forEach( value => 0 <= value && value < 1 ), 'values must be in [0, 1)' );

    this.values = values;
    this.nextIndex = 0;
  }

  public nextValue(): number {
    const result = this.values[ this.nextIndex ];
    this.nextIndex = Math.min( ++this.nextIndex, this.values.length - 1 );
    return result;
  }
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle<T>( rand: RandomSource, values: T[] ): void {
  for ( let i = values.length - 1; i > 0; i-- ) {
    const j = Math.floor( rand.nextValue() * ( i + 1 ) );
    [ values[i], values[j] ] = [ values[j], values[i] ];
  }
}

populationEvolution.register( 'RandomSource', RandomSource );