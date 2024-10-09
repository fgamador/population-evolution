/* eslint-disable copyright */

/**
 * Wrap random-number generator to support deterministic testing.
 *
 * @author Franz Amador (open-source contributor)
 */

import dotRandom from '../../../../dot/js/dotRandom.js';
import populationEvolution from '../../populationEvolution.js';

export default class RandomSource {

  // Marsaglia polar method generates two values. Stash the second one here.
  private unscaledNormalValue2: number | undefined = undefined;

  // Uniform value in [0, 1)
  public nextValue(): number {
    return dotRandom.nextDouble();
  }

  // Normally distributed value with specified mean and standard deviation.
  // Uses Marsaglia polar method (https://en.wikipedia.org/wiki/Marsaglia_polar_method).
  public nextNormalValue( mean: number, stdDev: number ): number {
    assert && assert( stdDev >= 0, 'stdev cannot be negative' );

    if ( this.unscaledNormalValue2 !== undefined ) {
      const unscaledNormalValue = this.unscaledNormalValue2;
      this.unscaledNormalValue2 = undefined;
      return mean + stdDev * unscaledNormalValue;
    }

    let x: number;
    let y: number;
    let s: number;

    do {
      x = this.nextValue() * 2 - 1;
      y = this.nextValue() * 2 - 1;
      s = x * x + y * y;
    } while ( s >= 1 || s === 0 );

    const temp = Math.sqrt( -2.0 * Math.log( s ) / s );
    const unscaledNormalValue1 = x * temp;
    this.unscaledNormalValue2 = y * temp;
    return mean + stdDev * unscaledNormalValue1;
  }

  // Non-negative normally distributed value with specified mean and standard deviation.
  // Just resamples until it gets a non-negative value.
  public nextNonNegativeNormalValue( mean: number, stdev: number ): number {
    let value: number;
    do {
      value = this.nextNormalValue( mean, stdev );
    } while ( value < 0 );
    return value;
  }
}

export class TestRandomSource extends RandomSource {

  private values: number[];
  private nextIndex: number;

  public constructor( values: number[] ) {
    // eslint-disable-next-line yoda
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
    [ values[ i ], values[ j ] ] = [ values[ j ], values[ i ] ];
  }
}

populationEvolution.register( 'RandomSource', RandomSource );