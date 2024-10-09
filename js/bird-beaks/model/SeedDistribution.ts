/* eslint-disable copyright */

/**
 * A type of seeds for the birds to eat that has normally distributed sizes.
 * It is available for consumption only if it is enabled.
 *
 * @author Franz Amador (open-source contributor)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import NormalDistribution from '../../common/model/NormalDistribution.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import populationEvolution from '../../populationEvolution.js';

export default class SeedDistribution {

  public readonly enabledProperty: BooleanProperty;

  public readonly sizeMeanProperty: NumberProperty;

  public readonly sizeStdDevProperty: NumberProperty;

  public readonly abundanceFactorProperty: NumberProperty;

  // the fraction of seeds whose sizes are in a specified range
  private readonly sizeDistribution: NormalDistribution;

  public constructor( sizeMean: number, sizeStdDev: number, abundanceFactor: number, enabled: boolean ) {
    this.enabledProperty = new BooleanProperty( enabled );
    this.sizeDistribution = new NormalDistribution( sizeMean, sizeStdDev );
    this.sizeMeanProperty = this.sizeDistribution.meanProperty;
    this.sizeStdDevProperty = this.sizeDistribution.stdDevProperty;
    this.abundanceFactorProperty = new NumberProperty( abundanceFactor );
  }

  // A truly egregious abuse of the concept of probability density. Converts the probability density
  // at a specific seed size into a vaguely defined "abundance" of seeds near the specified size.
  public abundance( seedSize: number ): number {
    return this.abundanceFactorProperty.value * this.sizeDistribution.probabilityDensity( seedSize );
  }

  public onChange( callback: () => void ): void {
    Multilink.multilink(
      [ this.enabledProperty, this.sizeMeanProperty, this.sizeStdDevProperty, this.abundanceFactorProperty ],
      callback );
  }
}

populationEvolution.register( 'SeedDistribution', SeedDistribution );