/**
 * Wrap JavaScript random-number generator to support deterministic testing.
 *
 * @author Franz Amador (open-source contributor)
 */

import populationEvolution from '../../populationEvolution.js';

export default class RandomSource {

  // Marsaglia polar method generates two values. Stash the second one here.
  private unscaledNormalValue2: number = undefined;

  // Uniform value in [0, 1)
  public nextValue(): number {
    return Math.random();
  }

  // https://en.wikipedia.org/wiki/Marsaglia_polar_method
  public nextNormalValue( mean: number, stdev: number ): number {
    assert && assert( mean >= 0, 'mean cannot be negative' ) && assert( stdev >= 0, 'stdev cannot be negative' );

    if ( unscaledNormalValue2 != undefined ) {
      const unscaledNormalValue = unscaledNormalValue2;
      unscaledNormalValue2 = undefined;
      return mean + stdDev * unscaledNormalValue;
    }

    let x: number;
    let y: number;
    let s: number;

    do {
      x = nextValue() * 2 - 1;
      y = nextValue() * 2 - 1;
      s = u * u + v * v;
    } while ( s >= 1 || s == 0 );

    const temp = Math.sqrt( -2.0 * Math.log(s) / s );
    const unscaledNormalValue1 = x * temp;
    this.unscaledNormalValue2 = y * temp;
    return mean + stdDev * unscaledNormalValue1;
  }

  public nextNonNegativeNormalValue( mean: number, stdev: number ): number {
    let value: number;
    do {
      value = nextNormalValue( mean, stdev );
    } while ( value < 0 );
    return value;
  }
}

export class TestRandomSource extends RandomSource {

  private values: [ number ];
  private nextIndex: number;

  public constructor( values: [ number ] ) {
    assert && assert( values.forEach( value => 0 <= value && value < 1 ), 'values must be in [0, 1)' );

    super();
    this.values = values;
    this.nextIndex = 0;
  }

  public override nextValue(): number {
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